import postService from "../Services/post.service.js";
import userServices from "../Services/users.service.js";
import logger from "../logger.js";

const status = {
    SUCCESS: "SUCCESS",
    FAILURE: "FAILURE",
    ERROR: "ERROR",
};

const postController = {
    createPost: async function (req, res) {
        try {
            const { userId, categoryId, title, content, status } = req.body;
            if (!userId || !categoryId || !title || !content || !status) {
                logger.warn(`All Field Are Required`);
                return res.status(400).json({
                    status: status.FAILURE,
                    message: "All Fields are required",
                });
            } else {
                const thumbnail_url = req.file.path;
                const thumbnail_id = req.file.filename;
                const data = await postService.createPost(
                    userId,
                    categoryId,
                    title,
                    content,
                    status,
                    thumbnail_url,
                    thumbnail_id
                );

                if (data) {
                    res.status(200).json({
                        status: status.SUCCESS,
                        message: "Post Create Successfully",
                        data: data,
                    });
                    logger.info("Post Create Successfully");
                } else {
                    res.status(400).json({
                        status: status.FAILURE,
                        message: "Failed to create Post",
                    });
                    logger.warn("Failed to Create Post");
                }
            }
        } catch (err) {
            logger.error("Error Occurred When Trying to Create Post :  ", err.message);
            res.status(500).json({
                status: status.ERROR,
                message: "Error Occur When Trying to Create Post",
                error: err.message,
            });
        }
    },
    getAllPost: async function (req, res) {
        try {
            const data = await postService.getAllPost();
            if (data) {
                logger.info("Retrieved All Post Successfully");
                res.status(200).json({
                    status: status.SUCCESS,
                    message: "Retrived All Post Successfully",
                    data: data,
                });
            } else {
                logger.warn("Failed To Retrived All Post");
                res.status(400).json({
                    status: status.FAILURE,
                    message: "Failed To Retrived All Post",
                });
            }
        } catch (err) {
            logger.error("Error While Retrived All Post");
            res.status(500).json({
                status: status.ERROR,
                message: `Error While Retrived All Post ${err.message}`,
                error: err.message,
            });
        }
    },
    getAllPostById: async function (req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                logger.warn("INVALID POST ID");
                return res.status(400).json({
                    status: status.FAILURE,
                    message: "INVALID POST ID",
                });
            } else {
                const data = await postService.getAllPostById(Number(id));
                if (data) {
                    res.status(200).json({
                        status: status.SUCCESS,
                        message: "Get Post By Id Retrived Successfully",
                        data: data,
                    });
                    logger.info("Retrived Post By Id Successfully");
                } else {
                    res.status(400).json({
                        status: status.FAILURE,
                        message: "User Not Found",
                    });
                    logger.warn("User Not Found");
                }
            }
        } catch (error) {
            logger.error("Error Occurred While trying to Get Post By Id : ", error.message);
            res.status(500).json({
                status: status.ERROR,
                message: "Error Occurred While trying to Get Post By Id : ",
                error: error.message,
            });
        }
    },
    updatePost: async function (req, res) {
        try {
            const id = req.params.id;
            const { user_id, category_id, title, content, status } = req.body;
            if ((!user_id, !category_id || !title || !content || !status)) {
                logger.warn("All Fields are required");
                return res.status(400).json({
                    status: status.FAILURE,
                    message: "All fields are requied",
                });
            } else {
                const thumbnail_url = req.file.path;
                const thumbnail_id = req.file.filename;
                const data = await postService.updatePost(
                    Number(id),
                    user_id,
                    category_id,
                    title,
                    content,
                    status,
                    thumbnail_url,
                    thumbnail_id
                );
                if (data) {
                    res.status(200).json({
                        status: status.SUCCESS,
                        message: `User with ID: ${id} Update Successfully`,
                        data: data,
                    });
                } else {
                    res.status(400).json({
                        status: status.FAILURE,
                        message: `User Not Found`,
                    });
                }
            }
        } catch (err) {
            logger.error("Error Occurred While trying to Update Post: ", err.message);
            res.status(500).json({
                status: status.ERROR,
                error: err.message,
                message: `Error Occurred While trying to Update Post ${err.message}`,
            });
        }
    },
    deletePost: async function (req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                logger.warn("Invalid Delete Id");
                return res.status(400).json({
                    status: status.FAILURE,
                    message: "Invalid Delete Id",
                });
            } else {
                const result = await postService.deletePost(Number(id));
                if (result) {
                    res.status(200).json({
                        status: status.SUCCESS,
                        message: `Post With Id: ${id} Delete Successfully`,
                    });
                    logger.info(`Post With Id ${id} delete Successful`);
                } else {
                    res.status(400).json({
                        status: status.FAILURE,
                        message: `Post With Id: ${id} Not Found`,
                    });
                    logger.warn(`Post with Id ${id} Not Found`);
                }
            }
        } catch (err) {
            logger.error("Error Occured While Deleting Post: ", err.message);
            res.status(500).json({
                status: status.ERROR,
                message: `Error Occurred While Deleting Post: ${err.message}`,
                error: err.message,
            });
        }
    },
};
export default postController;
