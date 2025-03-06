
import { Upload, X } from 'lucide-react';

const ImageUpload = ({ imagePreview, onImageSelect, onImageRemove }) => {
  return (
    <>
      <div className="relative">
        <input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          onChange={onImageSelect}
          className="sr-only"
        />
        <label
          htmlFor="image"
          className="w-full cursor-pointer px-4 py-2 rounded-md border border-dashed border-input bg-secondary/30 flex items-center justify-center hover:bg-secondary transition-all"
        >
          {imagePreview ? (
            <div className="w-full h-10 flex items-center justify-between">
              <span className="truncate text-sm">Image selected</span>
              <Upload className="w-5 h-5 text-muted-foreground" />
            </div>
          ) : (
            <div className="flex items-center">
              <Upload className="w-5 h-5 mr-2 text-muted-foreground" />
              <span>Upload Image</span>
            </div>
          )}
        </label>
      </div>
      
      {imagePreview && (
        <div className="mt-2">
          <div className="relative w-full h-48 rounded-md overflow-hidden border border-input">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={onImageRemove}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
              aria-label="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageUpload;
