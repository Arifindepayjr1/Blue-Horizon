import express from "express";
import likeController from "../Controller/like.controller.js";

const likeRouter = express.Router();

likeRouter.get("/", likeController.getAllLikePost);
likeRouter.get("/post/:id", likeController.getAllLikePostByIdPost);
likeRouter.get("/user/:id", likeController.getAllLikePostByIdUser);
likeRouter.post("/create", likeController.createLike);
likeRouter.delete("/delete", likeController.unlikePost);

export default likeRouter;
