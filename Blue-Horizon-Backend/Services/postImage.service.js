import postImageModel from "../Model/postImage.model.js";
import logger from "../logger.js";
const postImageServices = {
    getAllPostImage: async function () {
        try {
            const result = await postImageModel.getAllPostImage();
            if (result) {
                logger.info(`Successfully Get All Post Image`);
                return result;
            } else {
                logger.warn(`Post image Not Found`);
                return undefined;
            }
        } catch (err) {
            logger.error(`Error Occured When trying to get Post Image ${err.message}`);
            throw err;
        }
    },
    getAllPostImageBySpecificPost: async function (id) {
        try {
            const result = await postImageModel.getAllPostImageBySpecificPost(id);
            if (result) {
                logger.info(`Successfully Get All Post Image by Specific Post`);
                return result;
            } else {
                logger.warn(`Post Not Found`);
                return undefined;
            }
        } catch (err) {
            logger.error(`Error Occurred While Trying to get AllPost Image Specific Post`);
            throw err;
        }
    },
    createPostImage: async function (post_id, caption, image_url, public_id) {
        try {
            const newPostImage = {
                post_id,
                caption,
                image_url,
                public_id,
            };
            const result = await postImageModel.createPostImage(newPostImage);
            if (result) {
                logger.info(`Successfully Create Post image`);
                return result;
            } else {
                logger.warn(`Creation Post Image Failed`);
                return undefined;
            }
        } catch (err) {
            logger.error(`Error Occur when Trying to create Post Image`);
            throw err;
        }
    },
    deletePostImage: async function (id) {
        try {
            const result = await postImageModel.deletePostImage(id);
            if (result) {
                logger.info(`Post Image id: ${id} Delete Successfully`);
                return true;
            } else {
                logger.warn(`Post image id : ${id} Not found`);
                return undefined;
            }
        } catch (err) {
            logger.warn(`Error Occur When Trying to Delete Post image : ${err.message}`);
            throw err;
        }
    },
    updatepostImage: async function (id, post_id, caption, image_url, public_id) {
        try {
            const updatepostImage = {
                post_id,
                caption,
                image_url,
                public_id,
            };
            const result = await postImageModel.updatePostImageById(id, updatepostImage);
            if (result) {
                logger.info(`update Post image successfully Update`);
                return result;
            } else {
                logger.warn(`post image not found`);
                return undefined;
            }
        } catch (err) {
            logger.error(`Error Occur While trying to updatePostImage : ${err.message}`);
            throw errr;
        }
    },
};
export default postImageServices;
