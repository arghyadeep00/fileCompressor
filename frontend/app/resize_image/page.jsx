import React from "react";
import { MdOutlineCloudUpload } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
const ResizeImage = () => {
  return (
    <div className="w-full">
      {!true ? (
        <div className="w-full">
          <h1 className="text-4xl sm:text-6xl font-bold text-center">
            Resize an Image
          </h1>
          <label htmlFor="file">
            <div className="w-[70%] sm:w-1/2 h-[20vh] sm:h-[30vh] flex flex-col gap-3 justify-center items-center cursor-pointer border rounded-2xl m-auto mt-10 relative overflow-hidden">
              <MdOutlineCloudUpload className="text-5xl" />
              Select Here to Image Upload
              <div className="w-[20%] h-full absolute left-0 bg-[#ffffff11]"></div>
            </div>
          </label>
          <input type="file" className="hidden" name="" id="file" />
        </div>
      ) : (
        <div className="w-full h-[60vh] flex flex-col sm:flex-row gap-4 p-4">
          {/* Left Image Preview Section */}
          <div className="sm:w-[35%] h-full flex flex-col items-center justify-center rounded-2xl bg-gray-900 shadow-md p-4">
            <div className="w-[50%] aspect-square border-2 border-dashed rounded-2xl flex items-center justify-center bg-black">
              <span className="text-gray-400">Image Preview</span>
            </div>
            <div className="mt-4 text-center">
              <p className="text-lg font-medium">file_name.jpg</p>
              <p className="text-sm text-gray-600">1270 x 1230</p>
              <p className="text-sm text-gray-600">12 KB</p>
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
                    disabled={true}
                    value={20}
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
                    placeholder="0 - 100"
                  />
                </div>
              </div>
              <div className="mt-10 space-y-6">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="width-height">Custom width & Height</Label>
                  <Switch id="width-height" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResizeImage;
