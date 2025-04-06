import express from "express";
import upload from "../middleware/uploads.js";
import {
  uploadFile,
  getAllFiles,
  updateFileStatus,
} from "../controllers/fileController.js";

const router = express.Router();

router.post("/upload", upload.single("file"), uploadFile);
router.get("/", getAllFiles);
router.patch("/:id", updateFileStatus);

export default router;
