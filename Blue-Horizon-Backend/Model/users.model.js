import { cloudinary } from "../cloudinary.js";
import pool from "../db.js"
import logger from "../logger.js"

const userModel = {
    createUser: async function(newUser){
        const {name , username , email, password , bio, profilePicture, profilePictureId} = newUser;
        try{
            const [result] = await pool.query(
                "INSERT INTO users (name , username, email, password, bio , profile_picture, profile_picture_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
                [name, username, email, password, bio, profilePicture, profilePictureId]
            )
            if(result.affectedRows === 0){
                logger.warn("User resgistration failed in the usermodel");
                return undefined;
            }else{
                logger.info("User resgistered Successfully in the usermodel");
                logger.info(`
                    User Details: 
                    id: ${result.insertId}
                    name: ${name},
                    username: ${username},
                    email: ${email},
                    bio: ${bio},
                    profilePicture: ${profilePicture},
                    profilePictureId: ${profilePictureId}
                `)
                return {
                    id: result.insertId,
                    name,
                    username,
                    email,
                    bio,
                    profilePicture: {
                        folder: "BlueHorizon-Profile-Pictures",
                        url: profilePicture,
                        id: profilePictureId
                    }
                }
            }       
        }catch(err){
            logger.error("Error Occurred While Registering User in usermodel: " , err.message);
        }
    },
    getAllUsers: async function(){
        try{
            const [rows] = await pool.query("SELECT * FROM users");
            if(rows.length === 0){
                logger.warn("No users found");
                return undefined;
            }else{
                logger.info("Users retrieved successfully from the usermodel");
                const result = rows.map(user => {
                    return {
                        id: user.id,
                        name: user.name,
                        username: user.username,
                        role: user.role,
                        email: user.email,
                        bio: user.bio,
                        profilePicture: {
                            folder: "BlueHorizon-Profile-Pictures",
                            url: user.profile_picture,
                            id:  user.profile_picture_id
                        },
                        createdAt: user.created_at,
                        updatedAt: user.updated_at,
                        deletedAt: user.deleted_at? user.deleted_at : "Not Deleted"
                    }
                })
                logger.info(`Total Users Retrieved: ${result.length}`);
                logger.info("Users Details: " + JSON.stringify(result, null , 2));
                return result;
            }
        }catch(err){
            logger.error("Error Occurred While Retrieving Users in usermodel: " , err.message);
            throw new Error("Database Error");
        }
    },
    getUserById: async function(id){
        try{
            const [rows] = await pool.query("SELECT * FROM users WHERE id = ?" , [id]);
            if(rows.length === 0){
                logger.warn(`No user found with ID: ${id}`);
                return undefined;
            }else{
                logger.info(`User with ID: ${id} retrieved successfully from the usermodel`);
                const user = rows[0];
                return{
                    id: user.id,
                    username: user.username,
                    name: user.name,
                    role: user.role,
                    email: user.email,
                    bio: user.bio,
                    profilePicture: {
                        folder: "BlueHorizon-Profile-Pictures",
                        url: user.profile_picture,
                        id: user.profile_picture_id
                    },
                    createdAt: user.created_at,
                    updatedAt: user.updated_at,
                    deletedAt: user.deleted_at ? user.deleted_at : "Not Deleted"
                }
            }
        }catch(err){
            logger.error("Error Occurred While Retrieving User by ID in usermodel: " , err.message);
            throw new Error("Database Error");
        }
    },
    updateUser: async function(id , updatedUser){
        try{
            const {name , username, bio, profilePicture, profilePictureId} = updatedUser;
            const [result] = await pool.query(
                "UPDATE users SET name = ?, username = ?, bio = ?, profile_picture = ?, profile_picture_id = ? WHERE id = ?",
                [name, username, bio, profilePicture, profilePictureId, id]
            )
            if(result.affectedRows === 0){
                logger.warn(`User with ID: ${id} Not found or update failed`);
                return undefined;
            }else{
                logger.info(`User with ID: ${id} updated Successfully in the usermodel`);
                return{
                    id,
                    name,
                    username,
                    bio,
                    profilePicture:{
                        folder: "BlueHorizon-Profile-Pictures",
                        url: profilePicture,
                        id: profilePictureId
                    }
                }
            }
        }catch(err){
            logger.error(`Error Occurred While Updating User with ID: ${id} in usermodel: ` , err.message);
            throw new Error("Database Error");
        }
    },
    deleteUser: async function(id){
        try{
            const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
            if(rows.length === 0){
                logger.warn(`User with ID: ${id} not found`);
                return undefined;
            }else{
                const public_id = rows[0].profile_picture_id;
                if(public_id){
                    await cloudinary.uploader.destroy(public_id, { invalidate: true});
                }
                const [result] = await pool.query("DELETE FROM users WHERE id = ?", [id]);
                if(result.affectedRows === 0){
                    logger.warn(`User with ID: ${id} Not found or deletion failed`);
                    return undefined;
                }else{
                    logger.info(`User with ID: ${id} deleted Successfully in the usermodel`);
                    return {
                        id
                    }
                }
            }
        }catch(err){
            logger.error(`Error Occurred While Deleting User with ID: ${id} in usermodel: ` , err.message);
            throw new Error("Database Error");
        }
    }

}

export default userModel;