import dotenv from "dotenv";

dotenv.config();

import express from "express";
import cors from "cors";
import driver from "./config/db.js";
import developerRoutes from "./routes/developerRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/developers", developerRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Job Graph Explorer API is running",
  });
});

app.get("/api/health", async (req, res) => {
  const session = driver.session();

  try {
    await session.run("RETURN 1 AS result");

    res.json({
      success: true,
      message: "CognoDB connected successfully",
    });
  } catch (error) {
    console.error("CognoDB Error:", error);

    res.status(500).json({
      success: false,
      message: "CognoDB connection failed",
      error: error.message,
    });
  } finally {
    await session.close();
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);

  try {
    await driver.verifyConnectivity();
    console.log("CognoDB connected successfully!");
  } catch (error) {
    console.error("CognoDB connection failed:", error.message);
  }
});