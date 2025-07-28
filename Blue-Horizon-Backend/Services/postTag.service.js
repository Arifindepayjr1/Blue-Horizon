import postTagModel from "../Model/postTag.model.js";
import logger from "../logger.js";
const postTagServices = {
    getAllPostAndTag: async function () {
        try {
            const result = await postTagModel.getAllPostAndTag();
            if (result) {
                logger.info(`Successfully getting all the post and tags`);
                return result;
            } else {
                logger.warn(`Post and tags are not found`);
                return undefined;
            }
        } catch (err) {
            logger.error(`Error Occured When Trying to Get All Post And Tag`);
            throw new err();
        }
    },
    getAllPostAndTagById: async function (id) {
        try {
            const result = await postTagModel.getAllPostAndTagById(id);
            if (result) {
                logger.info(`Successfully Get Post and Id`);
                return result;
            } else {
                logger.warn(`Id : ${id} Not found`);
                return undefined;
            }
        } catch (err) {
            logger.error(`Error Occurred When trying Post and Tag Id`);
            throw err;
        }
    },
    createPostAndTag: async function (post_id, tag_id) {
        try {
            const result = await postTagModel.createPostAndTag(post_id, tag_id);
            if (result) {
                logger.info(`Successfully Create Post Link WIth Tag`);
                return result;
            } else {
                logger.warn(`UnSuccessfully cretae Post Link With Tag`);
                return undefined;
            }
        } catch (error) {
            logger.error(`Error Occur When Trying to Create Post link with Tag ${error.message}`);
            throw error;
        }
    },
    deletePostAndTag: async function (post_id, tag_id) {
        try {
            const result = await postTagModel.deletePostAndTag(post_id, tag_id);
            if (result) {
                logger.info(`Successfully Delete PostTag`);
                return result;
            } else {
                logger.warn(`UnSuccessfully Delete PostTag`);
                return undefined;
            }
        } catch (error) {
            logger.error(`Error Occur When trying To Delete PostTag`);
            throw error;
        }
    },
    updatePostAndTag: async function (id, tag_id) {
        try {
            const result = await postTagModel.updatePostAndTag(id, tag_id);
            if (result) {
                logger.info(`Successfully Update`);
                return result;
            } else {
                logger.warn(`Unsuccessfully Update`);
                return undefined;
            }
        } catch (error) {
            logger.error(`Error Occurreed When trying to update Post And Tag ${error.message}`);
            throw error;
        }
    },
};
export default postTagServices;
