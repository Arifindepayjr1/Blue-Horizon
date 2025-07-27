import express from "express";
import saveLaterController from "../Controller/saveLater.controller.js";

const saveLaterRouter = express.Router();

saveLaterRouter.get("/", saveLaterController.getAllSavedLater);
saveLaterRouter.get("/count-users/", saveLaterController.getSavedLaterCountPerUser);
saveLaterRouter.get("/users/:id", saveLaterController.getSavedLaterPerUser);
saveLaterRouter.post("/create", saveLaterController.createSavedLater);
saveLaterRouter.delete("/:id", saveLaterController.deleteSavedLater);

export default saveLaterRouter;
