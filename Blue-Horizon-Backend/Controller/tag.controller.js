import tagServices from "../Services/tag.service.js";
import logger from "../logger.js";

const status = {
    SUCCESS: "SUCCESS",
    FAILURE: "FAILURE",
    ERROR: "ERROR",
};

const tagController = {
    getAllTag: async function (req, res) {
        try {
            const data = await tagServices.getAllTag();
            if (data) {
                logger.info(`All Tag Successfully Retrieved`);
                res.status(200).json({
                    status: status.SUCCESS,
                    message: `All Tag Successfully Retrieved`,
                    data: data,
                });
            } else {
                logger.warn(`Tag Unsuccesfully Retrived`);
                res.status(400).json({
                    status: status.FAILURE,
                    message: `No Tag were Found`,
                });
            }
        } catch (error) {
            logger.error(`Error Occured While Trying to Get Tag`);
            res.status(500).json({
                status: status.ERROR,
                message: `Error Occured While Trying to Get Tag ${error.message}`,
                error: error.message,
            });
        }
    },
    getAllTagById: async function (req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                logger.warn(`Id in not valid`);
                return res.status(400).json({
                    status: status.FAILURE,
                    message: `Id is invalid`,
                });
            } else {
                const data = await tagServices.getAllTagById(Number(id));
                if (data) {
                    res.status(200).json({
                        status: status.SUCCESS,
                        message: `Tag Id ${id} successfully Retrieved`,
                        data: data,
                    });
                    logger.info(`Tag Id ${id} successfully Retrieved`);
                } else {
                    res.status(400).json({
                        status: status.FAILURE,
                        message: `Tag Id ${id} Not Found`,
                    });
                    logger.warn(`Tag Id ${id} Not Found`);
                }
            }
        } catch (error) {
            logger.error(`Error Occur while tyring to get tag by id ${error.message}`);
            res.status(500).json({
                status: status.ERROR,
                message: `Error Occur while trying to get tag by id ${error.message}`,
                error: error.message,
            });
        }
    },
    createTag: async function (req, res) {
        try {
            const { name } = req.body;
            if (!name) {
                logger.warn(`all fields are required`);
                return res.status(400).json({
                    status: status.FAILURE,
                    message: `all fields are required`,
                });
            } else {
                const data = await tagServices.createTag(name);
                if (data) {
                    logger.info(`Tag create Successfully`);
                    res.status(200).json({
                        status: status.SUCCESS,
                        message: `Tag Create Successfully`,
                        data: data,
                    });
                } else {
                    logger.warn(`Tag Creation Failed`);
                    res.status(400).json({
                        status: status.FAILURE,
                        message: `Tag Creation Failed`,
                    });
                }
            }
        } catch (err) {
            logger.error(`Error Occurred While trying to create Tag : ${err.message}`);
            res.status(500).json({
                status: status.ERROR,
                message: `Error Occurred While trying to create Tag : ${err.message}`,
                error: err.message,
            });
        }
    },
    updateTag: async function (req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                logger.warn(`Invalid Id`);
                return res.status(400).json({
                    status: status.FAILURE,
                    message: `Invalid Id`,
                });
            } else {
                const { name } = req.body;
                if (!name) {
                    logger.warn(`All fields are required`);
                    return res.status(400).json({
                        status: status.FAILURE,
                        message: `All Fields are required`,
                    });
                } else {
                    const data = await tagServices.updateTag(id, name);
                    if (data) {
                        logger.info(`Tag id : ${id} Successfully Update`);
                        res.status(200).json({
                            status: status.SUCCESS,
                            message: `Tag id: ${id} successfully update`,
                            data: data,
                        });
                    } else {
                        logger.warn(`Tag id : ${id} Not Found`);
                        res.status(400).json({
                            status: status.FAILURE,
                            message: `Tag id: ${id} Not found`,
                        });
                    }
                }
            }
        } catch (err) {
            logger.error(`Error Occur duing Update the Tag id ${err.message}`);
            res.status.json({
                status: status.ERROR,
                message: `Error Occur duing Update the Tag id ${err.message}`,
                error: err.message,
            });
        }
    },
    deleteTag: async function (req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                logger.warn(`Invalid Id to delete Tag`);
                res.status(400).json({
                    status: status.FAILURE,
                    message: `Invalid Id to delete Tag`,
                });
            } else {
                const result = tagServices.deleteTag(Number(id));
                if (result) {
                    logger.info(`Tag with Id : ${id} Delete Successfully`);
                    res.status(200).json({
                        status: status.SUCCESS,
                        message: `Tag with Id : ${id} Delete Successfully`,
                    });
                } else {
                    logger.warn(`Tag with Id : ${id} Not found`);
                    res.status(400).json({
                        status: status.FAILURE,
                        message: `Tag with Id : ${id} Not found`,
                    });
                }
            }
        } catch (err) {
            logger.error(`Error Occurred While trying Tag Id ${id} : ${err.message}`);
            res.status.json({
                status: status.ERROR,
                message: `Error Occurred While trying Tag Id ${id} : ${err.message}`,
                error: err.message,
            });
        }
    },
};
export default tagController;
