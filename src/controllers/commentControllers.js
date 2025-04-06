import Comment from "../models/Comment.js";

export const createComment = async (req, res) => {
  try {
    const { fileId, userId, text } = req.body;

    if (!fileId || !userId || !text) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const comment = new Comment({ fileId, userId, text });
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getCommentsById = async (req, res) => {
  try {
    const { fileId, userId } = req.query;

    const filter = {};

    if (userId) filter.userId = userId;
    if (fileId) filter.fileId = fileId;

    if (Object.keys(filter).length === 0) {
      return res.status(400).json({ message: "No filter criteria provided." });
    }

    const comments = await Comment.find(filter).populate(
      "userId",
      "name email"
    );
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
