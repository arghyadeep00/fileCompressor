import { Router } from "express";
import { pdf_compress } from "../controller/pdfCompress.js";
import multer from "multer";
import fs from 'fs'
const pdfCompressRouter = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "uploads/";
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".pdf");
  },
});

const upload = multer({ storage });

pdfCompressRouter.post("/pdf_compress", upload.single("pdf"), pdf_compress);

export default pdfCompressRouter;
