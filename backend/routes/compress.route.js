import { Router } from "express";
import pdf_compress from "../controller/pdfCompress.js";
import {
  image_upload,
  image_compress,
  image_download,
} from "../controller/imageCompress.js";
import upload from "../middleware/multer.middleware.js";

const compressRouter = Router();

// pdf routes
compressRouter.post("/pdf_compress", upload.single("pdf"), pdf_compress);

// Image routes
compressRouter.post("/compress/image_upload", upload.single("image"), image_upload);
compressRouter.post("/compress/image_compress", image_compress);
compressRouter.get("/compress/image_download", image_download);

export { compressRouter };
