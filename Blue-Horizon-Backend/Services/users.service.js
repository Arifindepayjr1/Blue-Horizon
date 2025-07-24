import userModel from "../Model/users.model.js";
import bcrypt from 'bcryptjs';
import logger from "../logger.js";

const userServices = {
    usersRegister: async function(name ,username, email, password, bio, profilePicture, profilePictureId){
        try{
            const newUser = {
                name,
                username,
                email,
                password: await bcrypt.hash(password, 10),
                bio,
                profilePicture,
                profilePictureId
            }
            const result = await userModel.createUser(newUser);
            if(result){
                logger.info("User registered Successfully In The UsersServices");
                return result;
            }else{
                logger.warn("User registration failed in the UsersServices Duplicate");
                return undefined;
            }
        }catch(err){
            logger.error("Error Occurred While Registering User in UsersServices: " , err.message);
        }
    },
    getAllUsers: async function(){
        const result = await userModel.getAllUsers();
        if(result){
            logger.info("Successfully retrieved all users in UsersServices");
            return result;
        }else{
            logger.warn("No users found in UsersServices");
            return undefined;
        }
    },
    getUserById: async function(id){
        const result = await userModel.getUserById(id);
        if(result){
            logger.info(`Successfully retrieved user with ID: ${id} in UsersServices`);
            return result;
        }else{
            logger.warn(`No user found with ID: ${id} in UsersServices`);
            return undefined;
        }
    },
    updateUser: async function(id, name, username, bio, profilePicture, profilePictureId){
        try{
            const updatedUser = {
                name,
                username,
                bio,
                profilePicture,
                profilePictureId
            }
            const result = await userModel.updateUser(id , updatedUser);
            if(result){
                logger.info(`User with ID: ${id} updated successfully in UsersServices`);
                return result;
            }else{
                logger.warn(`User with ID: ${id} update failed in UsersServices`);
                return undefined;
            }
        }catch(err){
            logger.error(`Error Occurred While Updating User with ID: ${id} in UsersServices: ` , err.message);
            throw err;
        }
    },
    deleteUser: async function(id){
        try{
            const result = await userModel.deleteUser(id);
            if(result){
                logger.info(`User with ID: ${id} deleted successfully in UsersServices`);
                return result;
            }else{
                logger.warn(`User with ID: ${id} deletion failed in UsersServices`);
                return undefined;
            }
        }catch(err){
            logger.error(`Error Occurred While Deleting User with ID: ${id} in UsersServices: ` , err.message);
            throw err;
        }
    }
}
export default userServices;