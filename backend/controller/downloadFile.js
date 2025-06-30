import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

export default download_pdf;
