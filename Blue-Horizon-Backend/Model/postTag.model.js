import logger from "../logger.js";
import pool from "../db.js";
const postTagModel = {
    getAllPostAndTag: async function () {
        try {
            const [rows] = await pool.query(`
            SELECT 
                p.id AS post_id,
                p.title,
                p.content,
                t.id AS tag_id,
                t.name AS tag_name
            FROM posts p
            LEFT JOIN post_tags pt ON p.id = pt.post_id
            LEFT JOIN tags t ON pt.tag_id = t.id
        `);

            if (rows.length === 0) {
                logger.warn("No posts or tags found.");
                return [];
            } else {
                logger.info(`Successfully Fetching all posts and tag`);
                return rows;
            }
        } catch (error) {
            logger.error(`Error fetching posts and tags: ${error.message}`);
            throw new Error("Failed to fetch posts with tags.");
        }
    },
    getAllPostAndTagById: async function (id) {
        try {
            const [rows] = await pool.query(
                `
            SELECT 
                p.id AS post_id,
                p.title,
                p.content,
                t.id AS tag_id,
                t.name AS tag_name
            FROM posts p
            LEFT JOIN post_tags pt ON p.id = pt.post_id
            LEFT JOIN tags t ON pt.tag_id = t.id
            WHERE p.id = ?
        `,
                [id]
            );

            if (rows.length === 0) {
                logger.warn(`Post with ID ${id} not found.`);
                return null;
            }

            return rows;
        } catch (error) {
            logger.error(`Error fetching post and tags by ID: ${error.message}`);
            throw new Error("Failed to fetch post with tags.");
        }
    },
    createPostAndTag: async function (post_id, tag_id) {
        try {
            const [result] = await pool.query(
                `
            INSERT INTO post_tags (post_id, tag_id)
            VALUES (?, ?)
        `,
                [post_id, tag_id]
            );

            logger.info(`Tag ${tag_id} added to post ${post_id}`);
            if (result.affectedRows === 0) {
                logger.warn(`Unsuccessfully create Tag add to post`);
                return undefined;
            } else {
                logger.info(`successfully create tag add to post`);
                return {
                    post_id,
                    tag_id,
                };
            }
        } catch (error) {
            logger.error(`Error linking post ${post_id} with tag ${tag_id}: ${error.message}`);
            throw new Error("Failed to link post with tag.");
        }
    },
    deletePostAndTag: async function (post_id, tag_id) {
        try {
            const query = `
      DELETE FROM post_tags
      WHERE post_id = ? AND tag_id = ?
    `;

            const [result] = await pool.query(query, [post_id, tag_id]);

            if (result.affectedRows === 0) {
                throw new Error(
                    `No association found to delete for post_id ${post_id} and tag_id ${tag_id}`
                );
            }

            return {
                message: `Successfully unlinked post ${post_id} from tag ${tag_id}`,
            };
        } catch (error) {
            console.error(`Error unlinking post ${post_id} from tag ${tag_id}:`, error.message);
            throw new Error("Failed to unlink post from tag.");
        }
    },
    updatePostAndTag: async function (post_id, tag_id) {
        try {
            await pool.query(`DELETE FROM post_tags WHERE post_id = ?`, [post_id]);

            const [result] = await pool.query(
                `INSERT INTO post_tags (post_id, tag_id) VALUES (?, ?)`,
                [post_id, tag_id]
            );

            if (result.affectedRows === 0) {
                throw new Error("Tag update failed.");
            }

            return {
                message: `Post ${post_id} updated to have tag ${tag_id}`,
            };
        } catch (error) {
            console.error(`Error updating tags for post ${post_id}:`, error.message);
            throw new Error("Failed to update post's tag.");
        }
    },
};
export default postTagModel;
