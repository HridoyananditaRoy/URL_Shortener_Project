import { nanoid } from "nanoid";
import {cookieOptions} from "../config/config.js";
import jsonwebtoken from "jsonwebtoken";

export const generateNanoId = (length)=>{
    return nanoid(length); // generates a random string of specified length
}

export const signToken = (payload) =>{
    return jsonwebtoken.sign(payload,process.env.JWT_SECRET,{expiresIn:'1d'});
}

export const verifyToken = (token)=>{
    const decoded =  jsonwebtoken.verify(token,process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded.id); // Log the decoded token to see its contents
    return decoded.id; // Return the user ID from the decoded token to identify the user
}