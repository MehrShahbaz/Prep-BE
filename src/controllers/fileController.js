import File from "../models/File.js";
import fs from "fs";
import path from "path";

import { fileSerializer } from "../utils/serializers.js";
export const uploadFile = async (req, res) => {
  try {
    const { originalname, filename, size, mimetype } = req.file;
    const { userId } = req.body;

    const file = new File({
      originalName: originalname,
      name: filename,
      size,
      type: mimetype,
      path: `/uploads/${filename}`,
      userId,
    });

    await file.save();
    res.status(201).json(file);
  } catch (error) {
    // 👇 Delete the file if it was saved to disk but DB failed
    if (req.file && req.file.path) {
      fs.unlink(path.resolve(req.file.path), (err) => {
        if (err) {
          console.error("Failed to delete uploaded file:", err.message);
        } else {
          console.log("Cleaned up upload:", req.file.filename);
        }
      });
    }

    res.status(400).json({ message: error.message });
  }
};

export const getAllFiles = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const files = await File.find({ userId }).populate("userId", "name email");
    const serialized = files.map(fileSerializer);
    res.status(200).json(serialized);
    res.status(200).json(serialized);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateFileStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const file = await File.findById(id);
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    if (file.userId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this file" });
    }

    const validStatuses = ["pending", "approved", "needs_changes"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    if (file.status === status) {
      return res
        .status(400)
        .json({ message: `File is already marked as ${status}` });
    }

    if (
      ["approved", "needs_changes"].includes(file.status) &&
      status !== "pending"
    ) {
      return res.status(400).json({
        message: `Cannot change a ${file.status} file unless resetting to pending`,
      });
    }

    file.status = status;
    await file.save();

    res.status(200).json(file);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

