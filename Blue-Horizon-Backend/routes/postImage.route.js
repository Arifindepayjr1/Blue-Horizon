import express from "express";
import postImageController from "../Controller/postImage.controller.js";
import upload from "../middleware/userContentPictureUpload.js";
const postImageRouter = express.Router();

postImageRouter.get("/", postImageController.getAllPostImage);
postImageRouter.get("/post/:id", postImageController.getAllPostImageBySpecificPost);
postImageRouter.post("/create", upload.single("content"), postImageController.createPostImage);
postImageRouter.delete("/:id", postImageController.deletePostImage);
postImageRouter.put("/:id", upload.single("content"), postImageController.updatepostImage);

export default postImageRouter;
