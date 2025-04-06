import multer from "multer";
import path from "path";

// Set storage engine
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, path.resolve("src/uploads"));
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, `${name}-${Date.now()}${ext}`);
  },
});

// Optional: Restrict file types
const fileFilter = (_req, file, cb) => {
  cb(null, true); // Accept all for now
};

const upload = multer({ storage, fileFilter });

export default upload;
