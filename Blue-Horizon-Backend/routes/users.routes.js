import express from "express";
import userController from "../Controller/users.controller.js";
import upload from "../middleware/userProfilePictureUpload.js";

const userRouter = express.Router();

userRouter.get("/", userController.getAllUsers);
userRouter.get("/:id", userController.getUserById);
userRouter.post("/register", upload.single("profilePicture"), userController.usersRegister);
userRouter.put("/:id", upload.single("profilePicture"), userController.updateUser);
userRouter.delete("/:id", userController.deleteUser);

export default userRouter;
