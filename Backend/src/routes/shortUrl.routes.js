import express from 'express'; 
import { createShortUrl, redirectUrl, createCustomUrl } from '../controllers/shorturl.controllers.js'; 
import { authenticateUser } from '../Middlewares/auth.middleware.js';

const router = express.Router();

router.post('/', authenticateUser, createShortUrl);
router.post('/custom', authenticateUser, createShortUrl); // or createCustomUrl
router.get('/:id', redirectUrl);


export default router;