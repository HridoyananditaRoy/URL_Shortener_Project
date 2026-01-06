// //Middleware to authenticate user using JWT token from cookies
// //To verify if user is logged in before accessing protected routes


// //Since we have our tokens saved in cookies, we will extract token from cookies
// //if token is valid, we allow user to access protected routes
// //else we send error response

// export const authenticateUser = async(req, res, next) => {
//     try {
//         const token = req.cookies.token; // Extract token from cookies
//         if(!token){
//             return res.status(401).json({
//                 success: false,
//                 message: "No token provided, authorization denied"
//             });
//         }

//         //If token is present, verify it
        
//         const decoded = jsonwebtoken.VerifyToken(token);
//         const user = await findUserById(decoded); // Find user by ID from decoded token
//         if(!user){
//             return res.status(401).json({
//                 success: false,
//                 message: "Invalid token, user not found"
//             });
//         }
//         req.user = user; // Attach user to request object
//         next(); // Proceed to next middleware or route handler


//     } catch (error) {
//         return res.status(401).json({
//             success: false,
//             message: "Token verification failed"
//         });
//     }
// }

import jwt from "jsonwebtoken";
import { findUserById } from "../dao/user.dao.js";

export const authenticateUser = async (req, res, next) => {
  try {
    let token = null;

    // 1️⃣ Get token from Authorization header
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    // 2️⃣ If no token → user not logged in
    if (!token) {
      req.user = null;
      return next();
    }

    // 3️⃣ Decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4️⃣ Find user in DB
    const user = await findUserById(decoded.id);
    if (!user) {
      req.user = null;
      return next();
    }

    // 5️⃣ Attach user to req
    req.user = user;
    next();
  } catch (err) {
    req.user = null;
    next();
  }
};