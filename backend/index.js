import express from "express";
import multer from "multer";
import { compressRouter } from "./routes/compress.route.js";
import cors from "cors";
import downloadRoute from "./routes/downloadFile.route.js";
const app = express();
const PORT = 4001;

app.use(
  cors({
    origin: "*",
    // origin: "https://file-compressor-six.vercel.app",
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Express server!");
});

app.use("/api", compressRouter);
app.use("/api", downloadRoute);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
