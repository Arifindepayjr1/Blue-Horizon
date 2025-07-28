import pool from "../db.js";
import logger from "../logger.js";

const saveLaterModel = {
    createSavedLater: async function (data) {
        try {
            const { user_id, post_id } = data;

            const [result] = await pool.query(
                `INSERT INTO save_later (user_id, post_id) VALUES (?, ?)`,
                [user_id, post_id]
            );

            if (result.affectedRows === 0) {
                logger.error(`SaveLater: Failed to create record in database.`);
                return undefined;
            } else {
                logger.info(`SaveLater: Created successfully (ID: ${result.insertId}).`);
                return {
                    id: result.insertId,
                    user_id,
                    post_id,
                };
            }
        } catch (error) {
            logger.error(`SaveLater: Error inside database - ${error}`);
            throw new Error(`Database Error: ${error}`);
        }
    },
    getAllSavedLater: async function () {
        try {
            const [rows] = await pool.query(
                `
        SELECT 
          sl.id AS save_id,
          u.id AS user_id,
          u.username,
          p.id AS post_id,
          p.title,
          p.content,
          sl.saved_at
        FROM 
          save_later sl
        JOIN 
          users u ON sl.user_id = u.id
        JOIN 
          posts p ON sl.post_id = p.id
        ORDER BY 
          sl.saved_at DESC
        `
            );

            if (rows.length === 0) {
                logger.warn(`No SaveLater records were found.`);
                return undefined;
            } else {
                logger.info(`Successfully retrieved all SaveLater records.`);
                return rows;
            }
        } catch (error) {
            logger.error(`Database error in getAllSaveLater: ${error.message}`);
            throw new Error(`Database error in getAllSaveLater: ${error.message}`);
        }
    },
    getAllSavedLaterCountPerUser: async function () {
        try {
            const [rows] = await pool.query(`
      SELECT 
        u.id AS user_id,
        u.username,
        COUNT(sl.post_id) AS total_saved_posts
      FROM 
        save_later sl
      JOIN 
        users u ON sl.user_id = u.id
      GROUP BY 
        sl.user_id
      ORDER BY 
        total_saved_posts DESC
    `);

            if (rows.length === 0) {
                logger.warn(`No saved posts found for any user.`);
                return undefined;
            } else {
                logger.info(`Successfully retrieved saved post counts per user.`);
                return rows;
            }
        } catch (error) {
            logger.error(`Error inside getSavedCountPerUser: ${error.message}`);
            throw new Error(`Error inside getSavedCountPerUser: ${error.message}`);
        }
    },
    getSavedLaterPerUser: async function (id) {
        try {
            const [rows] = await pool.query(
                `
      SELECT 
        sl.id AS save_id,
        sl.saved_at,

        p.id AS post_id,
        p.title AS post_title,
        p.content AS post_content,
        p.thumbnail_url AS post_thumbnail_url,
        p.thumbnail_id AS post_thumbnail_id,
        p.status AS post_status,
        p.created_at AS post_created_at,
        p.updated_at AS post_updated_at,

        u.id AS author_id,
        u.username AS author_username,
        u.name AS author_name,
        u.profile_picture AS author_profile_picture,
        u.bio AS author_bio

      FROM save_later sl
      JOIN posts p ON sl.post_id = p.id
      JOIN users u ON p.user_id = u.id
      WHERE sl.user_id = ?
      ORDER BY sl.saved_at DESC
      `,
                [id]
            );

            if (rows.length === 0) {
                logger.warn(`User ${id} has no saved posts.`);
                return undefined;
            } else {
                logger.info(`Retrieved saved posts for user ${id}`);
                return rows;
            }
        } catch (error) {
            logger.error(`Error inside getSavedLaterPerUser: ${error.message}`);
            throw new Error(`Error inside getSavedLaterPerUser: ${error.message}`);
        }
    },
    deleteSavedLater: async function (id) {
        try {
            const [result] = await pool.query(
                `
      DELETE FROM save_later
      WHERE id = ?
    `,
                [id]
            );

            logger.info(`Deleted saved post with id=${id}`);
            return result;
        } catch (error) {
            logger.error(`Error in deleteSaveLaterById: ${error.message}`);
            throw error;
        }
    },
    deleteSavedLaterByPostId: async function (postId, userId) {
        try {
            const [result] = await pool.query(
                `DELETE FROM save_later WHERE post_id = ? AND user_id = ?`,
                [postId, userId]
            );

            logger.info(`Deleted saved post with post_id=${postId} and user_id=${userId}`);
            return result;
        } catch (error) {
            logger.error(`Error in deleteSavedLaterByPostId: ${error.message}`);
            throw error;
        }
    },
};
export default saveLaterModel;
