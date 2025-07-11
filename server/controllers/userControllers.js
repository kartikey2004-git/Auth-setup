import { User } from "../models/userModel.js";
import { Image } from "../models/imageMemoryModel.js";
import { Memory } from "../models/memoryDataModels.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const getUserData = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const userData = {
    name: user.name,
    isAccountVerified: user.isAccountVerified,
  };

  return res
    .status(201)
    .json(new ApiResponse(201, userData, "User data fetched successfully"));
});

export const fileUpload = asyncHandler(async (req, res) => {
  const files = req.files?.avatar;

  if (!files || files.length === 0) {
    throw new ApiError(400, "No files provided");
  }

  const uploadedUrls = [];

  for (const file of files) {
    const result = await uploadOnCloudinary(file.path);
    if (result?.secure_url) {
      await Image.create({
        image: result.secure_url,
        image_public_id: result.public_id,
      });
      uploadedUrls.push(result.secure_url);
    }
  }

  if (uploadedUrls.length === 0) {
    throw new ApiError(500, "Upload to Cloudinary failed for all files");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, uploadedUrls, "Images uploaded successfully"));
});

export const getAllImages = asyncHandler(async (_req, res) => {
  const images = await Image.find().sort({ createdAt: -1 });
  const urls = images.map((img) => img.image);

  return res
    .status(201)
    .json(new ApiResponse(201, urls, "Images fetched successfully"));
});

export const createMemory = asyncHandler(async (req, res) => {
  const { title, description, funnyIncident } = req.body;

  if (!title || !description || !funnyIncident) {
    throw new ApiError(
      400,
      "Title, description and funny incident are required"
    );
  }

  const memory = await Memory.create({ title, description, funnyIncident });

  return res
    .status(201)
    .json(new ApiResponse(201, memory, "Memory created successfully"));
});

export const getMemories = asyncHandler(async (_req, res) => {
  const memories = await Memory.find().sort({ createdAt: -1 });

  return res
    .status(201)
    .json(new ApiResponse(201, memories, "Memories fetched successfully"));
});


