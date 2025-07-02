import { Router } from "express";
const resizeRoute = Router();
import upload from "../middleware/multer.middleware.js";
import {
  image_upload,
  compress_download,
} from "../controller/resize.controller.js";

resizeRoute.post("/resize/image_upload", upload.single("image"), image_upload);
resizeRoute.post("/resize/image_compress_download", compress_download);

export default resizeRoute;
