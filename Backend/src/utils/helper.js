import { nanoid } from "nanoid";
import {cookieOptions} from "../config/config.js";
import jsonwebtoken from "jsonwebtoken";

export const generateNanoId = (length)=>{
    return nanoid(length); // generates a random string of specified length
}

export const signToken = (payload) =>{
        console.log("JWT_SECRET:", process.env.JWT_SECRET);
    return jsonwebtoken.sign(payload,process.env.JWT_SECRET,{expiresIn:'1d'});


}

export const verifyToken = (token)=>{
    const decoded =  jsonwebtoken.verify(token,process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded); // Log the decoded token to see its contents
    return decoded; // Return the user ID from the decoded token to identify the user
}