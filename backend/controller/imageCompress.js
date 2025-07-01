import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let imageFile = {};

const image_upload = async (req, res) => {
  imageFile = req.file;

  res.status(200).json({
    success: true,
    message: "image uploaded",
  });
};

const image_compress = async (req, res) => {
  const quality = req.body;
  let originalname = imageFile.originalname;
  const ext = originalname.split(".").pop().toLowerCase();

  try {
    if (["jpg", "jpeg", "png,", "webp"].includes(ext)) {
      const filePath = path.join(__dirname, "../uploads/" + imageFile.filename);
      const tempPath = path + "_temp";
      await sharp(filePath)
        .toFormat(ext, { quality: parseInt(quality.quality) })
        .toFile(tempPath);
      fs.renameSync(tempPath, filePath);

      const stats = fs.statSync(filePath);
      const sizeInKB = Math.round(stats.size / 1024);
      const imageBuffer = fs.readFileSync(filePath);
      const base64Image = imageBuffer.toString("base64");

      res.status(200).json({
        success: true,
        message: "Image compressed successfully",
        fileSize: sizeInKB,
        image: base64Image,
        filename: originalname,
        mimeType: imageFile.mimetype,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "send a valid image format",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Image compress faild",
    });
  }
};

const image_download = async (req, res) => {
  const filePath = path.join(__dirname, "../uploads/" + imageFile.filename);
 
  res.download(filePath, imageFile.originalname, (err) => {
    if (err) {
      res.status(400).json({
        success: false,
        message: "download faild",
      });
    }
  });
};

export { image_upload, image_compress, image_download };
