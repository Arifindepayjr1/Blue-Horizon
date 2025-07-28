import express from "express";
import postController from "../Controller/post.controller.js";
import upload from "../middleware/userThumbnailPictureUpload.js";

const postRouter = express.Router();

postRouter.get("/", postController.getAllPost);
postRouter.get("/:id", postController.getAllPostById);
postRouter.get("/users/:id", postController.getAllPostByUserId);
postRouter.post("/create", upload.single("thumbnail"), postController.createPost);
postRouter.put("/:id", upload.single("thumbnail"), postController.updatePost);
postRouter.delete("/:id", postController.deletePost);
postRouter.get("/count/users/:id", postController.countUserPost);

export default postRouter;
