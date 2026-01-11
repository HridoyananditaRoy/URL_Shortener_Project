import axiosInstance from "../utils/axiosInstance.js"

export const LoginUser = async({password, email}) =>{
    //we need to take url as param while loggin
    //take password and login

    //Go in "api/auth/login" and take email, password and return
    
//     👉 Because res in LoginForm is NOT Axios’ response.
//      👉 It is just a variable holding whatever your API function returns.
//       This is real axios, res is just variable holding my api
    
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

export const getCurrentUser = async()=>{
    const {data}  = await axiosInstance.get('/api/auth/me');
    return data;
}