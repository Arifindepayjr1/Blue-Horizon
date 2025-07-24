import logger from "../logger.js";
import pool from "../db.js";
const categoryModel = {
    getAllCategories: async function(){
        try{
            const [rows] = await pool.query("SELECT * FROM categories");
            if(rows.length === 0){
                logger.warn("No categories found in the database");
                return undefined;
            }
            else{
                logger.info("Successfully retrieved all categories from the database");
                return rows;
            }
        }catch(err){
            logger.error("Error Occurred While Retrieving Categories in CategoryModel: ", err.message);
            throw new Error("Database Error");
        }
    },
    getAllCategoriesById: async function(id){
        try{
            const [rows] = await pool.query("SELECT * FROM categories WHERE Id = ?" , [id]);
            if(rows.length === 0){
                logger.warn(`No user found with ID : ${id}`);
                return undefined;
            }else{
                logger.info(`User with ID: ${id} retrieved successfully`);
                const categories = rows[0];
                return{
                    id: categories.id,
                    name: categories.name,
                    description: categories.description
                }
            }
        }catch(err){
            logger.error("Error Occurred While Retrieving categories");
            throw new Error("Database Error");
        }
    },
    createCategories: async function(data){
        try{
            const {name, description} = data;
            const [result] = await pool.query(
                    "INSERT INTO categories (name, description) VALUES (?, ?)",
                    [name, description]
            );
            if(result.affectedRows === 0){
                logger.warn("Failed to create Category");
                return undefined;
            }else{
                logger.info("Successfully create Category");
                return{
                    id: result.insertId,
                    name,
                    description
                }
            }
        }catch(err){
            logger.error("Error Occurred While Create Category In Model");
            logger.error(`Database Error : ${err.message}`);
            throw new Error("Error Occured in Database")
        }
    },
    updateCategory: async function(id , data){
        try{
            const {name,  description} = data;
            const [result] = await pool.query(
                   "UPDATE categories SET name = ?, description = ? WHERE id = ?",
                    [name, description, id]
            );
            if(result.affectedRows === 0){
                logger.warn(`No Category found with ID ${id} to update`);
                return undefined;
            }else{
                logger.info(`Category with Id ${id} successfully Update`);
                return{
                    id,
                    name,
                    description
                }
            }
        }catch(error){
            logger.error("Error Occurred While updating Category in CategoryModel");
            throw new Error("Database Error");
        }
    },
    deleteCategory: async function(id){
        try{
            const [rows] = await pool.query("SELECT * FROM categories WHERE Id = ?" , [id]);
            if(rows.length === 0){
                logger.warn(`User With id : ${id} Not found`);
                return undefined;
            }else{
                await pool.query("DELETE FROM categories WHERE id = ?", [id]);
                logger.info(`User With id ${id} delete successfully`);
                return {
                    id
                };
            }
        }catch(err){
            logger.error("Database Error");
            throw new Error("Database Error");
        }
    }
}
export default categoryModel;