import express from 'express'; 
import { createShortUrl, redirectUrl, createCustomUrl } from '../controllers/shorturl.controllers.js'; 
const router = express.Router();

router.post('/',createShortUrl);
router.get('/:id',redirectUrl);
router.post('/custom',createCustomUrl);

export default router;