
import { Router } from "express";
import { asc, eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { classes } from "../db/schema.js";

const router = Router();

// GET /api/classes
// Retrieve all classes.
router.get("/", async (req, res, next) => {
  try {
    const result = await db
      .select()
      .from(classes)
      .orderBy(asc(classes.id));

    res.json(result);
  } catch (error) {
    next(error);
  }
});

// GET /api/classes/:id
// Retrieve one class by ID.
router.get("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
      return res.status(400).json({
        error: "A valid class ID is required.",
      });
    }

    const result = await db
      .select()
      .from(classes)
      .where(eq(classes.id, id))
      .limit(1);

    if (result.length === 0) {
      return res.status(404).json({
        error: "Class not found.",
      });
    }

    res.json(result[0]);
  } catch (error) {
    next(error);
  }
});

export default router;
