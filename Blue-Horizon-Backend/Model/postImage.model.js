import pool from "../db.js";
import logger from "../logger.js";
import { cloudinary } from "../cloudinaryContentPicture.js";
const postImageModel = {
    getAllPostImage: async function () {
        try {
            const [rows] = await pool.query(`
      SELECT 
        post_images.id,
        post_images.post_id,
        post_images.image_url,
        post_images.public_id,
        post_images.caption,
        post_images.uploaded_at,
        posts.content
      FROM post_images
      JOIN posts ON post_images.post_id = posts.id
      ORDER BY post_images.uploaded_at DESC
    `);
            if (rows.length === 0) {
                logger.warn(`post image is not found`);
                return undefined;
            } else {
                return rows;
            }
        } catch (error) {
            console.error("Error getting all post images:", error);
            throw error;
        }
    },
    getAllPostImageBySpecificPost: async function (id) {
        try {
            const [rows] = await pool.query(
                `
      SELECT 
        id,
        post_id,
        image_url,
        public_id,
        caption,
        uploaded_at
      FROM post_images
      WHERE post_id = ?
      ORDER BY uploaded_at DESC
    `,
                [id]
            );

            if (rows.length === 0) {
                logger.warn(`Post Not found`);
                return undefined;
            } else {
                logger.info(`Successfully Get All Post Image By specific post`);
                return rows;
            }
        } catch (error) {
            console.error("Error getting images for post:", error);
            throw error;
        }
    },
    createPostImage: async function (newPostImage) {
        try {
            const { caption, post_id, image_url, public_id } = newPostImage;

            const [result] = await pool.query(
                `
      INSERT INTO post_images (post_id, image_url, public_id, caption)
      VALUES (?, ?, ?, ?)
    `,
                [post_id, image_url, public_id, caption]
            );

            if (result.affectedRows === 0) {
                logger.warn(`Failed to Create PostImage`);
                return undefined;
            } else {
                return {
                    id: result.insertId,
                    ...newPostImage,
                    uploaded_at: new Date(),
                };
            }
        } catch (error) {
            console.error("Error inserting post image:", error);
            throw error;
        }
    },
    deletePostImage: async function (postImageId) {
        try {
            const [rows] = await pool.query("SELECT public_id FROM post_images WHERE id = ?", [
                postImageId,
            ]);

            if (rows.length === 0) {
                throw new Error("Image not found.");
            }

            const publicId = rows[0].public_id;

            await cloudinary.uploader.destroy(publicId);

            await db.query("DELETE FROM post_images WHERE id = ?", [postImageId]);

            return { success: true, message: "Image deleted successfully." };
        } catch (err) {
            console.error("Error deleting image:", err);
            return { success: false, message: err.message };
        }
    },
    updatePostImageById: async function (id, newData) {
        try {
            const [rows] = await pool.query("SELECT public_id FROM post_images WHERE id = ?", [id]);
            if (rows.length === 0) throw new Error("Image not found");

            const oldPublicId = rows[0].public_id;

            await cloudinary.uploader.destroy(oldPublicId);

            const { caption, image_url, public_id } = newData;

            await pool.query(
                "UPDATE post_images SET caption = ?, image_url = ?, public_id = ? WHERE id = ?",
                [caption, image_url, public_id, id]
            );

            return { success: true, ...newData };
        } catch (err) {
            console.error("Update failed:", err);
            return { success: false, message: err.message };
        }
    },
};
export default postImageModel;
