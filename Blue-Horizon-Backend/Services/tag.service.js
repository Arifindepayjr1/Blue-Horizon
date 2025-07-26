import logger from "../logger.js";
import tagModel from "../Model/tag.model.js";

const tagServices = {
    getAllTag: async function () {
        try {
            const result = await tagModel.getAllTag();
            if (result) {
                logger.info(`Successfully Retrieved All Tag`);
                return result;
            } else {
                logger.warn(`Unsuccessfully Retrived All Tag`);
                return undefined;
            }
        } catch (error) {
            logger.error(`Error Occured When trying to Retrived All tag: ${error.message}`);
            throw error;
        }
    },
    getAllTagById: async function (id) {
        try {
            const result = await tagModel.getAllTagById(id);
            if (result) {
                logger.info(`Successfully Get All Tag By ID`);
                return result;
            } else {
                logger.warn(`Tag Not found`);
                return undefined;
            }
        } catch (error) {
            logger.error(`Error Occured When trying to Get All Tag By Id: ${error.message}`);
            throw error;
        }
    },
    createTag: async function (name) {
        try {
            const result = await tagModel.createTag(name);
            if (result) {
                logger.info(`Create tag Successfully`);
                return result;
            } else {
                logger.warn(`Tag Creation fail`);
                return undefined;
            }
        } catch (error) {
            logger.error(`Error Occur when trying to create Tag`);
            throw error;
        }
    },
    updateTag: async function (id, name) {
        try {
            const result = await tagModel.updateTag(id, name);
            if (result) {
                logger.info(`Tag id : ${id} successfully update`);
                return result;
            } else {
                logger.warn(`Tag id : ${id} not found`);
                return undefined;
            }
        } catch (error) {
            logger.error(`Error Occur When trying to update tag ${error.message}`);
            throw error;
        }
    },
    deleteTag: async function (id) {
        try {
            const result = await tagModel.deleteTag(id);
            if (result) {
                logger.info(`Tag id : ${id} Successfully Delete`);
                return true;
            } else {
                logger.warn(`Tag id : ${id} Delete UnSuccessfully`);
                return undefined;
            }
        } catch (error) {
            logger.error(`Error Occur When trying to Delete tag ${error.message}`);
            throw error;
        }
    },
};

export default tagServices;
