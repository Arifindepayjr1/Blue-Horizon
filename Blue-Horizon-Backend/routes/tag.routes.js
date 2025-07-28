import express from "express";
import tagController from "../Controller/tag.controller.js";
const tagRouter = express.Router();

tagRouter.get("/", tagController.getAllTag);
tagRouter.get("/:id", tagController.getAllTagById);
tagRouter.post("/create", tagController.createTag);
tagRouter.put("/:id", tagController.updateTag);
tagRouter.delete("/:id", tagController.deleteTag);

export default tagRouter;
