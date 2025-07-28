import express from "express";
import postTagController from "../Controller/postTag.controller.js";

const postTagRouter = express.Router();

postTagRouter.get("/", postTagController.getAllPostAndTag);
postTagRouter.get("/post/:id", postTagController.getAllPostAndTagById);
postTagRouter.post("/create", postTagController.createPostAndTag);
postTagRouter.put("/post/:id", postTagController.updatePostAndTag);
postTagRouter.delete("/delete", postTagController.deletePostAndTag);

export default postTagRouter;
