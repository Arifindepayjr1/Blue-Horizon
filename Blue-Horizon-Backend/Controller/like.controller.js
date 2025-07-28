import logger from "../logger.js";
import likeServices from "../Services/like.service.js";

const status = {
    SUCCESS: "SUCCESS",
    FAILURE: "FAILURE",
    ERROR: "ERROR",
};

const likeController = {
    getAllLikePost: async function (req, res) {
        try {
            const data = await likeServices.getAllLikePost();
            if (data) {
                logger.info(`Successfully Get All The like Post`);
                res.status(200).json({
                    status: status.SUCCESS,
                    message: `Successfully Get All The Like Post`,
                    data: data,
                });
            } else {
                logger.warn(`Unsuccessfully Get All The Like Post`);
                res.status(400).json({
                    status: status.FAILURE,
                    message: `Like Post Not Found`,
                });
            }
        } catch (err) {
            logger.error(`Erorr Occurred When trying to get all like post ${err.message}`);
            res.status(500).json({
                status: status.ERROR,
                message: `Erorr Occurred When trying to get all like post ${err.message}`,
                error: err.message,
            });
        }
    },
    getAllLikePostByIdPost: async function (req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                logger.warn(`Invalid Id`);
                return res.status(400).json({
                    status: status.FAILURE,
                    message: `Invalid Id`,
                });
            } else {
                const data = await likeServices.getAllLikePostByIdPost(Number(id));
                logger.info(`${data}`);
                if (data) {
                    logger.info(`Successfully Get All The Like from Post: ${id}`);
                    res.status(200).json({
                        status: status.SUCCESS,
                        message: `Successfully Get All The Like From Post: ${id}`,
                        data: data,
                    });
                } else {
                    logger.warn(`Post Not Found`);
                    res.status(400).json({
                        status: status.FAILURE,
                        message: `Post Not Found`,
                    });
                }
            }
        } catch (err) {
            logger.error(`Error Occur While Trying to Get All Like Post By Id: ${err.message}`);
            res.status(500).json({
                status: status.FAILURE,
                message: `Error Occur While Trying to Get All Like Post By Id: ${err.message}`,
                error: err.message,
            });
        }
    },
    createLike: async function (req, res) {
        try {
            const { user_id, post_id } = req.body;
            if (!user_id || !post_id) {
                logger.warn(`All Fields are required`);
                return res.status(400).json({
                    status: status.FAILURE,
                    message: `All Fields are required`,
                });
            } else {
                const data = await likeServices.createLike(user_id, post_id);
                if (data) {
                    logger.info(`Successfully Create Like for User`);
                    res.status(200).json({
                        status: status.SUCCESS,
                        message: `Successfully Create Like for User`,
                        data: data,
                    });
                } else {
                    logger.warn(`UnSuccessfully Create Like for User`);
                    res.status(400).json({
                        status: status.FAILURE,
                        message: `UnSuccessfully Create Like For User`,
                    });
                }
            }
        } catch (error) {
            logger.error(`Error Occur When Trying to Create LIke for User: ${error.message}`);
            res.status(500).json({
                status: status.ERROR,
                message: `Error Occur When Trying to Create LIke for User: ${error.message}`,
                error: error.message,
            });
        }
    },
    getAllLikePostByIdUser: async function (req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                logger.warn(`Invalid Id`);
                return res.status(400).json({
                    status: status.FAILURE,
                    message: `Invalid Id`,
                });
            } else {
                const data = await likeServices.getAllLikePostByIdUser(Number(id));
                if (data) {
                    logger.info(`Successfully Get All Post by Specific User`);
                    res.status(200).json({
                        status: status.SUCCESS,
                        message: `Successfully Get All Post By User`,
                        data: data,
                    });
                } else {
                    logger.warn(`UnSuccessfully Get All Post By Specific User`);
                    res.status(400).json({
                        status: status.FAILURE,
                        message: `User Not Found`,
                    });
                }
            }
        } catch (error) {
            logger.error(`Error Occur when trying to get All Post By User id : ${error.message}`);
            res.status(500).json({
                status: status.ERROR,
                message: `Error Occur when trying to get All Post By User id : ${error.message}`,
                error: error.message,
            });
        }
    },
    unlikePost: async function (req, res) {
        try {
            const { user_id, post_id } = req.body;
            if (!user_id || !post_id) {
                logger.warn(`All Fields are required`);
                res.status.json({
                    status: status.FAILURE,
                    message: `All Fields are required`,
                });
            } else {
                const result = await likeServices.unlikePost(user_id, post_id);
                if (result) {
                    logger.info(`Successfully Unlike Post`);
                    res.status(200).json({
                        status: status.SUCCESS,
                        message: `Succuessfully Unlike Post`,
                        data: result,
                    });
                } else {
                    logger.warn(`Failed to Unlike Post`);
                    res.status(400).json({
                        status: status.FAILURE,
                        message: `Failed To Unlike Post`,
                    });
                }
            }
        } catch (error) {
            logger.error(`Error Occured When Trying to unlike post : ${error.message}`);
            res.status(500).json({
                status: status.ERROR,
                message: `Error Occured When Trying to unlike post : ${error.message}`,
                error: error.message,
            });
        }
    },
};
export default likeController;
