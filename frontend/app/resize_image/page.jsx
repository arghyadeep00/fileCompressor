"use client";
import "../../public/css/public.css";
import React, { useState } from "react";
import { MdOutlineCloudUpload } from "react-icons/md";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
const ResizeImage = () => {
  // const backendUrl = "http://localhost:4001";
  const backendUrl = "https://filecompressor-nmik.onrender.com";
  const formData = {
    width: "",
    height: "",
    unit: "",
    quality: "",
  };
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [progress, setProgress] = useState(0);
  const [switchStatus, setSwitchStatus] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(true);
  const [fileData, setFileData] = useState(formData);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
    }
    try {
      const formData = new FormData();
      formData.append("image", file);
      const response = await axios.post(
        `${backendUrl}/api/resize/image_upload`,
        formData,
        {
          onUploadProgress: (progress) => {
            const percent = Math.round(
              (progress.loaded * 100) / progress.total
            );
            setProgress(percent);
          },
        }
      );
      response ? setUploadStatus(false) : setUploadStatus(true);
    } catch (error) {
      alert("Image upload faild");
    }
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    if (!switchStatus && name === "width") {
      setFileData((prev) => ({ ...prev, width: value, height: value }));
    } else if (!switchStatus && name === "height") {
      setFileData((prev) => ({ ...prev, width: value, height: value }));
    } else {
      setFileData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const resizeRequestDownload = async () => {
    const allFieldsFilled = Object.values(fileData).every(
      (value) =>
        value !== undefined && value !== null && value.toString().trim() !== ""
    );

    if (!allFieldsFilled) {
      alert("Please fill all the fields");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${backendUrl}/api/resize/image_compress_download`,
        fileData
      );

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

      const objectURL = URL.createObjectURL(file);
      setImageUrl(objectURL);

      setLoading(false);

      const a = document.createElement("a");
      a.href = objectURL;
      a.download = data.filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      alert("Download failed");
    }
  };

  return (
    <div className="w-full">
      {uploadStatus ? (
        <div className="w-full">
          <h1 className="text-4xl sm:text-6xl font-bold text-center">
            Resize an Image
          </h1>
          <label htmlFor="file">
            <div
              className={`w-[70%] sm:w-1/2 h-[20vh] sm:h-[30vh] flex flex-col gap-3 justify-center items-center cursor-pointer border rounded-2xl m-auto mt-10 relative overflow-hidden`}
            >
              <MdOutlineCloudUpload className="text-5xl" />
              Select Here to Image Upload
              <div
                className={`w-[${progress}%] h-full absolute left-0 bg-[#ffffff11]`}
              ></div>
            </div>
          </label>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
            id="file"
          />
        </div>
      ) : (
        <div className="w-full h-[60vh] flex flex-col sm:flex-row gap-4 p-4">
          {/* Left Image Preview Section */}
          <div className="sm:w-[35%] h-full flex flex-col items-center justify-center rounded-2xl bg-gray-900 shadow-md p-4">
            <div className="w-[50%] aspect-square border-2 border-dashed rounded-2xl flex items-center justify-center relative overflow-hidden bg-black">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  className="absolute inset-0 w-full h-full object-contain rounded-sm z-10"
                  alt=""
                />
              ) : (
                <Skeleton className="h-[100%] w-[100%] bg-gray-800" />
              )}
            </div>
            <div className="mt-4 text-center">
              <p className="text-lg font-medium">{image?.name}</p>
              <p className="text-sm text-gray-600"></p>
              <p className="text-sm text-gray-600">
                Original file size: {Math.round(image?.size / 1024)}KB
              </p>
            </div>
          </div>

          {/* Right Control Panel */}
          <div className="sm:w-[65%] p-4 h-full bg-gray-950 rounded-2xl flex flex-col items-center px-4">
            <h1 className="text-center text-2xl sm:text-4xl font-bold mt-4">
              Choose the size format and quality
            </h1>
            <div className="flex justify-evenly flex-col sm:flex-row w-full">
              <div className="mt-10 space-y-6">
                {/* Width Input */}
                <div className="flex flex-row items-center gap-3">
                  <label htmlFor="width" className="text-lg font-medium w-24">
                    Width:
                  </label>
                  <Input
                    type="number"
                    className="w-full sm:w-32 border rounded px-2 py-1"
                    placeholder="Width"
                    id="width"
                    name="width"
                    require={true}
                    value={fileData.width}
                    onChange={onChangeHandler}
                  />
                </div>

                {/* Height Input */}
                <div className="flex flex-row items-center gap-3">
                  <label htmlFor="height" className="text-lg font-medium w-24">
                    Height:
                  </label>
                  <Input
                    type="number"
                    className="w-full sm:w-32 border rounded px-2 py-1"
                    placeholder="Height"
                    id="height"
                    name="height"
                    value={fileData.height}
                    onChange={onChangeHandler}
                  />
                </div>

                {/* Unit Dropdown */}
                <div className="flex flex-row items-center gap-3">
                  <label htmlFor="unit" className="text-lg font-medium w-24">
                    Unit:
                  </label>
                  <select
                    id="unit"
                    className="w-full sm:w-40 border rounded px-2 p-1 text-gray-500"
                    name="unit"
                    onChange={onChangeHandler}
                    value={fileData.unit}
                  >
                    <option value="percent">Percent</option>
                    <option value="pixel">Pixel</option>
                    <option value="cm">Centimeter</option>
                    <option value="inch">Inches</option>
                  </select>
                </div>

                {/* Quality Input */}
                <div className="flex flex-row items-center gap-3">
                  <label htmlFor="quality" className="text-lg font-medium w-24">
                    Quality:
                  </label>
                  <Input
                    type="number"
                    id="quality"
                    className="w-full sm:w-32 border rounded px-2 py-1"
                    placeholder="0 - 100 %"
                    name="quality"
                    value={fileData.quality}
                    onChange={onChangeHandler}
                  />
                </div>
              </div>
              <div className="mt-10 space-y-6 flex flex-col justify-between">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="width-height">Custom width & Height</Label>
                  <Checkbox
                    id="width-height"
                    onCheckedChange={(e) => setSwitchStatus(e)}
                    checked={switchStatus}
                  />
                </div>

                <Button
                  className={
                    "w-full cursor-pointer py-2 bg-green-600 hover:bg-green-700 duration-200"
                  }
                  onClick={resizeRequestDownload}
                  disabled={loading}
                >
                  Download Image
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResizeImage;
