
import { Router } from "express";
import { eq, asc } from "drizzle-orm";
import { db } from "../db/index.js";
import { trainers } from "../db/schema.js";

const router = Router();

// GET /api/trainers
// Retrieve all trainers for the trainer cards.
router.get("/", async (req, res, next) => {
  try {
    const result = await db
      .select()
      .from(trainers)
      .orderBy(asc(trainers.id));

    res.json(result);
  } catch (error) {
    next(error);
  }
});

// GET /api/trainers/slug/:slug
// Retrieve one trainer and their full profile by slug.
router.get("/slug/:slug", async (req, res, next) => {
  try {
    const result = await db
      .select()
      .from(trainers)
      .where(eq(trainers.slug, req.params.slug))
      .limit(1);

    if (result.length === 0) {
      return res.status(404).json({
        error: "Trainer not found.",
      });
    }

    res.json(result[0]);
  } catch (error) {
    next(error);
  }
});

// GET /api/trainers/:id
// Retrieve one trainer by numeric ID.
router.get("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
      return res.status(400).json({
        error: "A valid trainer ID is required.",
      });
    }

    const result = await db
      .select()
      .from(trainers)
      .where(eq(trainers.id, id))
      .limit(1);

    if (result.length === 0) {
      return res.status(404).json({
        error: "Trainer not found.",
      });
    }

    res.json(result[0]);
  } catch (error) {
    next(error);
  }
});

export default router;
