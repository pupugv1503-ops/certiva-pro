import express from 'express';
import { generateCertificate, downloadCertificate, verifyCertificate } from '../controllers/certificateController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/generate', protect, generateCertificate);
router.get('/:id/download', protect, downloadCertificate);
router.get('/verify/:uniqueId', verifyCertificate);

export default router;
