import "dotenv/config";
import { db, client } from "./index.js";
import { trainers, classes, memberships } from "./schema.js";
import { trainersData } from "./data/trainers.js";
import { classesData } from "./data/classes.js";
import { membershipsData } from "./data/memberships.js";

// Maps the trainer IDs in the class seed data to stable trainer slugs.
const trainerSlugBySeedId = {
  1: "james-carter",
  2: "sarah-mitchell",
  3: "daniel-brooks",
};

async function seedDatabase() {
  try {
    console.log("Starting FitZone database seeding...");

    // Insert trainers without duplicating existing slugs.
    await db
      .insert(trainers)
      .values(trainersData)
      .onConflictDoNothing({ target: trainers.slug });

    console.log("Trainers seeded.");

    // Retrieve the actual database IDs for linking classes to trainers.
    const savedTrainers = await db.select().from(trainers);

    const trainerIdsBySlug = new Map(
      savedTrainers.map((trainer) => [trainer.slug, trainer.id])
    );

    // Add a unique slug and use the correct database trainer ID.
    const classesToInsert = classesData.map((classItem) => {
      const trainerSlug = trainerSlugBySeedId[classItem.trainerId];
      const databaseTrainerId = trainerIdsBySlug.get(trainerSlug);

      if (!databaseTrainerId) {
        throw new Error(
          `Could not find trainer "${trainerSlug}" for class "${classItem.name}".`
        );
      }

      const slug = [
        classItem.name,
        classItem.day,
        classItem.startTime,
      ]
        .join("-")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

      return {
        ...classItem,
        slug,
        trainerId: databaseTrainerId,
      };
    });

    // Insert classes without duplicating existing slugs.
    await db
      .insert(classes)
      .values(classesToInsert)
      .onConflictDoNothing({ target: classes.slug });

    console.log("Classes seeded.");

    // Insert memberships without duplicating existing slugs.
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