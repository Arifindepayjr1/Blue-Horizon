import logger from "../logger.js";
import likeModel from "../Model/like.model.js";

const likeServices = {
    getAllLikePost: async function () {
        try {
            const result = await likeModel.getAllLikePost();
            if (result) {
                logger.info(`Successfully Get All Like Post`);
                return result;
            } else {
                logger.warn(`UnSuccessfully Get All Like Post`);
                return undefined;
            }
        } catch (err) {
            logger.error(`Error Occured While Getting All Like Post ${err.message}`);
            throw err;
        }
    },
    getAllLikePostByIdPost: async function (id) {
        try {
            const result = await likeModel.getAllLikePostByIdPost(id);
            logger.info(`${result}`);
            if (result) {
                logger.info(`Successfully Getting All like Post by post id`);
                return result;
            } else {
                logger.warn(`Post Not Found`);
                return undefined;
            }
        } catch (err) {
            logger.error(`Error Occured While Getting All like Post by Post Id`);
            throw err;
        }
    },
    createLike: async function (user_id, post_id) {
        try {
            const newLikeForUser = {
                user_id,
                post_id,
            };
            const result = await likeModel.createLike(newLikeForUser);
            if (result) {
                logger.info(`Create Like For User is Successfullly`);
                return result;
            } else {
                logger.warn(`Unsuccessfully Create Like For User`);
                return undefined;
            }
        } catch (err) {
            logger.error(`Error Occurred When Trying to Create Like for users`);
            throw err;
        }
    },
    getAllLikePostByIdUser: async function (id) {
        try {
            const result = await likeModel.getAllLikePostByIdUser(id);
            if (result) {
                logger.info(`Successfully Getting All Like Post By User ID : ${id}`);
                return result;
            } else {
                logger.warn(`User Not Found`);
                return undefined;
            }
        } catch (err) {
            logger.error(`Error Occur when trying to Get All Like Post By Specific User`);
            throw err;
        }
    },
    unlikePost: async function (user_id, post_id) {
        try {
            const result = await likeModel.unlikePost(user_id, post_id);
            if (result) {
                logger.info(`Unlike Post Successfully`);
                return result;
            } else {
                logger.warn(`Failed to Unlike Post`);
                return undefined;
            }
        } catch (err) {
            logger.error(`Error Occured When Trying to unlike post : ${err.message}`);
            throw err;
        }
    },
};
export default likeServices;
