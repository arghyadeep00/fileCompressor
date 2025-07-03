import { PDFDocument } from "pdf-lib";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pdf_compress = async (req, res) => {
  try {
    const existingPdfBytes = fs.readFileSync(req.file.path);
    const existingPdfDoc = await PDFDocument.load(existingPdfBytes);

    const newPdfDoc = await PDFDocument.create();

    const copiedPages = await newPdfDoc.copyPages(
      existingPdfDoc,
      existingPdfDoc.getPageIndices()
    );
    copiedPages.forEach((page) => newPdfDoc.addPage(page));

    const compressedPdfBytes = await newPdfDoc.save();

    if (!fs.existsSync("pdf")) fs.mkdirSync("pdf");

    fs.writeFileSync("pdf/compress.pdf", compressedPdfBytes);
    const compressedSize = compressedPdfBytes.length;
    fs.unlinkSync(req.file.path);

    res.status(200).json({
      success: true,
      message: "Pdf compressed successfuly",
      fileSize: compressedSize,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const download_pdf = async (req, res) => {
  const file = path.join(__dirname, "../pdf/compress.pdf");
  try {
    res.download(file, "compressed.pdf", (err) => {
      if (err) {
        console.error("Error sending file:", err);
        if (!res.headersSent) {
          res.status(500).json({ error: "Download failed" });
        }
      }
    });
  } catch (error) {
    console.log("catch error", error);
  }
};

export { pdf_compress, download_pdf };
