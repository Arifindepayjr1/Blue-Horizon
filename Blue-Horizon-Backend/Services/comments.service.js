import logger from "../logger.js";
import commentsModel from "../Model/comments.model.js";

const commentsServices = {
    createComments: async function (post_id, user_id, comment) {
        try {
            const newPost = {
                post_id,
                user_id,
                comment,
            };
            const result = await commentsModel.createComments(newPost);
            if (result) {
                logger.info(`New Post Create Successfully`);
                return result;
            } else {
                logger.warn(`New Post Creation Failed`);
                return undefined;
            }
        } catch (err) {
            logger.error(`Error Occurr When trying to Create new Comments ${err.message}`);
            throw err;
        }
    },
    getAllComments: async function () {
        try {
            const data = await commentsModel.getAllComments();
            if (data) {
                logger.info(`Retrieve All Comments Successfully`);
                return data;
            } else {
                logger.warn(`Retrieve All Comments Unsuccessfully`);
                return undefined;
            }
        } catch (err) {
            logger.error(`Error Occured While Retrieving All Comments`);
            throw err;
        }
    },
    getAllCommentsById: async function (id) {
        try {
            const result = await commentsModel.getAllCommentsById(id);
            if (result) {
                logger.info(`Get Comment by id is Successfuly`);
                return result;
            } else {
                logger.warn(`Comments with id: ${id} is not found`);
                return undefined;
            }
        } catch (error) {
            logger.error(`Error Occured When trying to get comments by id`);
            throw error;
        }
    },
    getAllCommentsByPostId: async function (post_id) {
        try {
            const result = await commentsModel.getAllCommentsByPostId(post_id);
            if (result) {
                logger.info(`Comment with that PostId successfully retrived`);
                return result;
            } else {
                logger.info(`Comment with that PostId is not found`);
                return undefined;
            }
        } catch (error) {
            logger.error(`Error Occurred while trying to get Comment by Post Id`);
            throw error;
        }
    },
    updateComments: async function (id, post_id, user_id, comment) {
        try {
            const commentUpdate = {
                post_id,
                user_id,
                comment,
            };
            const result = await commentsModel.updateComments(id, commentUpdate);
            if (result) {
                logger.info(`Comment with Id ${id} Successfully update`);
                return result;
            } else {
                logger.warn(`Comment with Id ${id} UnSuccessfully update`);
                return undefined;
            }
        } catch (err) {
            logger.error(`Error Occurred When trying to Update Comment`);
            throw err;
        }
    },
    deleteComments: async function (id) {
        try {
            const result = commentsModel.deleteComments(id);
            if (result) {
                return result;
            } else {
                return undefined;
            }
        } catch (error) {
            logger.error(`Error Occur While Delete Comment by id`);
            throw error;
        }
    },
};
export default commentsServices;
