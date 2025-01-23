const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadToCloudinary(imageBase64, folder = "uploads") {
  try {
    const response = await cloudinary.uploader.upload(imageBase64, {
      folder: folder,
      public_id: "ticket",
    });
    return response.secure_url;
  } catch (error) {
    throw new Error(`Cloudinary upload failed: ${error.message}`);
  }
}
