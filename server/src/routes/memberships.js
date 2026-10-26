import { Router } from "express";
import { asc, eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { memberships } from "../db/schema.js";

const router = Router();

// GET /api/memberships
// Retrieve all membership plans.
router.get("/", async (req, res, next) => {
  try {
    const result = await db
      .select()
      .from(memberships)
      .orderBy(asc(memberships.id));

    res.json(result);
  } catch (error) {
    next(error);
  }
});

// GET /api/memberships/:id
// Retrieve one membership by ID.
router.get("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
      return res.status(400).json({
        error: "A valid membership ID is required.",
      });
    }

    const result = await db
      .select()
      .from(memberships)
      .where(eq(memberships.id, id))
      .limit(1);

    if (result.length === 0) {
      return res.status(404).json({
        error: "Membership not found.",
      });
    }

    res.json(result[0]);
  } catch (error) {
    next(error);
  }
});

export default router;
