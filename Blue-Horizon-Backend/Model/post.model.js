import logger from "../logger.js";
import pool from "../db.js";
import { cloudinary } from "../cloudinaryThumbnailPicture.js";

const postModel = {
    createPost: async function (data) {
        try {
            const { user_id, category_id, title, content, status, thumbnail_url, thumbnail_id } =
                data;
            const allowedStatuses = ["draft", "published", "archived"];
            if (!allowedStatuses.includes(status)) {
                throw new Error("Invalid Status");
            }
            const [result] = await pool.query(
                `INSERT INTO posts (user_id, category_id, title, content, status, thumbnail_url, thumbnail_id)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [user_id, category_id, title, content, status, thumbnail_url, thumbnail_id]
            );

            if (result.affectedRows === 0) {
                logger.warn("Post creation failed");
                return undefined;
            } else {
                logger.info("Post successfully created");
                logger.info(`
                    Post Details: 
                    id: ${result.insertId}
                    user_id: ${user_id},
                    category_id: ${category_id},
                    title: ${title},
                    content: ${content},
                    status: ${status},
                `);
                return {
                    id: result.insertId,
                    user_id,
                    category_id,
                    title,
                    content,
                    status,
                    thumbanailPicture: {
                        folder: "BlueHorizon-thumbnail-Pictures",
                        url: thumbnail_url,
                        id: thumbnail_id,
                    },
                };
            }
        } catch (err) {
            logger.error("Error while creating post in model: " + err.message);
            throw new Error(err);
        }
    },
    getAllPost: async function () {
        try {
            const [rows] = await pool.query(`
      SELECT 
        posts.id,
        posts.title,
        posts.content,
        posts.thumbnail_url,
        posts.status,
        posts.created_at,
        posts.updated_at,

        users.id AS user_id,
        users.name AS author_name,
        users.username,
        users.email,
        users.role,
        users.bio,
        users.profile_picture,
        users.profile_picture_id,
        users.created_at AS user_created_at,
        users.updated_at AS user_updated_at,

        categories.id AS category_id,
        categories.name AS category_name

      FROM posts
      JOIN users ON posts.user_id = users.id
      LEFT JOIN categories ON posts.category_id = categories.id
      ORDER BY posts.created_at DESC
    `);

            if (rows.length === 0) {
                return { message: "No posts found", posts: [] };
            }

            return rows;
        } catch (error) {
            console.error("Error in getAllPost:", error);
            throw error;
        }
    },

    getPostById: async function (id) {
        try {
            const [rows] = await pool.query("SELECT * FROM posts WHERE id = ?", [id]);

            if (rows.length === 0) {
                logger.warn(`Post with ID ${id} not found`);
                return undefined;
            } else {
                return rows[0];
            }
        } catch (error) {
            logger.error("Error occurred in the Post Database: " + error.message);
            throw new Error("Error occurred in the Post Database");
        }
    },
    updatePost: async function (id, data) {
        try {
            const { user_id, category_id, title, content, thumbnail_id, thumbnail_url, status } =
                data;

            const validStatus = ["draft", "published", "archived"];
            if (!validStatus.includes(status)) {
                logger.error("Invalid status");
                throw new Error("Invalid status");
            }

            const [result] = await pool.query(
                `UPDATE posts
                SET user_id = ?, category_id = ?, title = ?, content = ?, thumbnail_id = ?, thumbnail_url = ?, status = ?
            WHERE id = ?`,
                [user_id, category_id, title, content, thumbnail_id, thumbnail_url, status, id]
            );

            if (result.affectedRows === 0) {
                logger.warn(`Post with ID ${id} not found`);
                return undefined;
            } else {
                logger.info(`Post with ID ${id} updated successfully`);
                return {
                    id,
                    user_id,
                    category_id,
                    title,
                    content,
                    status,
                    thumbanailPicture: {
                        folder: "BlueHorizon-thumbnail-Pictures",
                        url: thumbnail_url,
                        id: thumbnail_id,
                    },
                };
            }
        } catch (error) {
            logger.error("Error within post database: " + error.message);
            throw new Error("Database Error");
        }
    },
    deletePost: async function (id) {
        try {
            const [rows] = await pool.query("SELECT * FROM posts WHERE id = ?", [id]);
            if (rows.length === 0) {
                logger.warn(`Post with id : ${id} are not found`);
                return undefined;
            } else {
                const public_id = rows[0].thumbnail_id;
                if (public_id) {
                    await cloudinary.uploader.destroy(public_id, { invalidate: true });
                }
                const [result] = await pool.query("DELETE FROM posts WHERE id = ?", [id]);
                if (result.affectedRows == 0) {
                    logger.warn(`Post with id ${id} Deletion Failed`);
                    return undefined;
                } else {
                    logger.info(`Post with ID ${id} Delete Successfully`);
                    return true;
                }
            }
        } catch (err) {
            logger.error("Error Occurred While Deleting Post Within Database");
            throw new Error("Error Occur Inside Database");
        }
    },
    countUserPost: async function (id) {
        try {
            const [rows] = await pool.query(
                `SELECT COUNT(*) AS postCount FROM posts WHERE user_id = ?`,
                [id]
            );
            if (rows.length === 0) {
                logger.warn(`User Post Not Found`);
                return undefined;
            } else {
                logger.info(`Successfully Get All The User Post Count`);
                return {
                    user_id: id,
                    postCount: rows[0].postCount,
                };
            }
        } catch (err) {
            logger.error(`Error Occur When Trying to Get User Count Post ${err.message}`);
            throw new Error(err.message);
        }
    },
    getAllPostByUserId: async function (id) {
        try {
            const [rows] = await pool.query(
                `SELECT posts.*, 
              categories.name AS category_name, 
              users.username AS username,
              users.profile_picture AS profile_picture
       FROM posts 
       LEFT JOIN categories ON posts.category_id = categories.id 
       INNER JOIN users ON posts.user_id = users.id
       WHERE posts.user_id = ? 
       ORDER BY posts.created_at DESC`,
                [id]
            );
            return rows;
        } catch (error) {
            console.error("Error in getAllPostByUserId:", error.message);
            throw error;
        }
    },
};

export default postModel;
