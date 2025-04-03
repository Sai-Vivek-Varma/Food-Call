const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "food-call",
    allowed_formats: ["jpg", "png", "jpeg", "gif"],
  },
});

// Create multer upload middleware
const upload = multer({ storage: storage });

// Function to upload a base64 image directly
const uploadBase64Image = async (base64Image) => {
  try {
    // Remove data:image/jpeg;base64, part if it exists
    const imageData = base64Image.includes("base64,")
      ? base64Image.split("base64,")[1]
      : base64Image;

    const result = await cloudinary.uploader.upload(
      `data:image/jpeg;base64,${imageData}`,
      {
        folder: "food-call",
      }
    );

    return result.secure_url;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw new Error("Failed to upload image");
  }
};

module.exports = {
  cloudinary,
  upload,
  uploadBase64Image,
};
