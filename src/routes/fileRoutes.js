import express from "express";
import upload from "../middleware/uploads.js";
import {
  uploadFile,
  getAllFiles,
  updateFileStatus,
} from "../controllers/fileController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/upload", protect, upload.single("file"), uploadFile);
router.get("/", getAllFiles);
router.patch("/:id", protect, updateFileStatus);

export default router;
