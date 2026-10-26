import "dotenv/config";
import { db, client } from "./index.js";
import { trainers, classes, memberships } from "./schema.js";
import { trainersData } from "./data/trainers.js";
import { classesData } from "./data/classes.js";
import { membershipsData } from "./data/memberships.js";

// Matches the original trainer IDs used in classesData
// to stable trainer slugs.
const trainerSlugBySeedId = {
  1: "james-carter",
  2: "sarah-mitchell",
  3: "daniel-brooks",
};

async function seedDatabase() {
  try {
    console.log("Starting FitZone database seeding...");

    // 1. Insert trainers.
    await db
      .insert(trainers)
      .values(trainersData)
      .onConflictDoNothing({ target: trainers.slug });

    console.log("Trainers seeded.");

    // Read the actual database IDs instead of assuming
    // PostgreSQL generated IDs start at 1.
    const savedTrainers = await db.select().from(trainers);

    const trainerIdsBySlug = new Map(
      savedTrainers.map((trainer) => [trainer.slug, trainer.id])
    );

    // 2. Insert classes with the correct database trainer IDs.
    const classesToInsert = classesData.map((classItem) => {
      const trainerSlug = trainerSlugBySeedId[classItem.trainerId];
      const databaseTrainerId = trainerIdsBySlug.get(trainerSlug);

      if (!databaseTrainerId) {
        throw new Error(
          `Could not find trainer "${trainerSlug}" for class "${classItem.name}".`
        );
      }

      return {
        ...classItem,
        trainerId: databaseTrainerId,
      };
    });

    await db
      .insert(classes)
      .values(classesToInsert)
      .onConflictDoNothing({ target: classes.slug });

    console.log("Classes seeded.");

    // 3. Insert membership plans.
    await db
      .insert(memberships)
      .values(membershipsData)
      .onConflictDoNothing({ target: memberships.slug });

    console.log("Memberships seeded.");
    console.log("FitZone database seeding completed.");
  } catch (error) {
    console.error("Database seeding failed:", error);
    process.exitCode = 1;
  } finally {
    await client.end();
  }
}

await seedDatabase();
