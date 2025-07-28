import axios from "axios";
const API_URL = "http://localhost:3005/api";

const likeServices = {
    getAllLIkePostBySpecificUser: async function (id) {
        try {
            const res = await axios.get(`${API_URL}/like/users/${id}`);
            if (res.data.status === "SUCCESS") {
                console.log(`Successfully Getting All Like`);
                return res.data.data;
            } else {
                console.log(`Failed To Get All Like`);
                return false;
            }
        } catch (error) {
            console.log(`Error While Post Count ${error.message}`);
            throw error;
        }
    },
    unlikePost: async function (user_id, post_id) {
        try {
            const payLoad = {
                user_id,
                post_id,
            };
            const res = await axios.delete(`${API_URL}/like/delete`, { data: payLoad });
            if (res.data.status === "SUCCESS") {
                console.log(`Successfully Unlike Post`);
                return res.data.data;
            } else {
                console.log(`Unsuccessflly Unlike post`);
                return false;
            }
        } catch (error) {
            console.log(`error: ${error.message}`);
        }
    },
    createLikePost: async function(user_id , post_id){
        try{
            const payLoad = {
                user_id,
                post_id
            }
            const res = await axios.post(`${API_URL}/like/create` , payLoad);
             if (res.data.status === "SUCCESS") {
                console.log(`Successfully like Post`);
                return true;
            } else {
                console.log(`Unsuccessflly like post`);
                return false;
            }
        }catch (error) {
            console.log(`error: ${error.message}`);
        } 
    },
   
    
};
export default likeServices;
