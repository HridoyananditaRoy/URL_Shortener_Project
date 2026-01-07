import axiosInstance from "../utils/axiosInstance.js"

export const LoginUser = async({password, email}) =>{
    //we need to take url as param while loggin
    //take password and login

    //Go in "api/auth/login" and take email, password and return
    const {data} = await axiosInstance.post("/api/auth/login",{email,password});
    return data; //return data -> email, password ...
}

export const RegisterUser = async({name,password, email}) =>{
    const {data} = await axiosInstance.post("/api/auth/register",{name,email,password});
    return data;
}

export const LogoutUser = async({password, email}) =>{
    const {data} = await axiosInstance.post("/api/auth/logout",{email,password});
    return data;
}