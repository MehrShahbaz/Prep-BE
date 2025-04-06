import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import fileRoutes from "./routes/fileRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// 🛠️ Resolve __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Serve uploads folder correctly
app.use("/uploads", express.static(path.resolve(__dirname, "uploads")));

app.use("/api/users", userRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/comments", commentRoutes);

const start = async () => {
  try {
    await connectDB();
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("Connection error:", err.message);
  }
};

start();
