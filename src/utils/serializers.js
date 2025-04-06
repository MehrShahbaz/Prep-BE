export const userSerializer = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
});

export const fileSerializer = (file) => ({
  id: file._id,
  originalName: file.originalName,
  name: file.name,
  path: file.path,
  size: file.size,
  type: file.type,
  status: file.status,
  createdAt: file.createdAt,
  uploadedBy: file.userId ? userSerializer(file.userId) : file.userId,
});

export const commentSerializer = (comment) => ({
  id: comment._id,
  fileId: comment.fileId,
  text: comment.text,
  createdAt: comment.createdAt,
  postedBy: comment.userId ? userSerializer(comment.userId) : comment.userId,
});
