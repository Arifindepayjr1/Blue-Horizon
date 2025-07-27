import logger from "../logger.js";
import pool from "../db.js";

const commentsModel = {
    createComments: async function (data) {
        try {
            const { post_id, user_id, comment } = data;

            const [result] = await pool.query(
                `INSERT INTO comments (post_id, user_id, comment) VALUES (?, ?, ?)`,
                [post_id, user_id, comment]
            );

            if (result.affectedRows === 0) {
                logger.warn(`Comment Creation Failed`);
                return undefined;
            } else {
                logger.info(`Comment Created Successfully`);
                return {
                    id: result.insertId,
                    post_id,
                    user_id,
                    comment,
                };
            }
        } catch (err) {
            logger.error("Error Occurred Within Comments Database: " + err.message);
            throw new Error("Database Error");
        }
    },
    getAllComments: async function () {
        try {
            const [rows] = await pool.query(`
            SELECT 
                comments.id AS comment_id,
                comments.comment,
                comments.created_at,
                comments.updated_at,
                
                users.id AS user_id,
                users.username,
                users.name,
                
                posts.id AS post_id,
                posts.title AS post_title

            FROM comments
            JOIN users ON comments.user_id = users.id
            JOIN posts ON comments.post_id = posts.id
            ORDER BY comments.created_at DESC
        `);

            if (rows.length === 0) {
                logger.warn("No comments found");
                return [];
            } else {
                logger.info(`Fetched ${rows.length} comments`);
                return rows;
            }
        } catch (error) {
            logger.error("Error fetching comments: " + error.message);
            throw new Error("Database error when fetching comments");
        }
    },
    getAllCommentsById: async function (id) {
        try {
            const [rows] = await pool.query(
                `
            SELECT 
                comments.id AS comment_id,
                comments.comment,
                comments.created_at,
                comments.updated_at,
                
                users.id AS user_id,
                users.username,
                users.name,
                
                posts.id AS post_id,
                posts.title AS post_title

            FROM comments
            JOIN users ON comments.user_id = users.id
            JOIN posts ON comments.post_id = posts.id
            WHERE comments.id = ?
        `,
                [id]
            );

            if (rows.length === 0) {
                return null;
            } else {
                return {
                    comment_id: rows[0].comment_id,
                    user_id: rows[0].user_id,
                    username: rows[0].username,
                    name: rows[0].name,
                    post_id: rows[0].post_id,
                    post_title: rows[0].post_title,
                    comment: rows[0].comment,
                    created_at: rows[0].created_at,
                    updated_at: rows[0].updated_at,
                };
            }
        } catch (error) {
            console.error("Error fetching comment by ID:", error.message);
            throw new Error("Database error while fetching comment");
        }
    },
    getAllCommentsByPostId: async function (post_id) {
        try {
            const [rows] = await pool.query(
                `
            SELECT 
                comments.id AS comment_id,
                comments.comment,
                comments.created_at,
                comments.updated_at,
                
                users.id AS user_id,
                users.username,
                users.name

            FROM comments
            JOIN users ON comments.user_id = users.id
            WHERE comments.post_id = ?
            ORDER BY comments.created_at ASC
        `,
                [post_id]
            );

            return rows;
        } catch (error) {
            console.error("Error fetching comments for post:", error.message);
            throw new Error("Database error while fetching post comments");
        }
    },
    updateComments: async function (id, data) {
        try {
            const { user_id, post_id, comment } = data;

            const [results] = await pool.query(
                "UPDATE comments SET user_id = ?, post_id = ?, comment = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
                [user_id, post_id, comment, id]
            );

            if (results.affectedRows === 0) {
                logger.warn(`Comment ID ${id} not found for update`);
                return undefined;
            } else {
                logger.info(`Comment ID ${id} updated successfully`);
                return {
                    id,
                    user_id,
                    post_id,
                    comment,
                };
            }
        } catch (error) {
            logger.error(`Error Occurred while Updating Comments Database: ${error.message}`);
            throw new Error("Error Comment Database");
        }
    },
    deleteComments: async function (id) {
        try {
            const [results] = await pool.query("DELETE FROM comments WHERE id = ?", [id]);

            if (results.affectedRows === 0) {
                logger.warn(`No comment found with ID ${id} to delete`);
                return false;
            } else {
                logger.info(`Comment with ID ${id} deleted successfully`);
                return true;
            }
        } catch (error) {
            logger.error(`Error Occurred while Deleting Comment: ${error.message}`);
            throw new Error("Error Deleting Comment from Database");
        }
    },
};

export default commentsModel;
