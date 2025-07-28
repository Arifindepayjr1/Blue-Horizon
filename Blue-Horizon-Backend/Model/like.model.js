import logger from "../logger.js";
import pool from "../db.js";
const likeModel = {
    getAllLikePost: async function () {
        try {
            const [rows] = await pool.query(`
        SELECT 
          likes.user_id, 
          users.username, 
          likes.post_id, 
          posts.title, 
          likes.liked_at
        FROM likes
        JOIN users ON likes.user_id = users.id
        JOIN posts ON likes.post_id = posts.id
        ORDER BY likes.liked_at DESC
      `);
            if (rows.length === 0) {
                logger.warn(`Post Like not found`);
                return undefined;
            } else {
                logger.info(`Successfully Get All The Like Post`);
                return rows;
            }
        } catch (error) {
            console.error("Error fetching all liked posts:", error);
            throw error;
        }
    },
    getAllLikePostByIdPost: async function (id) {
        try {
            const [rows] = await pool.query(
                `
      SELECT 
        likes.user_id,
        users.username,
        likes.liked_at
      FROM likes
      JOIN users ON likes.user_id = users.id
      WHERE likes.post_id = ?
      ORDER BY likes.liked_at DESC
    `,
                [id]
            );

            if (rows.length === 0) {
                logger.warn(`Post ID ${id} has no likes or does not exist.`);
                return undefined;
            } else {
                logger.info(`Successfully fetched likes for post ID ${id}.`);
                return rows;
            }
        } catch (error) {
            console.error("Error fetching likes for post ID:", id, error);
            throw error;
        }
    },
    createLike: async function (data) {
        try {
            const { user_id, post_id } = data;

            const [existing] = await pool.query(
                `SELECT * FROM likes WHERE user_id = ? AND post_id = ?`,
                [user_id, post_id]
            );

            if (existing.length > 0) {
                logger.warn(`User ${user_id} already liked post ${post_id}`);
                return { message: "Already liked" };
            }

            const [result] = await pool.query(
                `INSERT INTO likes (user_id, post_id) VALUES (?, ?)`,
                [user_id, post_id]
            );

            if (result.affectedRows === 1) {
                logger.info(`User ${user_id} liked post ${post_id}`);
                return { success: true };
            } else {
                logger.warn(`Failed to like post ${post_id} by user ${user_id}`);
                return { success: false };
            }
        } catch (error) {
            console.error("Error creating like:", error);
            throw error;
        }
    },
    getAllLikePostByIdUser: async function (id) {
        try {
            const [rows] = await pool.query(
                `
      SELECT 
        posts.*,
        users.id AS user_id,
        users.username,
        users.name,
        users.email,
        users.role,
        users.bio,
        users.profile_picture,
        users.profile_picture_id,
        users.created_at AS user_created_at,
        users.updated_at AS user_updated_at,
        likes.liked_at
      FROM likes
      INNER JOIN posts ON likes.post_id = posts.id
      INNER JOIN users ON posts.user_id = users.id
      WHERE likes.user_id = ?
      ORDER BY likes.liked_at DESC
      `,
                [id]
            );

            if (rows.length === 0) {
                logger.warn(`No liked posts found for user ${id}`);
                return [];
            }

            logger.info(
                `Successfully retrieved liked posts with full user and post data for user ${id}`
            );
            return rows;
        } catch (error) {
            console.error("Error fetching liked posts with full info for user:", id, error);
            throw error;
        }
    },

    unlikePost: async function (user_id, post_id) {
        try {
            const [result] = await pool.query(
                `
      DELETE FROM likes
      WHERE user_id = ? AND post_id = ?
    `,
                [user_id, post_id]
            );

            if (result.affectedRows === 0) {
                logger.warn(`Like not found for user ${user_id} on post ${post_id}`);
                return false;
            }

            logger.info(`User ${user_id} unliked post ${post_id}`);
            return true;
        } catch (error) {
            console.error("Error unliking post:", error);
            throw error;
        }
    },
};
export default likeModel;
