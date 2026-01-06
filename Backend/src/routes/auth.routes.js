import express from 'express'; 
import { register_user, login_user } from '../controllers/auth.controllers.js';

const router = express.Router();

router.post('/register', register_user);
//get doesnt have req.body
//its sending params in url
router.post('/login', login_user);

export default router;