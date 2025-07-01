import { Router } from "express";
import pdf_compress from "../controller/pdfCompress.js";
import {
  image_upload,
  image_compress,
  image_download,
} from "../controller/imageCompress.js";
import multer from "multer";
import fs from "fs";
const compressRouter = Router();

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
// pdf routes
compressRouter.post("/pdf_compress", upload.single("pdf"), pdf_compress);

// Image routes
compressRouter.post("/image_upload", upload.single("image"), image_upload);
compressRouter.post("/image_compress", image_compress);
compressRouter.post("/image_download", image_download);

export { compressRouter };
