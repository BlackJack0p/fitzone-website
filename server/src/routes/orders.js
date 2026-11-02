import { Router } from "express";
import { eq, and } from "drizzle-orm";
import { db } from "../db/index.js";
import { orders, orderItems } from "../db/schema.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = Router();

router.get("/:id", requireAuth, async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
      return res.status(400).json({ error: "Invalid order ID." });
    }

    const [order] = await db
      .select()
      .from(orders)
      .where(
        and(
          eq(orders.id, id),
          eq(orders.userId, req.user.id)
        )
      );

    if (!order) {
      return res.status(404).json({ error: "Order not found." });
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
