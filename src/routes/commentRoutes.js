import express from "express";

import {
  createComment,
  getCommentsById,
} from "../controllers/commentControllers.js";

const router = express.Router();

router.post("/", createComment);
router.get("/", getCommentsById);

export default router;
