import express from "express";
import commentsController from "../Controller/comments.controller.js";

const commentsRouter = express.Router();

commentsRouter.get("/", commentsController.getAllComments);
commentsRouter.get("/:id", commentsController.getAllCommentsById);
commentsRouter.get("/post/:id", commentsController.getAllCommentsByPostId);
commentsRouter.post("/create", commentsController.createComments);
commentsRouter.put("/:id", commentsController.updateComments);
commentsRouter.delete("/:id", commentsController.deleteComments);

export default commentsRouter;
