import express from "express";

import {
  createUser,
  deleteUser,
  getAllUsers,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/user", createUser);
router.get("/users", getAllUsers);
router.delete("/user/:id", deleteUser);

export default router;
