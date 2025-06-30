"use client";
import React, { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Progress } from "../../components/ui/progress";
import axios from "axios";

const CompressPdf = () => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [response, setResponse] = useState();
  const backendUrl = "https://filecompressor-nmik.onrender.com"; // https://filecompressor-nmik.onrender.com/
  
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
      setPdfFile(file);
      const newUrl = URL.createObjectURL(file);

      setPdfUrl(newUrl);
      const formData = new FormData();
      formData.append("pdf", file);

      const response = await axios.post(
        `${backendUrl}/api/pdf_compress`,
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 1000) / progressEvent.total
            );
            setUploadProgress(percent);
          },
        }
      );
      setResponse(response);
      setUploadProgress(0);
    } else {
      alert("Please select a valid PDF file");
    }
  };

  const fileDownload = async () => {
    const response = await axios.get(`${backendUrl}/api/download_pdf`, {
      responseType: "blob",
      headers: {
        Accept: "application/pdf",
      },
    });
    const url = window.URL.createObjectURL(
      new Blob([response.data], { type: "application/pdf" })
    );
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "compressed.pdf");
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  };
  useEffect(() => {
    console.log(pdfFile);
  });
  return (
    <>
      {!response ? (
        <>
          <div className="mt-20 flex gap-5 flex-col items-center justify-center w-full">
            <h1 className="font-bold text-[4rem] text-center">Compress PDF file</h1>
            <p className="text-2xl text-center px-3">
              Reduce file size while optimizing for maximal PDF quality.
            </p>
            <label
              htmlFor="pdf"
              className="bg-green-600 cursor-pointer text-white font-bold mt-8 rounded-3xl p-5 text-2xl"
            >
              Select PDF file
            </label>
            <div className="w-1/4 mt-6 flex flex-col gap-3 items-center">
              {uploadProgress ? (
                <>
                  {" "}
                  <Progress value={uploadProgress} /> working on compressing...{" "}
                </>
              ) : (
                <></>
              )}
            </div>
            <input
              type="file"
              className="hidden"
              name="pdf"
              accept="application/pdf"
              id="pdf"
              onChange={handleFileChange}
            />
          </div>
        </>
      ) : (
        <div className="w-full h-[85vh] flex">
          <div className="left w-1/2 flex gap-3 flex-col items-center">
            <div className="box border w-1/2 h-full">
              {pdfUrl ? (
                <iframe
                  src={pdfUrl + "#toolbar=0"}
                  className="w-full h-full"
                  title="Original PDF Preview"
                />
              ) : (
                <p>No preview available</p>
              )}
            </div>
          </div>
          <div className="right w-1/2 flex flex-col items-start gap-3 ">
            <p>{pdfFile.name}</p>
            <p className="text-xl text-gray-300 bg-gray-900 px-4 py-1 rounded-sm">
              Original file size: {(pdfFile.size / (1024 * 1024)).toFixed(2)}MB{" "}
            </p>
            <p className="text-xl text-gray-300 bg-gray-900 px-4 py-1 rounded-sm">
              After compressed file size:{" "}
              {(response.data.fileSize / (1024 * 1024)).toFixed(2)}MB{" "}
            </p>

            <button
              className="p-2 rounded-md mt-4 cursor-pointer bg-green-500 text-gray-200 text-2xl w-1/2 font-medium hover:bg-green-600"
              onClick={fileDownload}
            >
              Download Compressed PDF
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CompressPdf;
