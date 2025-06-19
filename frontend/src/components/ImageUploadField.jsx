import React from "react";
import { Upload, X } from "lucide-react";

const ImageUploadField = ({
  imageFile,
  imagePreview,
  onImageChange,
  onRemoveImage,
}) => (
  <div className="lg:col-span-2">
    <label
      htmlFor="image"
      className="block text-sm font-semibold text-gray-700 mb-2"
    >
      Food Image (Optional)
    </label>
    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-green-400 transition-colors">
      <div className="space-y-1 text-center">
        {imagePreview ? (
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="mx-auto h-40 w-auto rounded-lg shadow-md"
            />
            <button
              type="button"
              onClick={onRemoveImage}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors shadow-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <>
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600 justify-center">
              <label
                htmlFor="image"
                className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
              >
                <span>Upload a photo</span>
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={onImageChange}
                  className="sr-only"
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
          </>
        )}
      </div>
    </div>
  </div>
);

export default ImageUploadField;
