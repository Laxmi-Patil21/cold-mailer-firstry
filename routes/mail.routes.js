import express from 'express'
import authMiddleware from '../middleware/auth.middleware.js';
import { generateColdEmails } from '../services/mail.service.js';
import { deleteEmail, getEmailById, getMyEmails, updateEmail, sendMail } from '../controller/mail.controller.js';

const router = express.Router();

router.post('/generate',authMiddleware,generateColdEmails);
router.post('/',authMiddleware,getMyEmails);
router.post('/:id',authMiddleware,getEmailById);
router.post('/:id',authMiddleware,updateEmail);
router.post('/:id',authMiddleware,deleteEmail);
router.post('/send',authMiddleware,sendMail);

export default router;