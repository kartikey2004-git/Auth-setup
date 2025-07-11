import fs from "fs/promises";
import { existsSync } from "fs";
import { v2 as cloudinary } from "cloudinary";
import { asyncHandler } from "./asyncHandler.js";
import { ApiError } from "./ApiError.js";
import { ApiResponse } from "./ApiResponse.js";

[
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
].forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`${key} is missing in environment variables`);
  }
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const uploadOnCloudinary = asyncHandler(
  async (localFilePath, options = {}) => {
    if (!localFilePath) {
      throw new ApiError(400, "Local file path is required");
    }

    try {
      const response = await cloudinary.uploader.upload(localFilePath, {
        resource_type: "auto",
        folder: options.folder || "uploads",
        ...options,
      });

      console.log("File uploaded to Cloudinary:", response.secure_url);

      return response;
    } catch (error) {
      console.error("Cloudinary upload error:", err.message);
      throw new ApiError(500, "Cloudinary upload failed", [], err.stack);
    } finally {
      if (existsSync(localFilePath)) {
        try {
          await fs.unlink(localFilePath);
          console.log("🧹 Temp file deleted:", localFilePath);
        } catch (fsErr) {
          console.warn("Could not delete temp file:", fsErr.message);
        }
      }
    }
  }
);

export const deleteFromCloudinary = asyncHandler(
  async (publicId, resourceType = "image") => {
    if (!publicId) {
      throw new ApiError(400, "Public ID is required for Cloudinary deletion");
    }

    try {
      const result = await cloudinary.uploader.destroy(publicId, {
        resource_type: resourceType,
      });

      if (result.result !== "ok") {
        throw new ApiError(500, "Failed to delete image from Cloudinary");
      }

      console.log("🗑️ Image deleted from Cloudinary:", publicId);
      return new ApiResponse(200, null, "Image deleted from Cloudinary");
    } catch (err) {
      console.error("Cloudinary deletion error:", err.message);
      throw new ApiError(500, "Cloudinary deletion failed", [], err.stack);
    }
  }
);


// agar koi bhi iss method  uploadOnCloudinary ko use kr rha hai toh itna pata hai humein ki file humare server pe toh hai , file path toh aa chuka hai

// for cleaning purpose , uss file ko server se bhi hata dena chahiye wrna server pe malicious files and corrupted file reh jayengi server pe

// ye configuration hi hai jo file upload krne ki permission degi cloudinary pe
