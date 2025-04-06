import express from "express";

import {
  createUser,
  deleteUser,
  getAllUsers,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/").post(createUser).get(getAllUsers);
router.delete("/:id", deleteUser);

export default router;
