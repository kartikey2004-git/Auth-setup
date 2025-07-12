import express from "express";
import userAuth from "../middleware/userAuth.js";
import {
  fileUpload,
  getAllImages,
  getUserData,
} from "../controllers/userControllers.js";
import { upload } from "../middleware/multer.middleware.js";

const userRouter = express.Router();

userRouter.get("/data", userAuth, getUserData);

userRouter.post(
  "/upload",
  userAuth,
  upload.fields([{ name: "avatar", maxCount: 5 }]),
  fileUpload
);

userRouter.get("/images", userAuth, getAllImages);

export default userRouter;
