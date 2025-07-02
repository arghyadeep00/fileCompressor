import { fileURLToPath } from "url";
import path from "path";
import sharp from "sharp";
import fs from "fs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let imageFile = {};

const image_upload = (req, res) => {
  imageFile = req.file;
  res.status(200).json({
    success: true,
    message: "Image upload success",
  });
};

const compress_download = async (req, res) => {
  try {
    const imagePath = path.join(__dirname, "../uploads/" + imageFile.filename);
    const { width, height, unit, quality } = req.body;
    const tempPath = imagePath + "_temp";

    const ext = imageFile.originalname.split(".").pop().toLowerCase();

    if (!["jpg", "jpeg", "png", "webp"].includes(ext)) {
      return res.status(400).json({
        success: false,
        message: "Please provide valid image",
      });
    }

    const w = parseInt(width);
    const h = parseInt(height);
    const q = parseInt(quality);

    let image_metadata, newWidth, newHeight;

    await sharp(imagePath)
      .metadata()
      .then((metadata) => {
        image_metadata = metadata;
      });

    if (unit === "cm") {
      newWidth = Math.round((w / 2.54) * image_metadata.density);
      newHeight = Math.round((h / 2.54) * image_metadata.density);
    } else if (unit === "inch") {
      newWidth = Math.round(w * image_metadata.density);
      newHeight = Math.round(h * image_metadata.density);
    } else if (unit === "percent") {
      newWidth = Math.round((w / 100) * image_metadata.width);
      newHeight = Math.round((w / 100) * image_metadata.height);
    } else if (unit === "pixel") {
      newWidth = w;
      newHeight = h;
    }

    await sharp(imagePath)
      .resize({ width: newWidth, height: newHeight })
      .toFormat(ext, { quality: q })
      .toFile(tempPath);
    fs.renameSync(tempPath, imagePath);

    const stat = fs.statSync(imagePath);
    const sizeInKB = Math.round(stat.size / 1024);
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = imageBuffer.toString("base64");

    const dimension = {
      width: newWidth,
      height: newHeight,
    };

    return res.status(200).json({
      success: true,
      message: "Operation success",
      size: sizeInKB,
      image: base64Image,
      filename:imageFile.originalname,
      dimension,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Operation unsuccess",
    });
  }
};

export { image_upload, compress_download };
