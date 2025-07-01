"use client";
import React, { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Progress } from "@/components/ui/progress";

const CompressImage = () => {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [quality, setQuality] = useState(50);
  const backendUrl = "http://localhost:4001";
  return (
    <>
      {!false ? (
        <>
          <div className="px-8 w-full flex flex-col items-center  justify-center  sm:items-start sm:flex-row sm:gap-5">
            <label htmlFor="image">
              <div className="w-50 h-50 border rounded-sm flex justify-center items-center relative overflow-hidden gap-2 cursor-pointer">
                <FaCloudUploadAlt />
                <p>Upload image</p>
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
              onChange={(e) => setImage(e.target.files[0])}
            />
            {image && (
              <div className="flex flex-col gap-2">
                <span className="mt-5">{image.name}</span>
                <span>File Size: {(image.size / 1024).toFixed(2)} KB</span>
                <button className="px-4 py-1 bg-green-500 rounded-sm cursor-pointer">
                  Upload Image
                </button>
                <Progress className={"mt-7"} value={40} />
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
                <img
                  src="./bird.jpg"
                  alt="Original"
                  className="absolute inset-0 w-full h-full object-contain transition-all duration-500 ease-in-out"
                />
              </div>
            </div>

            {/* Right Side */}
            <div className="w-full sm:w-1/2 flex flex-col items-center sm:items-start justify-center gap-4">
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                Compressed Image
              </h2>
              <div className="sm:w-1/2 w-[50%] aspect-square bg-black border border-gray-400 rounded-xl shadow-lg overflow-hidden relative">
                <img
                  src="./bird.jpg"
                  alt="Compressed"
                  className="absolute inset-0 w-full h-full object-contain transition-all duration-500 ease-in-out"
                />
              </div>
            </div>
          </div>
          <div className="w-full px-4 flex flex-col items-center mt-5 gap-3">
            <label htmlFor="range" className="text-xl text-gray-400">
              Choose the Quality of the Image: {quality}{" "}
            </label>
            <input
              type="range"
              className="w-1/2"
              name=""
              max={100}
              defaultValue={quality}
              min={10}
              id="range"
              onChange={(e) => setQuality(e.target.value)}
            />
            <button className="w-1/2 mt-3 py-2 rounded-sm bg-green-600 text-xl font-bold cursor-pointer hover:bg-green-500 duration-200 ease-in">
              Apply
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default CompressImage;
