//axios ka instance banao
import axios from "axios";

//Created instance of axios with custom config
//Here BASE URL is set to backend server
const axiosInstance = axios.create({
    baseURL: "http://localhost:5000", //base url for all requests
    //you can add headers here if needed
    timeout: 5000, //5 seconds timeout
});

//cookies are the way to store session data on client side
// axiosInstance.defaults.withCredentials = true; //to send cookies with requests if needed
//Response interceptors can be added here if needed
// axios.instance.interceptors.response.use(
//     response => response,
//     error => {
//         console.error("Axios error:", error);
//         return Promise.reject(error);
//     }
// );

export default axiosInstance;