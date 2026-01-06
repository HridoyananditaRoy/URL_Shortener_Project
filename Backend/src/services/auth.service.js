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
    const user = await findUserByEmail(email);

    if(!user || user.password !== password){
        throw new Error("Invalid credentials");
    }

    const token = signToken({id: user._id}); //Took id from user found in DB
    return token; // Return token to controller

}