import { Router } from "express";
import download_pdf from "../controller/downloadFile.js";
const downloadRoute = Router();

downloadRoute.get("/download_pdf", download_pdf);

export default downloadRoute;
