"use client";
import React, { useEffect, useMemo, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Progress } from "@/components/ui/progress";
import axios from "axios";

const CompressImage = () => {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [quality, setQuality] = useState(80);
  const [uploadResponse, setUploadResponse] = useState(false);
  const [compressedImage, setCompressedImage] = useState();
  const [loading, setLoading] = useState(false);

  const compressedImageUrl = useMemo(() => {
    return compressedImage ? URL.createObjectURL(compressedImage) : "";
  }, [compressedImage]);

  const backendUrl = "http://localhost:4001";

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
        `${backendUrl}/api/image_upload`,
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
      const response = await axios.post(`${backendUrl}/api/image_compress`, {
        quality: quality,
      });
      const data = response.data;
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
      console.log(error);
    }
  };

  return (
    <>
      {uploadResponse ? (
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
          <div className="w-full px-6 flex justify-between gap-5 sm:gap-30 flex-col sm:flex-row transition-all duration-300">
            {/* Left Side */}
            <div className="w-full sm:w-1/2 flex flex-col items-center sm:items-end justify-center gap-4">
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                Original Image
              </h2>
              <div className="sm:w-1/2 w-[50%] aspect-square bg-black border border-gray-400 rounded-xl shadow-lg overflow-hidden relative">
                {/* <img
                  src={URL.createObjectURL(image)}
                  alt="Original"
                  className="absolute inset-0 w-full h-full object-contain transition-all duration-500 ease-in-out"
                /> */}
              </div>
            </div>

            {/* Right Side */}
            <div className="w-full sm:w-1/2 flex flex-col items-center sm:items-start justify-center gap-4">
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                Compressed Image
              </h2>
              <div className="sm:w-1/2 w-[50%] aspect-square bg-black border border-gray-400 rounded-xl shadow-lg overflow-hidden relative">
                {loading ? (
                  <p className="text-center mt-10">Loading....</p>
                ) : (
              
                  // <img
                  //   src={
                  //     compressedImageUrl
                  //       ? compressedImageUrl
                  //       : URL.createObjectURL(image)
                  //   }
                  //   alt="Compressed"
                  //   className="absolute inset-0 w-full h-full object-contain transition-all duration-500 ease-in-out"
                  // />
                  <></>
                )}
              </div>
              
            </div>
          </div>
          <div className="w-full px-4 flex flex-col items-center mt-5 gap-3">
            <label htmlFor="range" className="text-xl text-gray-400">
              Choose the Quality of the Image: {quality}{" "}
            </label>
            <input
              type="range"
              className="w-1/2 cursor-pointer"
              name=""
              max={100}
              value={quality}
              min={10}
              id="range"
              onChange={(e) => setQuality(Number(e.target.value))}
            />
            <button
              className="w-1/2 mt-3 py-1 rounded-sm bg-green-600 text-xl font-bold cursor-pointer hover:bg-green-500 duration-200 ease-in"
              onClick={compressBtnClick}
            >
              Apply
            </button>
            
          </div>
        </>
      )}
    </>
  );
};

export default CompressImage;
