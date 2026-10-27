import "dotenv/config";
import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth.js";
import trainersRoutes from "./routes/trainers.js";
import classesRoutes from "./routes/classes.js";
import membershipsRoutes from "./routes/memberships.js";

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

// Parse JSON request bodies.
app.use(express.json());

// Register FitZone API routes.
app.use("/api/trainers", trainersRoutes);
app.use("/api/classes", classesRoutes);
app.use("/api/memberships", membershipsRoutes);
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
