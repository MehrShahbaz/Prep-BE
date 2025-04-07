// src/app.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import { responseSerializer } from "./middleware/responseSerializer.js";
import userRoutes from "./routes/userRoutes.js";
import fileRoutes from "./routes/fileRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(responseSerializer);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.resolve(__dirname, "uploads")));

app.use("/api/users", userRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/auth", authRoutes);

export default app;
