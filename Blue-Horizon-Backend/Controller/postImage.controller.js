import logger from "../logger.js";
import postImageServices from "../Services/postImage.service.js";

const status = {
    SUCCESS: "SUCCESS",
    FAILURE: "FAILURE",
    ERROR: "ERROR",
};

const postImageController = {
    getAllPostImage: async function (req, res) {
        try {
            const data = await postImageServices.getAllPostImage();
            if (data) {
                logger.info(`Successfully Get All Post image`);
                res.status(200).json({
                    status: status.SUCCESS,
                    message: `Successfully Get All Post Image`,
                    data,
                });
            } else {
                (logger.warn(`Post Image Not Found`),
                    res.status(400).json({
                        status: status.FAILURE,
                        message: `Post Image Not Found`,
                    }));
            }
        } catch (err) {
            logger.error(`Error Occurred When Trying to Get all Post Image : ${err.message}`);
            res.status(500).json({
                status: status.ERROR,
                message: `Error Occurred When Trying to Get all Post Image : ${err.message}`,
                error: err.message,
            });
        }
    },
    getAllPostImageBySpecificPost: async function (req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                logger.warn(`Invalid Id`);
                return res.status(400).json({
                    status: status.FAILURE,
                    message: `Invalid ID`,
                });
            } else {
                const data = await postImageServices.getAllPostImageBySpecificPost(id);
                if (data) {
                    logger.info(`Successfully Get Post Image By Specific Post`);
                    res.status(200).json({
                        status: status.SUCCESS,
                        message: `Successfully Get Post Image By Specific Post`,
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
            logger.error(`Error Occurred When Get Post Image by Specific Post : ${err.message}`);
            res.status(500).json({
                status: status.ERROR,
                message: `Error Occurred When Get Post Image by Specific Post: ${err.message}`,
                error: err.message,
            });
        }
    },
    createPostImage: async function (req, res) {
        try {
            const { post_id, caption } = req.body;
            logger.info(`${post_id} , ${caption}`);
            if (!post_id || !caption) {
                logger.warn(`All Fields are required`);
                return res.status(400).json({
                    status: status.FAILURE,
                    message: `All Fields are required`,
                });
            } else {
                if (req.file) {
                    const image_url = req.file.path;
                    const public_id = req.file.filename;
                    const data = await postImageServices.createPostImage(
                        post_id,
                        caption,
                        image_url,
                        public_id
                    );
                    if (data) {
                        logger.info(`Successfully Create Post Image`);
                        res.status(200).json({
                            status: status.SUCCESS,
                            message: `Successfully Create Post Image`,
                            data: data,
                        });
                    } else {
                        logger.warn(`Unsuccessfully Create Post Image`);
                        res.status(400).json({
                            status: status.FAILURE,
                            message: `Unsuccessfully Create Post Image`,
                        });
                    }
                } else {
                    logger.warn(`Image are required here`);
                    return res.status(400).json({
                        status: status.FAILURE,
                        message: `Image are required here`,
                    });
                }
            }
        } catch (error) {
            logger.error(`Error Occurred While Trying to Create Post image: ${error.message}`);
            return res.status(500).json({
                status: status.ERROR,
                message: `Error Occurred While Trying to Create Post image: ${error.message}`,
                error: error.message,
            });
        }
    },
    deletePostImage: async function (req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                logger.warn(`Id is invalid`);
                return res.status(400).json({
                    status: status.FAILURE,
                    message: `Invalid Id`,
                });
            } else {
                const result = await postImageServices.deletePostImage(id);
                if (result) {
                    logger.info(`Post Image id : ${id} Delet Successfully`);
                    res.status(200).json({
                        status: status.SUCCESS,
                        message: `Post Image id : ${id} Delete Successfully`,
                    });
                } else {
                    logger.warn(`Post Image Id not found`);
                    res.status(400).json({
                        status: status.FAILURE,
                        message: `Post Image Not Found`,
                    });
                }
            }
        } catch (error) {
            logger.error(`Error Occur While Trying to Delete Post Image : ${error.message}`);
            res.status(500).json({
                status: status.ERROR,
                message: `Error Occur While Trying to Delete Post Image : ${error.message}`,
                error: error.message,
            });
        }
    },
    updatepostImage: async function (req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                logger.warn(`Invalid Id`);
                return res.status(400).json({
                    status: status.FAILURE,
                    message: `Invalid Id`,
                });
            } else {
                const { post_id, caption } = req.body;
                if (!post_id || !caption) {
                    logger.warn(`All Fields are required`);
                    return res.status(400).json({
                        status: status.FAILURE,
                        meesage: `All Fields are required`,
                    });
                } else {
                    if (req.file) {
                        const image_url = req.file.path;
                        const public_id = req.file.filename;
                        const data = await postImageServices.updatepostImage(
                            id,
                            post_id,
                            caption,
                            image_url,
                            public_id
                        );
                        if (data) {
                            logger.warn(`Successfully Update Post Image`);
                            res.status(200).json({
                                status: status.SUCCESS,
                                message: `Successfully Update Post Image`,
                                data: data,
                            });
                        } else {
                            logger.warn(`Post Image Not found`);
                            res.status(400).json({
                                status: status.FAILURE,
                                message: `Post Image Not Found`,
                            });
                        }
                    } else {
                        logger.warn(`image are required here`);
                        return res.status(400).json({
                            status: status.FAILURE,
                            message: `Image are required`,
                        });
                    }
                }
            }
        } catch (err) {
            logger.error(`Error Occurred While Updating Post Imagae : ${err.meesage}`);
            return res.status(500).json({
                status: status.ERROR,
                meesage: `Error Occurred While Updating Post Imagae : ${err.meesage}`,
                error: err.meesage,
            });
        }
    },
};
export default postImageController;
