import { PDFDocument } from "pdf-lib";
import fs from "fs";

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

export default pdf_compress;
