import express from "express";
import multer from "multer";
import pdfCompressRouter from "./routes/pdfCompress.route.js";
import cors from "cors";
import downloadRoute from "./routes/downloadFile.route.js";
const app = express();
const PORT = 4001;

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Express server!");
});

app.use("/api", pdfCompressRouter);
app.use('/api',downloadRoute)
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
