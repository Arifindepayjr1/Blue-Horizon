import commentsServices from "../Services/comments.service.js";
import logger from "../logger.js";

const status = {
    SUCCESS: "SUCCESS",
    FAILURE: "FAILURE",
    ERROR: "ERROR",
};

const commentsController = {
    createComments: async function (req, res) {
        try {
            const { post_id, user_id, comment } = req.body;
            if (!post_id || !user_id || !comment) {
                logger.warn("All Fields are required");
                return res.status(400).json({
                    status: status.SUCCESS,
                    message: "All Fields are required",
                });
            } else {
                const data = await commentsServices.createComments(post_id, user_id, comment);
                if (data) {
                    res.status(200).json({
                        status: status.SUCCESS,
                        message: `Comment create Successfully`,
                        data: data,
                    });
                    logger.info("Comment Create Successfully");
                } else {
                    res.status(400).json({
                        status: status.FAILURE,
                        message: `Comment Creation Failed`,
                    });
                    logger.warn("Comment to create Post");
                }
            }
        } catch (error) {
            logger.error("Error Occur when trying to Create Comment : ", error.message);
            res.status(500).json({
                status: status.ERROR,
                message: `Error Occurred when trying to create Comment ${error.message}`,
                error: error.message,
            });
        }
    },
    getAllComments: async function (req, res) {
        try {
            const data = await commentsServices.getAllComments();
            if (data) {
                logger.info(`Retrieved All Comments Successfully`);
                res.status(200).json({
                    status: status.SUCCESS,
                    message: `Retrieving All Comments Successfully`,
                    data: data,
                });
            } else {
                logger.warn(`Comments are not found`);
                res.status(400).json({
                    status: status.FAILURE,
                    message: `Comments are not found`,
                });
            }
        } catch (err) {
            logger.error(`Error Occurred While trying to Retrieved All Comments: `, err.message);
            res.status(500).json({
                status: status.ERROR,
                message: `Error Occurred While Trying to Retrieved All Comments ${err.message}`,
                error: err.message,
            });
        }
    },
    getAllCommentsById: async function (req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                logger.warn(`Id : ${id} is invalid`);
                return res.status(400).json({
                    status: status.FAILURE,
                    message: `Invalid Comments Id`,
                });
            } else {
                const data = await commentsServices.getAllCommentsById(Number(id));
                if (data) {
                    res.status(200).json({
                        status: status.SUCCESS,
                        message: `comment with id : ${id} retrieved Successfully`,
                        data: data,
                    });
                    logger.info(`Successful get comment with id : ${id}`);
                } else {
                    res.status(400).json({
                        status: status.FAILURE,
                        message: "comments with Id are not found",
                    });
                    logger.info(`Unsuccessfuly get Comment with id : ${id}`);
                }
            }
        } catch (error) {
            logger.error(`Error Occurred While trying to get Comment by Id : `, error.message);
            res.status(500).json({
                status: status.ERROR,
                message: `Error Occurred While trying to get Comments By Id ${error.message}`,
                error: error.message,
            });
        }
    },
    getAllCommentsByPostId: async function (req, res) {
        try {
            const postId = req.params.id;
            if (!postId) {
                logger.warn(`Invalid PostId in Comment Section`);
                return res.status(400).json({
                    status: status.FAILURE,
                    message: `Invalid Comment PostID`,
                });
            } else {
                const data = await commentsServices.getAllCommentsByPostId(postId);
                if (data) {
                    logger.info(`Get All Comment By postId successfully`);
                    res.status(200).json({
                        status: status.SUCCESS,
                        message: `Comment with PostId ${postId} are successfully retrieved`,
                        data: data,
                    });
                } else {
                    logger.warn(`Comment with this postId : ${postId} are not found`);
                    res.status(400).json({
                        status: status.FAILURE,
                        message: `Comment with postId ${postId} are not found`,
                    });
                }
            }
        } catch (error) {
            logger.error(`Error Occured when trying to get comment by postId: `, error.message);
            res.status(500).json({
                status: status.ERROR,
                message: `Error Occured while trying to get comment by postId ${error.message}`,
                error: error.message,
            });
        }
    },
    updateComments: async function (req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                logger.error(`Update Comment Id is invalid`);
                return res.status(400).json({
                    status: status.FAILURE,
                    message: "Update Comments Id is invalid",
                });
            } else {
                const { post_id, user_id, comment } = req.body;
                if ((!post_id || !user_id, !comment)) {
                    logger.warn(`All field are required`);
                    return res.status(400).json({
                        status: status.ERROR,
                        message: "All field are required",
                    });
                } else {
                    const data = await commentsServices.updateComments(
                        id,
                        post_id,
                        user_id,
                        comment
                    );
                    if (data) {
                        res.status(200).json({
                            status: status.SUCCESS,
                            message: `Comment With ID ${id} update Successfully`,
                            data: data,
                        });
                        logger.info(`comment with id : ${id} update Successfully`);
                    } else {
                        res.status(400).json({
                            status: status.FAILURE,
                            message: `Comment with Id ${id} are not found`,
                        });
                        logger.warn(`comment with id : ${id} are not found`);
                    }
                }
            }
        } catch (error) {
            logger.error(`Erorr Occcured While Updating Comments : `, error.message);
            res.status(500).json({
                status: status.ERROR,
                message: `Error Occured While Updating Comments ${error.message}`,
                error: error.message,
            });
        }
    },
    deleteComments: async function (req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                logger.warn(`Invalid Delete Comments Id`);
                return res.status(400).json({
                    status: status.FAILURE,
                    message: "Invalid Delete Comments Id",
                });
            } else {
                const result = await commentsServices.deleteComments(Number(id));
                if (result) {
                    logger.info(`Comment with Id: ${id} delete Successfully`);
                    res.status(200).json({
                        status: status.SUCCESS,
                        message: `Comment with Id : ${id} Delete Successfully`,
                    });
                } else {
                    logger.warn(`Comment With Id : ${id} is not found`);
                    res.status(400).json({
                        status: status.FAILURE,
                        message: `Comment with Id : ${id} is not found`,
                    });
                }
            }
        } catch (error) {
            logger.error(`Error Occurred While Deleting Comment By Id: `, error.message);
            res.status(500).json({
                status: status.ERROR,
                message: `Error Occurred While Deleting Comment By Id: ${error.message}`,
            });
        }
    },
};
export default commentsController;
