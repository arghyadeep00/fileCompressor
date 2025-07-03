"use client";
import React, { useEffect, useMemo, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Progress } from "@/components/ui/progress";
import backendUrl from "@/config/server";
import axios from "axios";

const CompressImage = () => {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [quality, setQuality] = useState(80);
  const [uploadResponse, setUploadResponse] = useState(false);
  const [compressedImage, setCompressedImage] = useState();
  const [loading, setLoading] = useState(false);
  const [compressedSize, setCompressedSize] = useState();

  const compressedImageUrl = useMemo(() => {
    return compressedImage ? URL.createObjectURL(compressedImage) : "";
  }, [compressedImage]);

  
  const handleOnImageUpload = (e) => {
    const file = e.target.files[0];
 
    if (file && file.type.startsWith("image/")) {
      setImage(file);
    }
  };
  // route for image upload to the server
  const imageUploadBtnClick = async () => {
    const formData = new FormData();
    formData.append("image", image);
    try {
      const response = await axios.post(
        `${backendUrl}/api/compress/image_upload`,
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percent);
          },
        }
      );
      setProgress(0);
      setUploadResponse(response.data.success);
    } catch (error) {
      alert("Image upload faild");
    }
  };

  // route for image compress
  const compressBtnClick = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${backendUrl}/api/compress/image_compress`, {
        quality: quality,
      });
      const data = response.data;
      setCompressedSize(data.fileSize);
      const blob = new Blob(
        [Uint8Array.from(atob(data.image), (c) => c.charCodeAt(0))],
        {
          type: data.mimeType,
        }
      );
      const file = new File([blob], data.filename, {
        type: blob.type,
        lastModified: Date.now(),
      });
      setLoading(false);
      setCompressedImage(file);
    } catch (error) {
      alert("Image compress faild");
    }
  };

  const downloadBtnClick = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/compress/image_download`, {
        responseType: "blob",
      });
      const blob = new Blob([response.data]);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = image.name;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      alert("Download Faild");
    }
  };

  return (
    <>
      {!uploadResponse ? (
        <>
          <div className="px-8 w-full flex flex-col items-center  justify-center  sm:items-start sm:flex-row sm:gap-5">
            <label htmlFor="image">
              <div className="w-50 h-50 border rounded-sm flex flex-col justify-center items-center relative overflow-hidden gap-5 cursor-pointer">
                <FaCloudUploadAlt className="text-xl" />
                <p className="px-2 text-center">Click here to Upload Image</p>
                {image && (
                  <img
                    src={URL.createObjectURL(image)}
                    alt=""
                    className="absolute inset-0 w-full h-full object-contain rounded-sm z-10 bg-black/80"
                  />
                )}
              </div>
            </label>
            <input
              type="file"
              name="image"
              className="hidden"
              id="image"
              accept="image/*"
              onChange={handleOnImageUpload}
            />
            {image && (
              <div className="flex flex-col gap-2">
                <span className="mt-5">{image.name}</span>
                <span>File Size: {(image.size / 1024).toFixed(2)} KB</span>
                <button
                  className="px-4 py-1 bg-green-600 rounded-sm cursor-pointer hover:bg-green-500 duration-200"
                  onClick={imageUploadBtnClick}
                >
                  Upload Image
                </button>
                {progress ? (
                  <Progress className={"mt-7"} value={progress} />
                ) : (
                  <></>
                )}
              </div>
            )}
            <h1></h1>
          </div>
          <h1 className="text-center text-4xl mt-10 font-medium px-3">
            Compress Your Image
          </h1>
        </>
      ) : (
        <>
          <div className="w-full  py-6">
            <div className="w-[90%]  sm:w-[70%] md:w-[60%] lg:w-[40%] mx-auto flex flex-col sm:flex-row rounded-xl overflow-hidden shadow-lg">
              <div className="sm:w-1/2 h-64 bg-gray-900 aspect-square overflow-hidden relative flex items-center justify-center text-xl font-bold text-gray-700">
                <img
                  src={URL.createObjectURL(image)}
                  alt="Original"
                  className="absolute inset-0 w-full h-full object-contain transition-all duration-500 ease-in-out"
                />
              </div>
              <div className="sm:w-1/2 h-64 aspect-square bg-gray-800 flex items-center justify-center text-xl font-bold text-gray-700 overflow-hidden relative">
                {loading ? (
                  <p className="text-center mt-10">Loading....</p>
                ) : (
                  <img
                    src={
                      compressedImageUrl
                        ? compressedImageUrl
                        : URL.createObjectURL(image)
                    }
                    alt="Compressed"
                    className="absolute inset-0 w-full h-full object-contain transition-all duration-500 ease-in-out"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="w-full  py-4">
            <div className="w-[90%] sm:w-[60%] lg:w-[40%] mx-auto bg-gray-800 rounded-xl p-6 text-white shadow-md space-y-6">
              {/* Quality Slider */}
              <div className="w-full flex flex-col gap-3">
                <label htmlFor="range" className="text-sm font-medium">
                  Choose Image Quality:{" "}
                  <span className="font-semibold text-green-400">
                    {quality}
                  </span>
                </label>
                <input
                  type="range"
                  id="range"
                  className="w-full accent-green-500 cursor-pointer"
                  value={quality}
                  min="10"
                  max="100"
                  onChange={(e) => setQuality(Number(e.target.value))}
                />
                <button
                  className="w-full mt-2 py-2 bg-green-600 cursor-pointer rounded-md font-semibold hover:bg-green-500 transition"
                  onClick={compressBtnClick}
                >
                  Apply Compression
                </button>
              </div>

              {/* Download and File Info */}
              <div className="w-full flex flex-col sm:flex-row gap-4 justify-between items-center">
                <button
                  className="w-full sm:w-1/2 py-2 cursor-pointer bg-blue-600 rounded-md font-semibold hover:bg-blue-500 transition"
                  onClick={downloadBtnClick}
                >
                  Download Image
                </button>

                <div className="w-full sm:w-1/2 text-sm flex flex-col gap-1 bg-gray-700 p-3 rounded-md">
                  <div className="flex justify-between">
                    <span>Original :</span>
                    <span className="text-gray-300">
                      {(image.size / 1024).toFixed(2)} KB
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Compressed :</span>
                    <span className="text-gray-300">{compressedSize} KB</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CompressImage;
