export const responseSerializer = (_req, res, next) => {
  res.serialize = (data, serializer) => {
    if (!serializer) return res.json(data);
    const result = serializer(data);
    return res.json(result);
  };

  res.serializeMany = (dataArray, serializer) => {
    if (!Array.isArray(dataArray)) {
      return res.status(500).json({ message: "Expected an array" });
    }
    const result = dataArray.map(serializer);
    return res.json(result);
  };

  next();
};
