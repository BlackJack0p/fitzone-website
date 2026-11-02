import "dotenv/config";
import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { createHmac, timingSafeEqual } from "node:crypto";
import { eq, and } from "drizzle-orm";
import { auth } from "./auth.js";
import { db } from "./db/index.js";
import { orders } from "./db/schema.js";
import trainersRoutes from "./routes/trainers.js";
import classesRoutes from "./routes/classes.js";
import membershipsRoutes from "./routes/memberships.js";
import ordersRoutes from "./routes/orders.js";

const app = express();
const PORT = process.env.PORT || 3000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

// Allow requests from the React frontend.
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);

// Register Better Auth before express.json().
app.all("/api/auth/{*path}", toNodeHandler(auth));

// Paystack webhook: preserve the raw body for signature verification.
app.post(
  "/api/payments/paystack/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    try {
      const signature = req.headers["x-paystack-signature"];
      const secret = process.env.PAYSTACK_SECRET_KEY;

      if (!signature || !secret || !Buffer.isBuffer(req.body)) {
        return res.sendStatus(400);
      }

      // Verify the webhook signature.
      const expectedSignature = createHmac("sha512", secret)
        .update(req.body)
        .digest("hex");

      const signatureBuffer = Buffer.from(signature, "hex");
      const expectedBuffer = Buffer.from(expectedSignature, "hex");

      if (
        signatureBuffer.length !== expectedBuffer.length ||
        !timingSafeEqual(signatureBuffer, expectedBuffer)
      ) {
        return res.sendStatus(401);
      }

      const event = JSON.parse(req.body.toString("utf8"));

      // Paystack sends charge.success for successful transactions.
      if (event.event !== "charge.success") {
        return res.sendStatus(200);
      }

      const payment = event.data;

      if (
        !payment.reference ||
        typeof payment.reference !== "string"
      ) {
        return res.sendStatus(400);
      }

      // Find the matching pending order.
      const [order] = await db
        .select()
        .from(orders)
        .where(
          and(
            eq(orders.providerReference, payment.reference),
            eq(orders.paymentProvider, "paystack"),
            eq(orders.status, "pending")
          )
        );

      // Ignore references that do not belong to a pending FitZone order.
      if (!order) {
        console.warn(
          "No matching pending FitZone order:",
          payment.reference
        );

        return res.sendStatus(200);
      }

      // Independently verify the transaction with Paystack.
      const verificationResponse = await fetch(
        `https://api.paystack.co/transaction/verify/${encodeURIComponent(payment.reference)}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${secret}`,
          },
        }
      );

      const verification = await verificationResponse.json();

      if (!verificationResponse.ok || !verification.status) {
        console.error("Paystack transaction verification failed.");

        return res.sendStatus(502);
      }

      const verifiedPayment = verification.data;

      // Check the actual transaction status and order details.
      if (
        verifiedPayment.status !== "success" ||
        verifiedPayment.reference !== order.providerReference ||
        verifiedPayment.amount !== order.totalAmount ||
        verifiedPayment.currency !== order.currency ||
        verifiedPayment.currency !== "ZAR"
      ) {
        console.warn(
          "Paystack transaction did not match the order:",
          payment.reference
        );

        return res.sendStatus(200);
      }

      // Only a verified successful transaction can mark an order as paid.
      await db
        .update(orders)
        .set({
          status: "paid",
          updatedAt: new Date(),
        })
        .where(
          and(
            eq(orders.id, order.id),
            eq(orders.status, "pending")
          )
        );

      console.log("Verified Paystack payment for order:", order.id);

      return res.sendStatus(200);
    } catch (error) {
      console.error("Paystack webhook error:", error);
      return res.sendStatus(500);
    }
  }
);

// Parse JSON request bodies for the other API routes.
app.use(express.json());

// Register FitZone API routes.
app.use("/api/trainers", trainersRoutes);
app.use("/api/classes", classesRoutes);
app.use("/api/memberships", membershipsRoutes);
app.use("/api/orders", ordersRoutes);

app.get("/", (req, res) => {
  res.send("FitZone API is running.");
});

// Health-check endpoint.
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "FitZone API is running",
  });
});

// Handle unexpected errors.
app.use((error, req, res, next) => {
  console.error(error);

  res.status(500).json({
    error: "An unexpected server error occurred.",
  });
});

app.listen(PORT, () => {
  console.log(`FitZone API running at http://localhost:${PORT}`);
});
