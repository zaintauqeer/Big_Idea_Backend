import express from 'express';
import { getCounts } from '../controllers/statsController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/counts', verifyToken, getCounts);

export default router;