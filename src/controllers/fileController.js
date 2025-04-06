import File from "../models/File.js";

export const uploadFile = async (req, res) => {
  try {
    const { originalname, filename, size, mimetype, path } = req.file;
    const { userId } = req.body;

    const file = new File({
      originalName: originalname,
      name: filename,
      size,
      type: mimetype,
      path,
      userId,
    });

    await file.save();
    res.status(201).json(file);
  } catch (error) {
    console.log("Upload error:", error.message);
    res.status(400).json({ message: error.message });
  }
};

export const getAllFiles = async (_req, res) => {
  try {
    const files = await File.find().populate("userId", "name email");
    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
