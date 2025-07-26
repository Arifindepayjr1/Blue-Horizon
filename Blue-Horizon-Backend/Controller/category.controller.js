import categoryService from "../Services/category.service.js";
import logger from "../logger.js";

const status = {
    SUCCESS: "SUCCESS",
    FAILURE: "FAILURE",
    ERROR: "ERROR",
};

const categoryController = {
    getAllCategories: async function (req, res) {
        try {
            const data = await categoryService.getAllCategories();
            console.log(data);
            if (data) {
                res.status(200).json({
                    status: status.SUCCESS,
                    message: "Categories retrieved successfully",
                    data: data,
                });
                logger.info("Categories retrieved successfully");
            } else {
                res.status(404).json({
                    status: status.FAILURE,
                    message: "No categories found",
                });
                logger.warn("No categories found");
            }
        } catch (err) {
            logger.error("Error Occurred While Retrieving Categories: ", err.message);
            res.status(500).json({
                status: status.ERROR,
                message: "Error Occurred While Retrieving Categories",
                error: err.message,
            });
        }
    },
    getAllCategoriesById: async function (req, res) {
        const id = req.params.id;
        try {
            if (!id) {
                logger.warn("Category ID is required");
                return res.status(400).json({
                    status: status.FAILURE,
                    message: "Category ID is required",
                });
            } else {
                logger.info(`Retrieving category with ID: ${id}`);
                const data = await categoryService.getAllCategoriesById(Number(id));
                if (data) {
                    res.status(200).json({
                        status: status.SUCCESS,
                        message: `Category with ID: ${data.id} retrieved successfully`,
                        data: data,
                    });
                    logger.info(`Category with ID: ${data.id} retrieved successfully`);
                } else {
                    res.status(404).json({
                        status: status.FAILURE,
                        message: "Category Not Found",
                    });
                    logger.warn("Category Not Found");
                }
            }
        } catch (err) {
            logger.error("Error Occurred While Retrieving Category: ", err.message);
            res.status(500).json({
                status: status.ERROR,
                message: "Error Occurred While Retrieving Category",
                error: err.message,
            });
        }
    },
    createCategories: async function (req, res) {
        try {
            const { name, description } = req.body;
            if (!name || !description) {
                logger.warn("name and description is required");
                return res.status(400).json({
                    status: status.FAILURE,
                    message: "name and description is required",
                });
            } else {
                const data = await categoryService.createCategories(name, description);
                if (data) {
                    res.status(201).json({
                        status: status.SUCCESS,
                        message: "Category Create Successfully",
                        data: data,
                    });
                    logger.info("Category Create Successfully");
                } else {
                    res.status(404).json({
                        status: status.FAILURE,
                        message: "Failed to Create Category",
                    });
                    logger.warn("Failed to Create Category");
                }
            }
        } catch (err) {
            logger.error("Error Occur when trying to Create Category : ", err.message);
            logger.error(err.stack);
            res.status(500).json({
                status: status.ERROR,
                message: "Error Occurred While Create Category",
                error: err.message,
            });
        }
    },
    updateCategory: async function (req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                logger.warn("id is required inorder to update category");
                return res.status(404).json({
                    status: status.FAILURE,
                    message: "Id is required in this case",
                });
            } else {
                const { name, description } = req.body;
                if (!name || !description) {
                    logger.warn("name and description is required");
                    return res.status(404).json({
                        status: status.FAILURE,
                        message: "name and description is reqired",
                    });
                } else {
                    const data = await categoryService.updateCategory(
                        Number(id),
                        name,
                        description
                    );
                    if (data) {
                        res.status(200).json({
                            status: status.SUCCESS,
                            message: "Update Category Successfully",
                            data: data,
                        });
                    } else {
                        res.status(404).json({
                            status: status.FAILURE,
                            message: "User Not Found",
                        });
                    }
                }
            }
        } catch (error) {
            logger.error(`Error Occurred While Update Categroy : ${error.message}`);
            res.status(500).json({
                status: status.ERROR,
                message: "Error Occurred While Update Category",
                error: error.message,
            });
        }
    },
    deleteCategory: async function (req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                logger.warn("Categroy Id Is required In This Case");
                return res.status(400).json({
                    status: status.FAILURE,
                    message: "Category Id is required",
                });
            } else {
                const result = await categoryService.deleteCategory(id);
                if (result) {
                    res.status(200).json({
                        status: status.SUCCESS,
                        message: `Category with ID : ${result.id} Delete Successfully`,
                    });
                    logger.info(`Category With Id ${result.id} Delete Successfully`);
                } else {
                    res.status(400).json({
                        status: status.FAILURE,
                        message: `Category Not Found`,
                    });
                    logger.warn("Category Not Found");
                }
            }
        } catch (error) {
            logger.error("Error Occurrred While Deleting Category");
            res.status(500).json({
                status: status.ERROR,
                message: "Error Occurred Wile Deleting Category",
                error: error.message,
            });
        }
    },
};
export default categoryController;
