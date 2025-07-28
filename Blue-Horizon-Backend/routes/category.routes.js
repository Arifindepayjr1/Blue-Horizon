import categoryController from "../Controller/category.controller.js";
import express from "express";

const categoryRouter = express.Router();

categoryRouter.get("/", categoryController.getAllCategories);
categoryRouter.get("/:id", categoryController.getAllCategoriesById);
categoryRouter.post("/create", categoryController.createCategories);
categoryRouter.put("/:id", categoryController.updateCategory);
categoryRouter.delete("/:id", categoryController.deleteCategory);

export default categoryRouter;
