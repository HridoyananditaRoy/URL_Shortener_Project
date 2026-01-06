import { registerUser, loginUser } from "../services/auth.service.js";
import jsonwebtoken from "jsonwebtoken";
import {cookieOptions} from "../config/config.js";


export const register_user = async (req, res) => {
   try {
    //try–catch only prevents the server from crashing
    //  and lets you send a clean response to Postman.
    const { name, email, password } = req.body;
    const token = await registerUser({ name, email, password });

    req.user = user; // Attach user to request object
    // Proceed to next middleware or route handler
    // Set cookie with token
    //on success, we get token
    res.cookie("token", token, cookieOptions); // Set cookie with token

    //token saved before msg sent to client
    //token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NWNiOGFiNTU5YzQ3ODlmNTk2NmYxMCIsImlhdCI6MTc2NzY4NDI2NywiZXhwIjoxNzY3NzcwNjY3fQ.EXhUDUUJTFZx0Y_Oaqfn_R_A5pi8PxFmpR61L-gYUbg; Path=/;
    //  HttpOnly; Expires=Wed, 07 Jan 2026 07:24:27 GMT;
    res.status(201).json({ 
        success: true,
        token,
        message: "User registered successfully"
     });
   } catch (error) {
    res.status(400).json({
        success: false,
        message: error.message
    });
   }
};

export const login_user = async (req, res) => {
   try {
    const { email, password } = req.body;
    const token = await loginUser({ email, password });

    req.user = user; // Attach user to request object
    // Proceed to next middleware or route handler
    res.cookie("token", token, cookieOptions); // Set cookie with token
    res.status(200).json({ 
        success: true,
        token,
        message: "User logged in successfully"
     });
   } catch (error) {
    
    //If invalid, sends error response
    res.status(400).json({
        success: false,
        message: error.message
    });
   }
};