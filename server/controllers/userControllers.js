import { Image } from "../models/imageMemoryModel.js";
import userModel from "../models/userModel.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import Memory from "../models/memoryDataModels.js";

export const getUserData = async (req, res) => {
  try {
    // first we have to find the user on the basis of userId (userId added by userAuth middleware in req.body)

    const { userId } = req.body;

    // find the user in database on basis of userId

    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({
      success: true, // coz we get the user's details

      userData: {
        name: user.name,
        isAccountVerified: user.isAccountVerified,
      },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const fileUpload = async (req, res) => {
  try {
    const files = req.files?.avatar; // avatar is the field name from multer

    if (!files || files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No files provided",
      });
    }

    const uploadedUrls = [];

    for (const file of files) {
      const result = await uploadOnCloudinary(file.path);
      if (result?.secure_url) {
        // Save to MongoDB
        await Image.create({
          image: result.secure_url,
          image_public_id: result.public_id,
        });

        uploadedUrls.push(result.secure_url);
      }
    }

    if (uploadedUrls.length === 0) {
      return res.status(500).json({
        success: false,
        message: "Upload to Cloudinary failed for all files",
      });
    }

    // Return the secure URL to frontend
    return res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      data: uploadedUrls, // array of secure URLs
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};


export const getAllImages = async (req, res) => {
  try {
    const images = await Image.find().sort({ createdAt: -1 }); // latest first

    // Only extract image URLs
    const urls = images.map((img) => img.image);

    res.status(200).json({ success: true, data: urls });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch images",
    });
  }
};


export const createMemory = async (req, res) => {
  try {
    const { title, description, funnyIncident } = req.body;
    const memory = await Memory.create({ title, description, funnyIncident });
    res.status(201).json({ success: true, data: memory });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getMemories = async (req, res) => {
  try {
    const memories = await Memory.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: memories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

