import axios from "axios";
const API_URL = "http://localhost:3005/api";

const saveLaterServices = {
    getSaveLaterBySpecificUser: async function (id) {
        try {
            const res = await axios.get(`${API_URL}/savedLater/users/${id}`);
            if (res.data.status === "SUCCESS") {
                console.log(`Successfully Get SavedLater`);
                return res.data.data;
            } else {
                console.log(`User Not Found`);
                return false;
            }
        } catch (err) {
            console.error("Register error:", err);
            return false;
        }
    },
    deleteSaveLater: async function (id) {
        try {
            const res = await axios.delete(`${API_URL}/savedLater/${id}`);
            if (res.data.status === "SUCCESS") {
                console.log(`Successfully Delete SavedLater`);
                return true;
            } else {
                console.log(`Delete Unsuccessfully`);
            }
        } catch (error) {
            console.log(`Errorr : ${error.message}`);
            throw new Error(error);
        }
    },
    deleteSaveLaterByPost: async function(userId , postId){
        try{
            const payLoad = {
                userId,
                postId,
            }
            const res = await axios.delete(`${API_URL}/savedLater/delete`, {data: payLoad});
            if(res.data.status === "SUCCESS"){
                return true;
            }else{
                console.log(`Delete Unsuccessfully`);
            }
        }catch(error) {
            console.log(`Errorr : ${error.message}`);
            throw new Error(error);
        }
    },
    createSaveLaterPost: async function(user_id , post_id){
        try{
            const payLoad = {
                user_id,
                post_id
            }
            const res = await axios.post(`${API_URL}/savedLater/create`, payLoad);
            if(res.data.status === "SUCCESS"){
                return true;
            }else{
                console.log(`failure in creation`);
            }
        }catch(error) {
            console.log(`Errorr : ${error.message}`);
            throw new Error(error);
        }
        
    }
};

export default saveLaterServices;
