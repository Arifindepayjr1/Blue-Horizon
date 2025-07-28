import logger from "../logger.js";
import saveLaterService from "../Services/saveLater.service.js";

const status = {
    SUCCESS: "SUCCESS",
    FAILURE: "FAILURE",
    ERROR: "ERROR",
};

const saveLaterController = {
    createSavedLater: async function (req, res) {
        try {
            const { user_id, post_id } = req.body;
            if (!user_id || !post_id) {
                logger.warn(`All Field are required`);
                return res.status(400).json({
                    status: status.FAILURE,
                    message: "All fields are required",
                });
            } else {
                const data = await saveLaterService.createSavedLater(user_id, post_id);
                if (data) {
                    logger.info(`Saved Later Create Successfully`);
                    res.status(200).json({
                        status: status.SUCCESS,
                        message: `SavedLater Create Successsfully`,
                        data: data,
                    });
                } else {
                    logger.warn(`Saved Later Create Unsuccessfully`);
                    res.status(400).json({
                        status: status.FAILURE,
                        message: `SavedLater Create Unsuccessfully`,
                    });
                }
            }
        } catch (error) {
            logger.error(`Error Occured When Trying to create SaveLater: `, error.message);
            res.status(500).json({
                status: status.ERROR,
                message: `Error Occured When Trying to create SaveLater ${error.message}`,
                erorr: error.message,
            });
        }
    },
    getAllSavedLater: async function (req, res) {
        try {
            const data = await saveLaterService.getAllSavedLater();
            if (data) {
                res.status(200).json({
                    status: status.SUCCESS,
                    message: `Retrived All SavedLater Successfully`,
                    data: data,
                });
                logger.info(`Successfully Get All The SavedLater`);
            } else {
                res.status(400).json({
                    status: status.FAILURE,
                    message: `Failed to Retrived All SavedLater Successfully`,
                });
                logger.warn(`Failed to Retrived All the SavedLater`);
            }
        } catch (error) {
            logger.error(`Error While trying to get all the saved Later : ${error.message}`);
            res.status(500).json({
                status: status.ERROR,
                message: `Error While trying to get all the saved Later : ${error.message}`,
                error: error.message,
            });
        }
    },
    getSavedLaterCountPerUser: async function (req, res) {
        try {
            const data = await saveLaterService.getAllSavedLaterCountPerUser();
            if (data) {
                logger.info(`Successfully GetSavedLaterCount Per User`);
                res.status(200).json({
                    status: status.SUCCESS,
                    message: `Successfully GetSavedLaterCount Per User`,
                    data: data,
                });
            } else {
                logger.warn(`Unsuccessfully GetSavedLaterCount Per User`);
                res.status(400).json({
                    status: status.FAILURE,
                    message: `Unsuccessfully GetSavedLaterCount Per User`,
                });
            }
        } catch (error) {
            logger.error(`Error occur when trying to Get SavedLaverCount PerUser ${error.message}`);
            res.status(500).json({
                status: status.ERROR,
                message: `Error occur when trying to Get SavedLaterCountPerUser ${error.message}`,
                error: error.message,
            });
        }
    },
    getSavedLaterPerUser: async function (req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                logger.warn(`Invalid Save Later Per User Id `);
                return res.status(400).json({
                    status: status.FAILURE,
                    message: `Invalid Save Later Per User Id`,
                });
            } else {
                const data = await saveLaterService.getSavedLaterPerUser(Number(id));
                if (data) {
                    logger.info(`Successfully Get SavedLater Per User`);
                    res.status(200).json({
                        status: status.SUCCESS,
                        message: `Successfully Get SavedLater Per User`,
                        data: data,
                    });
                } else {
                    logger.warn(`User Not Found in SavedLater`);
                    res.status(200).json({
                        status: status.FAILURE,
                        message: `User Not Found In SavedLater`,
                    });
                }
            }
        } catch (error) {
            logger.error(
                `Error Occurred While trying to get SavedLater Per User : ${error.message}`
            );
            res.status(500).json({
                status: status.ERROR,
                message: `Error Occurred While Trying to get SavedLater Per User : ${error.message}`,
                error: error.message,
            });
        }
    },
    deleteSavedLater: async function (req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                logger.warn(`SavedLater id to Delete is invalid`);
                return res.status(400).json({
                    status: status.FAILURE,
                    message: `SavedLater Id to Delete is invalid`,
                });
            } else {
                const result = await saveLaterService.deleteSavedLater(Number(id));
                if (result) {
                    logger.info(`Saved Later id : ${id} Delete Successfully`);
                    res.status(200).json({
                        status: status.SUCCESS,
                        message: `Saved Later id : ${id} Delete Successfully`,
                    });
                } else {
                    logger.warn(`Saved later Id : ${id} Not found`);
                    res.status(400).json({
                        status: status.FAILURE,
                        message: `Saved Later Id: ${id} Not found`,
                    });
                }
            }
        } catch (error) {
            logger.error(`Error occur when trying to Deleting SavedLater Post ${error.message}`);
            res.status(500).json({
                status: status.ERROR,
                message: `Error occur when trying to Deleting SavedLater Post ${error.message}`,
                error: error.message,
            });
        }
    },
    deleteSavedLaterById: async function (req, res) {
        try {
            const { postId, userId } = req.body; // ✅ make sure these exist
            logger.info(`${postId} , ${userId}`);
            if (!postId || !userId) {
                return res.status(400).json({
                    status: "FAILURE",
                    message: `Invalid postId or userId`,
                });
            }

            const result = await saveLaterService.deleteSavedLaterById(postId, userId);
            if (result) {
                return res.status(200).json({
                    status: "SUCCESS",
                    message: `Delete Successfully`,
                });
            } else {
                return res.status(400).json({
                    status: "FAILURE",
                    message: `Delete Unsuccessfully`,
                });
            }
        } catch (error) {
            return res.status(500).json({
                status: "ERROR",
                message: `Error: ${error.message}`,
            });
        }
    },
};
export default saveLaterController;
