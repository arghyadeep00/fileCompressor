import { Router } from "express";
import pdf_compress from "../controller/pdfCompress.js";
import image_compress from "../controller/imageCompress.js";
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

compressRouter.post("/pdf_compress", upload.single("pdf"), pdf_compress);
compressRouter.post("/image_compress", upload.single("image"), image_compress);

export default compressRouter;
