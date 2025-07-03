import express from "express";
const app = express();
import cors from "cors";
import pdfRouter from "./routes/pdf.route.js";
import imageRouter from "./routes/imge.route.js";
import resizeRoute from "./routes/resize.route.js";
const PORT = 4001;

app.use(
  cors({
    // origin: "*",
    origin: "https://file-compressor-six.vercel.app",
  })
);
app.use(express.json());


app.use("/api", pdfRouter);
app.use("/api", imageRouter);
app.use("/api", resizeRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
