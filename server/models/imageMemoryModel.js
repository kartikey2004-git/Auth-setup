import mongoose, { Schema } from "mongoose";

const imageSchema = new Schema(
  {
    image: {
      type: String, // cloudinary url
      required: true,
    },

    //  image Public ID saved here (used to delete old image from Cloudinary)

    image_public_id: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Image = mongoose.model("Image", imageSchema);
