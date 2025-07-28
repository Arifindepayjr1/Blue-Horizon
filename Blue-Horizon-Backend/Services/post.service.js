import logger from "../logger.js";
import postModel from "../Model/post.model.js";

const postService = {
    createPost: async function (
        userId,
        categoryId,
        title,
        content,
        status,
        thumbnail_url,
        thumbnail_id
    ) {
        try {
            const newPost = {
                user_id: userId,
                category_id: categoryId,
                title,
                content,
                status,
                thumbnail_url,
                thumbnail_id,
            };
            const result = await postModel.createPost(newPost);
            if (result) {
                logger.info("Post Create Successfully in Services");
                return result;
            } else {
                logger.warn("Failed to Create Post In Services");
            }
        } catch (error) {
            logger.warn("Error Occur When Trying to Create Post in Services");
            throw error;
        }
    },
    getAllPost: async function () {
        try {
            const result = await postModel.getAllPost();
            if (result) {
                logger.info("Get All Post Successfully in Services");
                return result;
            } else {
                logger.warn("Failed to Get All Post");
                return undefined;
            }
        } catch (error) {
            logger.error("Error while trying to get All post : ", error.message);
            throw error;
        }
    },
    getAllPostById: async function (id) {
        try {
            const result = await postModel.getPostById(id);
            if (result) {
                logger.info("Post Retrieved by Id successfully in Post Services");
                return result;
            } else {
                logger.warn("Post Retrived by Id is not successfully");
                return undefined;
            }
        } catch (error) {
            logger.error("Error Occurred While Retrived a post by id");
            throw error;
        }
    },
    updatePost: async function (
        id,
        user_id,
        category_id,
        title,
        content,
        status,
        thumbnail_url,
        thumbnail_id
    ) {
        try {
            const updatePost = {
                user_id,
                category_id,
                title,
                content,
                status,
                thumbnail_url,
                thumbnail_id,
            };
            const result = await postModel.updatePost(id, updatePost);
            if (result) {
                logger.info(`User with Id ${id} updating Successfully in Service`);
                return result;
            } else {
                logger.warn(`User with Id ${id} updating unSuccessfully in Service`);
                return undefined;
            }
        } catch (error) {
            logger.warn(
                "Error Occurred While Trying to Update Post in user services: ",
                error.message
            );
            throw error;
        }
    },
    deletePost: async function (id) {
        try {
            const result = postModel.deletePost(id);
            if (result) {
                logger.info(`Post with Id ${id} Successfully Delete`);
                return result;
            } else {
                logger.warn(`Post with Id ${id} delete UnSuccessfully`);
                return undefined;
            }
        } catch (error) {
            logger.error("Error Occur while deleting Post");
            throw error;
        }
    },
    countUserPost: async function (id) {
        try {
            const result = await postModel.countUserPost(id);
            if (result) {
                logger.info(`Successfully Get All Count User Post `);
                return result;
            } else {
                logger.warn(`UnSuccessfully Get All Count User Post`);
                return undefined;
            }
        } catch (err) {
            logger.error(`Error Occur When Trying to Get Count User Post : ${err.message}`);
            throw err;
        }
    },
    getAllPostByUserId: async function (id) {
        try {
            const result = postModel.getAllPostByUserId(id);
            if (result) {
                return result;
            } else {
                return undefined;
            }
        } catch (err) {
            throw err;
        }
    },
};
export default postService;
