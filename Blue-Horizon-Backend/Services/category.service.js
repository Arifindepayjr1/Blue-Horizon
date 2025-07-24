import logger from "../logger.js";
import categoryModel from "../Model/category.model.js";
const categoryService = {
    getAllCategories: async function(){
        try{
            const result = await categoryModel.getAllCategories();
            if(result){
                logger.info("Successfully retrieved all categories in CategoryService");
                return result;
            }else{
                logger.warn("Unable to retrieve categories in CategoryService");
                return undefined;
            }
        }catch(err){
            logger.error("Error Occurred While Retrieving Categories in CategoryService: ", err.message);
        }
    },
     getAllCategoriesById: async function(id){
        try{
            if(!id){
                logger.warn("Category ID is required to retrieve category");
                return undefined;
            }else{
                const result = await categoryModel.getAllCategoriesById(id);
                    if(result){
                        logger.info(`Successfully retrieved category with ID: ${id}`);
                        return result;
                    }else{
                        logger.warn(`No category found with ID: ${id}`);
                        return undefined;
                    }
                }
            }catch(err){
                logger.error("Error Occurred While Retrieving Category by ID in: ", err.message);
                throw err;
            }
    },
    createCategories: async function(name, description){
        try{
            const newCategory = {
                name,
                description,
            }
            const result = await categoryModel.createCategories(newCategory);
            if(result){
                logger.info(`Category Create Successfully`);
                return result;
            }else{
                logger.warn(`Failed to Create Category`);
                return undefined;
            }
        }catch(err){
            logger.error("Error Occurred While Creating Category");
            throw err;
        }
    },
    updateCategory: async function(id , name, description){
        try{
            const updateCategory = {
                name,
                description
            }
            const result = categoryModel.updateCategory(id , updateCategory);
            if(result){
                logger.info("Update Category Successfully Update in Services");
                return result;
            }else{
                logger.warn("Update Category Unsuccessfully");
                return undefined;
            }
        }catch(error){
            logger.error("Error Occurred While trying to Update Category");
            throw error;
        }
    },
    deleteCategory: async function(id){
        try{
            const result = categoryModel.deleteCategory(id);
            if(result){
                logger.info("Deleting Successfully In category Services");
                return result;
            }else{
                logger.warn("Deleting Category Unsuccessfully");
                return undefined;
            }
        }catch(error){
            logger.error("Error Occured in category services while deleting Category");
            throw error;
        }
    }
}
export default categoryService;