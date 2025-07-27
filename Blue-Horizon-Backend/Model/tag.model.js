import pool from "../db.js";
import logger from "../logger.js";
const tagModel = {
    getAllTag: async function () {
        try {
            const [rows] = await pool.query(`
            SELECT * FROM tags
        `);

            if (rows.length === 0) {
                logger.warn(`No tags were found`);
                return undefined;
            } else {
                return rows;
            }
        } catch (error) {
            logger.error(`Error when trying to get all tags from the database: ${error.message}`);
            throw new Error(
                `Error when trying to get all tags from the database: ${error.message}`
            );
        }
    },
    getAllTagById: async function (id) {
        try {
            const [rows] = await pool.query(`SELECT * FROM tags WHERE id = ?`, [id]);

            if (rows.length === 0) {
                logger.warn(`No tag found with ID: ${id}`);
                return undefined;
            } else {
                return rows[0];
            }
        } catch (error) {
            logger.error(`Error when trying to get tag by ID ${id}: ${error.message}`);
            throw new Error(`Error when trying to get tag by ID ${id}: ${error.message}`);
        }
    },
    createTag: async function (name) {
        try {
            const [result] = await pool.query(`INSERT INTO tags (name) VALUES (?)`, [name]);

            if (result.affectedRows === 0) {
                logger.warn(`Failed to create tag with name: ${name}`);
                return undefined;
            } else {
                return {
                    id: result.insertId,
                    name,
                };
            }
        } catch (err) {
            logger.error(`Error when creating tag "${name}": ${err.message}`);
            throw new Error(`Error when creating tag: ${err.message}`);
        }
    },
    updateTag: async function (id, name) {
        try {
            const [result] = await pool.query(`UPDATE tags SET name = ? WHERE id = ?`, [name, id]);

            if (result.affectedRows === 0) {
                logger.warn(`No tag found to update with id: ${id}`);
                return undefined;
            } else {
                return {
                    id,
                    name,
                };
            }
        } catch (err) {
            logger.error(`Error when updating tag with id ${id}: ${err.message}`);
            throw new Error(`Error when updating tag: ${err.message}`);
        }
    },
    deleteTag: async function (id) {
        try {
            const [result] = await pool.query(`DELETE FROM tags WHERE id = ?`, [id]);

            if (result.affectedRows === 0) {
                logger.warn(`No tag found to delete with id: ${id}`);
                return false;
            } else {
                return true;
            }
        } catch (err) {
            logger.error(`Error when deleting tag with id ${id}: ${err.message}`);
            throw new Error(`Error when deleting tag: ${err.message}`);
        }
    },
};
export default tagModel;
