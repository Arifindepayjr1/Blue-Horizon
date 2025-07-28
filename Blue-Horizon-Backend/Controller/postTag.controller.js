import postTagServices from "../Services/postTag.service.js";
import logger from "../logger.js";

const status = {
    SUCCESS: "SUCCESS",
    FAILURE: "FAILURE",
    ERROR: "ERROR",
};

const postTagController = {
    getAllPostAndTag: async function (req, res) {
        try {
            const data = await postTagServices.getAllPostAndTag();
            if (data) {
                logger.info(`Successfully Get All the post and tag`);
                res.status(200).json({
                    status: status.SUCCESS,
                    message: `Successfully Get All The Post and tag`,
                    data: data,
                });
            } else {
                logger.warn(`Post and tags Not Found`);
                res.status(400).json({
                    status: status.FAILURE,
                    message: `Post and Tags Not founds`,
                });
            }
        } catch (err) {
            logger.error(`Error Occur While Getting All The Post Tag ${err.message}`);
            res.status(500).json({
                status: status.ERROR,
                message: `Error Occur While Getting All the Post Tag ${err.message}`,
                error: err.message,
            });
        }
    },
    getAllPostAndTagById: async function (req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                logger.warn(`Invalid Id`);
                res.status(400).json({
                    status: status.FAILURE,
                    message: `Invalid ID`,
                });
            } else {
                const data = await postTagServices.getAllPostAndTagById(id);
                if (data) {
                    logger.info(`Get Post And Tag Successfully Retrived`);
                    res.status(200).json({
                        status: status.SUCCESS,
                        message: `Get Post And Tag Successfully Retrieved`,
                        data: data,
                    });
                } else {
                    logger.warn(`Id Not Found`);
                    res.status(400).json({
                        status: status.FAILURE,
                        message: `Id Not Found`,
                    });
                }
            }
        } catch (err) {
            logger.error(`Error Occur When Trying to get Post And Tag By id : ${err.message}`);
            res.status(500).json({
                status: status.ERROR,
                message: `Error Occur When Trying to get Post And Tag By id : ${err.message}`,
                error: err.message,
            });
        }
    },
    createPostAndTag: async function (req, res) {
        try {
            const { post_id, tag_id } = req.body;
            if (!post_id || !tag_id) {
                logger.warn(`All Fields are required`);
                return res.status(400).json({
                    status: status.FAILURE,
                    message: `All fields aer required`,
                });
            } else {
                const data = await postTagServices.createPostAndTag(post_id, tag_id);
                if (data) {
                    logger.warn(`Successfully Create Post and Tag`);
                    res.status(200).json({
                        status: status.SUCCESS,
                        message: `Create Post and Tag Successfully Create`,
                        data: data,
                    });
                } else {
                    logger.warn(`Unsuccessfully Create Post and Tag`);
                    res.status(400).json({
                        status: status.FAILURE,
                        message: `UnSuccessfully Create Post and Tag`,
                    });
                }
            }
        } catch (error) {
            logger.error(`Error Occurred When tryin to create Post and tag ${error.message}`);
            res.status(500).json({
                status: status.ERROR,
                message: `Error Occurred When trying to create Post and Tag ${error.message}`,
            });
        }
    },
    deletePostAndTag: async function (req, res) {
        try {
            const { post_id, tag_id } = req.body;
            if (!post_id || !tag_id) {
                logger.warn(`All Fields are required`);
                return res.status(400).json({
                    status: status.FAILURE,
                    message: `All fields are requied`,
                });
            } else {
                const data = await postTagServices.deletePostAndTag(post_id, tag_id);
                if (data) {
                    logger.info(`Successfully Delete PostTag`);
                    res.status(200).json({
                        status: status.FAILURE,
                        message: `Successfully Delete PostTag`,
                        data,
                    });
                } else {
                    logger.warn(`Unsuccessfully Delete PostTag`);
                    res.status(400).json({
                        status: status.FAILURE,
                        message: `Unsuccessfully Delete PostTag`,
                    });
                }
            }
        } catch (error) {
            logger.error(`Error Occur When trying to delete Post Link add to tag`);
            res.status(500).json({
                status: status.ERROR,
                message: `Error Occur When trying to delete Post Link to tag`,
            });
        }
    },
    updatePostAndTag: async function (req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                logger.warn(`Invalid Post Id`);
                return res.status(400).json({
                    status: status.FAILURE,
                    message: `Invalid Post id`,
                });
            } else {
                const { tag_id } = req.body;
                if (!tag_id) {
                    return res.status(400).json({
                        status: status.FAILURE,
                        message: `All fields are required`,
                    });
                } else {
                    const result = await postTagServices.updatePostAndTag(id, tag_id);
                    if (result) {
                        logger.info(`Successfully Update PostTag`);
                        res.status(200).json({
                            status: status.SUCCESS,
                            message: `Successfully Update PostTag`,
                            data: result,
                        });
                    } else {
                        logger.warn(`Unsuccessfully Update PostTag`);
                        res.status(400).json({
                            status: status.FAILURE,
                            message: `Unsuccessfully Update PostTag`,
                        });
                    }
                }
            }
        } catch (error) {
            logger.error(`Error Occurred When trying to Update Post and Tag ${error.message}`);
            res.status(500).json({
                status: status.FAILURE,
                message: `Error Occurred When trying to Update Post and Tag ${error.message}`,
            });
        }
    },
};
export default postTagController;
