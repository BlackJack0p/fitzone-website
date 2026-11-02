import "dotenv/config";
import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth.js";
import trainersRoutes from "./routes/trainers.js";
import classesRoutes from "./routes/classes.js";
import membershipsRoutes from "./routes/memberships.js";
import ordersRoutes from "./routes/orders.js";
import { createHmac, timingSafeEqual } from "node:crypto";
import { eq, and } from "drizzle-orm";
import { db } from "./db/index.js";
import { orders } from "./db/schema.js";

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

      // Verify that the webhook was sent by Paystack.
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

      // Only successful charges can mark an order as paid.
      if (event.event === "charge.success") {
        const payment = event.data;

        if (
          payment.status !== "success" ||
          !payment.reference ||
          !Number.isInteger(payment.amount) ||
          payment.currency !== "ZAR"
        ) {
          return res.sendStatus(400);
        }

        const [updatedOrder] = await db
          .update(orders)
          .set({
            status: "paid",
            updatedAt: new Date(),
          })
          .where(
            and(
              eq(orders.providerReference, payment.reference),
              eq(orders.paymentProvider, "paystack"),
              eq(orders.totalAmount, payment.amount),
              eq(orders.currency, payment.currency),
              eq(orders.status, "pending")
            )
          )
          .returning({ id: orders.id });

        if (!updatedOrder) {
          console.warn(
            "Paystack payment did not match a pending order:",
            payment.reference
          );
        }
      }

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
