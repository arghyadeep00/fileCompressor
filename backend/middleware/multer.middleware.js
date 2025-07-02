import multer from "multer";
import fs from 'fs'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "uploads/";
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    let ext = "";
    if (file.mimetype === "application/pdf") {
      ext = ".pdf";
    } else if (file.mimetype.startsWith("image/")) {
      ext = "." + file.mimetype.split("/")[1];
    } else {
      ext = "";
    }
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage });

export default upload;
