import userServices from "../Services/users.service.js";
import logger from "../logger.js";

const status = {
    SUCCESS: "SUCCESS",
    FAILURE: "FAILURE",
    ERROR: "ERROR",
};

const userController = {
    usersRegister: async function (req, res) {
        try {
            const { name, username, email, password, bio } = req.body;
            if (!name || !username || !email || !password || !bio) {
                logger.warn("All fields are required for user registration");
                return res.status(400).json({
                    status: status.FAILURE,
                    message: "All fields are required",
                });
            }
            if (req.file) {
                const profilePicture = req.file.path;
                const profilePictureId = req.file.filename;
                const data = await userServices.usersRegister(
                    name,
                    username,
                    email,
                    password,
                    bio,
                    profilePicture,
                    profilePictureId
                );
                if (data) {
                    res.status(200).json({
                        status: status.SUCCESS,
                        message: "Users Registration Successfully",
                        data: data,
                    });
                    logger.info("Users Registered Successfully With Profile Picture");
                } else {
                    res.status(500).json({
                        status: status.FAILURE,
                        message: "User Registration failed",
                    });
                    logger.warn("User Registration failed");
                }
            } else {
                res.status(400).json({
                    status: status.FAILURE,
                    message: "Profile Picture is required for user registration",
                });
                logger.warn("Profile Picture is required for user registration");
            }
        } catch (err) {
            res.status(500).json({
                status: status.ERROR,
                message: "Error Occurred While Registering User",
                error: err.message,
            });
            logger.error("Error Occurred While Registering User: ", err.message);
        }
    },
    getAllUsers: async function (req, res) {
        try {
            const data = await userServices.getAllUsers();
            logger.info(data);
            if (data) {
                res.status(200).json({
                    status: status.SUCCESS,
                    message: "Users Retrived Successfully",
                    data: data,
                });
                logger.info("Users Retrived Successfully");
            } else {
                res.status(404).json({
                    status: status.FAILURE,
                    message: "No Users To Show",
                });
                logger.warn("No Users To Show");
            }
        } catch (err) {
            res.status(500).json({
                status: status.ERROR,
                message: "Error Occurred While Retrieving Users",
                error: err.message,
            });
            logger.error("Error Occurred While Retrieving Users: ", err.message);
        }
    },
    getUserById: async function (req, res) {
        const userId = req.params.id;
        try {
            if (!userId) {
                logger.warn("User ID is required to get user details");
                return res.status(400).json({
                    status: status.FAILURE,
                    message: "User ID is required",
                });
            } else {
                const data = await userServices.getUserById(Number(userId));
                if (data) {
                    res.status(200).json({
                        status: status.SUCCESS,
                        message: `User with ID: ${data.id} Retrieved Successfully`,
                        data: data,
                    });
                    logger.info("Get User By ID Successfully");
                } else {
                    res.status(404).json({
                        status: status.FAILURE,
                        message: "User Not Found",
                    });
                    logger.warn("User Not Found");
                }
            }
        } catch (error) {
            logger.error("Error Occurred While Getting User By ID: ", error.message);
            res.status(500).json({
                status: status.ERROR,
                message: "Error Occurred While Getting User By ID",
                error: error.message,
            });
        }
    },
    updateUser: async function (req, res) {
        const userId = req.params.id;
        try {
            if (!userId) {
                logger.warn("User ID is required to update user details");
                return res.status(400).json({
                    status: status.FAILURE,
                    message: "User ID is required",
                });
            } else {
                const { name, username, bio } = req.body;
                const profile_picture = req.file.path;
                const profile_picture_id = req.file.filename;
                if (!name || !username || !bio || !profile_picture || !profile_picture_id) {
                    logger.warn("All fields are required to update user details");
                    return res.status(400).json({
                        status: status.FAILURE,
                        message: "All fields are required to update user details",
                    });
                } else {
                    const data = await userServices.updateUser(
                        Number(userId),
                        name,
                        username,
                        bio,
                        profile_picture,
                        profile_picture_id
                    );
                    if (data) {
                        res.status(200).json({
                            status: status.SUCCESS,
                            message: `User with ID: ${data.id} Updated Successfully`,
                            data: data,
                        });
                        logger.info("User Updated Successfully");
                    } else {
                        res.status(404).json({
                            status: status.FAILURE,
                            message: "User Not Found",
                        });
                        logger.warn("User Not Found");
                    }
                }
            }
        } catch (err) {
            logger.error("Error Occurred While Updating User: ", err.message);
            res.status(500).json({
                status: status.ERROR,
                message: "Error Occurred While Updating User",
                error: err.message,
            });
        }
    },
    deleteUser: async function (req, res) {
        const userId = req.params.id;
        try {
            if (!userId) {
                logger.warn("User ID is required to delete user");
                return res.status(400).json({
                    status: status.FAILURE,
                    message: "User ID is required",
                });
            } else {
                const data = await userServices.deleteUser(Number(userId));
                if (data) {
                    res.status(200).json({
                        status: status.SUCCESS,
                        message: `User with ID: ${data.id} Deleted Successfully`,
                        data: data,
                    });
                    logger.info(`User with ID: ${data.id} Deleted Successfully`);
                } else {
                    res.status(404).json({
                        status: status.FAILURE,
                        message: "User Not Found",
                    });
                    logger.warn("User Not Found");
                }
            }
        } catch (err) {
            logger.error("Error Occurred While Deleting User: ", err.message);
            res.status(500).json({
                status: status.ERROR,
                message: "Error Occurred While Deleting User",
                error: err.message,
            });
        }
    },
};

export default userController;
