import { Router } from "express";
import { randomUUID } from "node:crypto";
import { eq, and } from "drizzle-orm";
import { db } from "../db/index.js";
import { orders, orderItems, memberships } from "../db/schema.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = Router();

// Create an order and initialize Paystack checkout.
router.post("/", requireAuth, async (req, res, next) => {
  try {
    const { membershipSlug } = req.body;

    if (typeof membershipSlug !== "string" || !membershipSlug.trim()) {
      return res.status(400).json({
        error: "A valid membership is required.",
      });
    }

    if (!process.env.PAYSTACK_SECRET_KEY) {
      return res.status(500).json({
        error: "Payment configuration is missing.",
      });
    }

    const [membership] = await db
      .select()
      .from(memberships)
      .where(eq(memberships.slug, membershipSlug));

    if (!membership) {
      return res.status(404).json({
        error: "Membership not found.",
      });
    }

    if (!membership.paystackPlanCode) {
      return res.status(400).json({
        error: "This membership has no payment plan configured.",
      });
    }

    if (!req.user.email) {
      return res.status(400).json({
        error: "Your account does not have an email address.",
      });
    }

    // Database prices are in rand. Paystack uses cents for ZAR.
    const priceInCents = membership.price * 100;
    const reference = `FZ-${randomUUID()}`;

    // Create the pending order and its item.
    const order = await db.transaction(async (tx) => {
      const [newOrder] = await tx
        .insert(orders)
        .values({
          userId: req.user.id,
          totalAmount: priceInCents,
          currency: "ZAR",
          status: "pending",
          paymentProvider: "paystack",
          providerReference: reference,
        })
        .returning();

      await tx.insert(orderItems).values({
        orderId: newOrder.id,
        membershipId: membership.id,
        membershipName: membership.name,
        quantity: 1,
        unitPrice: priceInCents,
      });

      return newOrder;
    });

    // Initialize the monthly subscription with Paystack.
    const paystackResponse = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: req.user.email,
          amount: String(priceInCents),
          currency: "ZAR",
          reference,
          plan: membership.paystackPlanCode,
          callback_url: `${process.env.CLIENT_URL || "http://localhost:5173"}/payment/success?orderId=${order.id}`,
          metadata: {
            orderId: order.id,
            userId: req.user.id,
            membershipSlug: membership.slug,
          },
        }),
      }
    );

    const paymentData = await paystackResponse.json();

    if (!paystackResponse.ok || !paymentData.status) {
      console.error("Paystack initialization failed:", paymentData);

      await db
        .update(orders)
        .set({
          status: "failed",
          updatedAt: new Date(),
        })
        .where(eq(orders.id, order.id));

      return res.status(502).json({
        error: "Could not initialize payment. Please try again.",
      });
    }

    res.status(201).json({
      orderId: order.id,
      reference,
      authorizationUrl: paymentData.data.authorization_url,
    });
  } catch (error) {
    next(error);
  }
});

// Retrieve an order belonging to the logged-in user.
// Also check pending transactions with Paystack.
router.get("/:id", requireAuth, async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
      return res.status(400).json({
        error: "Invalid order ID.",
      });
    }

    let [order] = await db
      .select()
      .from(orders)
      .where(
        and(
          eq(orders.id, id),
          eq(orders.userId, req.user.id)
        )
      );

    if (!order) {
      return res.status(404).json({
        error: "Order not found.",
      });
    }

    // Verify the transaction if the order is still pending.
    if (
      order.status === "pending" &&
      order.paymentProvider === "paystack" &&
      order.providerReference &&
      process.env.PAYSTACK_SECRET_KEY
    ) {
      try {
        const verificationResponse = await fetch(
          `https://api.paystack.co/transaction/verify/${encodeURIComponent(order.providerReference)}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            },
          }
        );

        const verification = await verificationResponse.json();

        if (verificationResponse.ok && verification.status) {
          const payment = verification.data;

          const matchesOrder =
            payment.reference === order.providerReference &&
            payment.amount === order.totalAmount &&
            payment.currency === order.currency;

          // Mark unsuccessful transactions as failed.
          // Successful transactions are still confirmed by the webhook.
          if (
            matchesOrder &&
            ["failed", "abandoned"].includes(payment.status)
          ) {
            const [updatedOrder] = await db
              .update(orders)
              .set({
                status: "failed",
                updatedAt: new Date(),
              })
              .where(
                and(
                  eq(orders.id, order.id),
                  eq(orders.status, "pending")
                )
              )
              .returning();

            if (updatedOrder) {
              order = updatedOrder;
            }
          }
        }
      } catch (verificationError) {
        console.error(
          "Could not verify pending Paystack transaction:",
          verificationError
        );
      }
    }

    const items = await db
      .select()
      .from(orderItems)
      .where(eq(orderItems.orderId, order.id));

    res.json({ ...order, items });
  } catch (error) {
    next(error);
  }
});

export default router;
