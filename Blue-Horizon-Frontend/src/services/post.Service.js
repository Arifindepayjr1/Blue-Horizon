import axios from "axios";
const API_URL = "http://localhost:3005/api";

const postServices = {
    getPostCountbySpecificUserId: async function (id) {
        try {
            const res = await axios.get(`${API_URL}/post/count/users/${id}`);
            if (res.data.status === "SUCCESS" && res.data.data) {
                console.log(res.data.data);
                console.log(`Successfully Get All User Count Post`);
                return res.data.data;
            } else {
                console.log(`User id : ${id} Not found`);
                return undefined;
            }
        } catch (err) {
            console.log(`Error While Post Count ${err.message}`);
            throw err;
        }
    },
    getPostBySpecificUserId: async function (id) {
        try {
            const res = await axios.get(`${API_URL}/post/users/${id}`);
            if (res.data.status === "SUCCESS" && res.data.data) {
                console.log(`Successfully Get Post By User Id`);
                return res.data.data;
            } else {
                console.log(`Post User Id Not Found`);
            }
        } catch (err) {
            console.log(`Error While Post Count ${err.message}`);
            throw err;
        }
    },
    deletePostById: async function (id) {
        try {
            const res = await axios.get(`${API_URL}/post/${id}`);
            if (res.data.status === "SUCCESS") {
                console.log(`Successfully Delete`);
                return true;
            } else {
                console.log(`Post Not Found`);
                return false;
            }
        } catch (error) {
            console.log(`Error While Delete Post ${error.message}`);
            throw error;
        }
    },
    getAllPost: async function(){
        try{
            const res = await axios.get(`${API_URL}/post`);
            if(res.data.status === "SUCCESS"){
                console.log(`Successfully Get All Post`);
                console.log(res.data.data);
                return res.data.data;
            }else{
                console.log(`Post Not Found`);
                return false;
            }
        }catch(error) {
            console.log(`Error While Getting All Post ${error.message}`);
            throw error;
        }
    }
};

export default postServices;
