import { Router } from "express";
const imageRouter = Router();
import upload from "../middleware/multer.middleware.js";
import {
  image_compress,
  image_download,
  image_upload,
} from "../controller/image.controller.js";

imageRouter.post(
  "/compress/image_upload",
  upload.single("image"),
  image_upload
);
imageRouter.post("/compress/image_upload",image_upload)
imageRouter.post("/compress/image_compress", image_compress);
imageRouter.get("/compress/image_download", image_download);

export default imageRouter;
