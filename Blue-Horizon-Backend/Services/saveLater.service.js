import logger from "../logger.js";
import saveLaterModel from "../Model/saveLater.model.js";
const saveLaterService = {
    createSavedLater: async function (user_id, post_id) {
        try {
            const newSaveLater = {
                user_id,
                post_id,
            };
            const data = await saveLaterModel.createSavedLater(newSaveLater);
            if (data) {
                logger.info(`SavedLater Create Successfully`);
                return data;
            } else {
                logger.warn(`SaveLater Creation Failed`);
                return undefined;
            }
        } catch (error) {
            logger.error(`Error Occur While SaveLater Is Create`);
            throw error;
        }
    },
    getAllSavedLater: async function () {
        try {
            const result = await saveLaterModel.getAllSavedLater();
            if (result) {
                logger.info(`Successfully Retrive All the SavedLater`);
                return result;
            } else {
                logger.warn(`UnSuccessfully Retrive All the SavedLater`);
                return undefined;
            }
        } catch (error) {
            logger.error(`Error Occured when trying to get all SavedLater`);
            throw error;
        }
    },
    getAllSavedLaterCountPerUser: async function () {
        try {
            const result = await saveLaterModel.getAllSavedLaterCountPerUser();
            if (result) {
                logger.info(`SavedLater Count Per User Successfully Retrived`);
                return result;
            } else {
                logger.warn(`SavedLater Count Per User Unsuccessfully Retrieved`);
                return undefined;
            }
        } catch (error) {
            logger.error(`Error Occurred Inside Database`);
            throw error;
        }
    },
    getSavedLaterPerUser: async function (id) {
        try {
            const result = await saveLaterModel.getSavedLaterPerUser(id);
            if (result) {
                logger.info(`Successfully Get SavedLater Per User`);
                return result;
            } else {
                logger.info(`unSuccessfully Get SavedLater Per User`);
                return undefined;
            }
        } catch (error) {
            logger.error(`Error Occureed Inside Database`);
            throw error;
        }
    },
    deleteSavedLater: async function (id) {
        try {
            const result = await saveLaterModel.deleteSavedLater(id);
            if (result) {
                logger.info(`Successfully Saved later Id : ${id} is delete`);
                return true;
            } else {
                logger.warn(`Saved Later Id : ${id} Not Found`);
                return undefined;
            }
        } catch (error) {
            logger.error(`Error Occur Inside the database ${error}`);
            throw error;
        }
    },
    deleteSavedLaterById: async function (postId, userId) {
        try {
            const result = await saveLaterModel.deleteSavedLaterByPostId(postId, userId); // ✅ await
            return result || false;
        } catch (err) {
            throw err;
        }
    },
};
export default saveLaterService;
