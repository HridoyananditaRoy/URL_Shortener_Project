import jsonwebtoken from "jsonwebtoken";
import { findUserByEmail, createUser } from "../dao/user.dao.js";
import {signToken} from "../utils/helper.js";


export const registerUser = async({name, email, password})=>{
    // Logic to register user
    const user = await findUserByEmail(email); // Check if user already exists Dao
    if(user){
        throw new Error("User already exists");
    }
    const newUser = await createUser({name, email, password});
    const token = signToken({id: newUser._id}); // Generate JWT token
    //signToken function from helper.js
    return token; // Return token to controller
}


export const loginUser = async({email,password})=>{
    console.log("📧 Finding user with email:", email);
    const user = await findUserByEmail(email);
    if(!user) {
        console.log("❌ User not found");
        throw new Error("Invalid email or password");
    }
    
    console.log("✅ User found, comparing password...");
    const isMatch = await user.comparePassword(password);
    if(!isMatch) {
        console.log("❌ Password mismatch");
        throw new Error("Invalid email or password");
    }

    console.log("✅ Password matched, generating token");
    const token = signToken({id: user._id});
    return token; // Return token to controller

}