import express from 'express';
import { getCourses, getCourseById, createCourse, enrollCourse, submitAssessment } from '../controllers/courseController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/').get(getCourses).post(protect, createCourse);
router.route('/:id').get(getCourseById);
router.route('/:id/enroll').post(protect, enrollCourse);
router.route('/:id/assessment').post(protect, submitAssessment);

export default router;
