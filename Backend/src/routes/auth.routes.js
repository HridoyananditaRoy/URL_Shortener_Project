import express from 'express'; 
import { register_user, login_user , logout, get_current_user} from '../controllers/auth.controllers.js';
import {authenticateUser} from "../Middlewares/auth.middleware.js";

const router = express.Router();

router.post('/register', register_user);
//get doesnt have req.body
//its sending params in url
router.post('/login', login_user);
router.post('/logout', logout);
router.get("/me",authenticateUser, get_current_user );
export default router;