import axios from "axios";
const API_URL = "http://localhost:3005/api";

const userServices = {
    register: async function (formData) {
        try {
            const res = await axios.post(`${API_URL}/users/register`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            if (res.data.status === "SUCCESS") {
                return res.data.data;
            } else {
                return false;
            }
        } catch (error) {
            console.error("Register error:", error);
            return false;
        }
    },
    login: async function (payLoad) {
        try {
            const res = await axios.post(`${API_URL}/users/login`, payLoad);
            if (res.data.status === "SUCCESS") {
                return res.data.data;
            } else {
                return false;
            }
        } catch (error) {
            console.error("Login error: ", error.message);
            return false;
        }
    },
    findUserWithId: async function (id) {
        try {
            const res = await axios.get(`${API_URL}/users/${id}`);
            if (res.data.status === "SUCCESS" && res.data.data) {
                return res.data.data;
            } else {
                console.log("failure");
                return false;
            }
        } catch (error) {
            console.error("User Not Found");
            throw error;
        }
    },
    EditProfile: async function (id, formData) {
        try {
            const res = await axios.put(`${API_URL}/users/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            if (res.data.status === "SUCCESS" && res.data.data) {
                return res.data.data;
            } else {
                console.log("Failure to Update Profile");
                return false;
            }
        } catch (error) {
            console.error(`erorr occur while edit profile`);
            throw error;
        }
    },
};
export default userServices;
