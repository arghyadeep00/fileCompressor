import { Router } from "express";
const pdfRouter = Router();
import upload from "../middleware/multer.middleware.js";
import { download_pdf, pdf_compress } from "../controller/pdf.controller.js";

pdfRouter.post("/pdf/pdf_compress", upload.single("pdf"), pdf_compress);
pdfRouter.get("/pdf/download_pdf", download_pdf);

export default pdfRouter;
