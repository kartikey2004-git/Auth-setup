import express from "express";
import userAuth from "../middleware/userAuth.js";
import { createMemory, fileUpload, getAllImages, getMemories, getUserData } from "../controllers/userControllers.js";
import { upload } from "../middleware/multer.middleware.js";

const userRouter = express.Router();

userRouter.get("/data", userAuth, getUserData);

userRouter.post(
  "/upload",
  userAuth,
  upload.fields([{ name: "avatar", maxCount: 5 }]),
  fileUpload
);

userRouter.get("/images",userAuth,getAllImages)


userRouter.post("/createBlog",userAuth,createMemory)
userRouter.get("/getBlogs",userAuth,getMemories)

export default userRouter;