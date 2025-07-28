import axios from "axios";
const API_URL = "http://localhost:3005/api";


const postImageServices = {
    createImage: async function(formData){
         try{
            const res = await axios.post(`${API_URL}/post-image/create` , formData , {
                headers: { "Content-Type": "multipart/form-data" },
            })
            if(res.data.status === "SUCCESS"){
                return res.data.data;
            }else{
                return false;
            }
        }catch(error){
            throw new Error(error);
        }
    }
};
export default postImageServices;
