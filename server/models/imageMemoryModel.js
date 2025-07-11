import mongoose, { Schema } from "mongoose";

const imageSchema = new Schema(
  {
    image: {
      type: String, 
      required: true,
    },
    image_public_id: {
      type: String,
      required: true,
    },
    uploadedBy:{
      type: Schema.Types.ObjectId,
      ref: "user"
    }
  },
  { timestamps: true }
);

export const Image = mongoose.models.image || mongoose.model("image", imageSchema);





// cloudinary url
//  image Public ID saved here (used to delete old image from Cloudinary)