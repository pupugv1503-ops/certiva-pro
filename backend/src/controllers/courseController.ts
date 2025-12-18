import { Request, Response } from 'express';
import Course from '../models/Course';

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
export const getCourses = async (req: Request, res: Response) => {
  try {
    const courses = await Course.find({ isPublished: true });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get single course
// @route   GET /api/courses/:id
// @access  Public
export const getCourseById = async (req: Request, res: Response) => {
  try {
    const course = await Course.findById(req.params.id).populate('instructor', 'name email');
    if (course) {
      res.json(course);
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a course
// @route   POST /api/courses
// @access  Private/Instructor
export const createCourse = async (req: Request, res: Response) => {
  try {
    const { title, description, level, tags, thumbnail, price } = req.body;
    
    // Check if user is instructor or admin
    if (req.user?.role !== 'instructor' && req.user?.role !== 'admin') {
       res.status(403).json({ message: 'Not authorized to create courses' });
       return;
    }

    const course = new Course({
      title,
      description,
      instructor: req.user._id,
      level,
      tags,
      thumbnail,
      price,
      isPublished: false,
    });

    const createdCourse = await course.save();
    res.status(201).json(createdCourse);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// @desc    Enroll in a course
// @route   POST /api/courses/:id/enroll
// @access  Private
export const enrollCourse = async (req: Request, res: Response) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      res.status(404).json({ message: 'Course not found' });
      return;
    }

    const user = req.user;
    
    // Check if already enrolled
    // Note: user.enrolledCourses might need to be populated or just checked by ID
    // We need to cast user to any or extend interface properly in controller if strictly typed, 
    // but req.user is typed as IUser which we just updated.
    
    // However, the IUser import in this file might be missing or not updated in runtime context immediately? 
    // No, we imported global Express Request extension in middleware, but here we just import Request.
    // The global declaration in middleware file makes it available globally if included in compilation.
    
    // Use any for simplicity or correct checking
    const alreadyEnrolled = ((user as any).enrolledCourses || []).find(
      (enrolled: any) => enrolled.course.toString() === course._id.toString()
    );

    if (alreadyEnrolled) {
      res.status(400).json({ message: 'Already enrolled' });
      return;
    }

    (user as any).enrolledCourses.push({ course: course._id, progress: 0, completedLessons: [] });
    await user?.save();

    res.status(200).json({ message: 'Enrolled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// @desc    Submit assessment and update progress
// @route   POST /api/courses/:id/assessment
// @access  Private
export const submitAssessment = async (req: Request, res: Response) => {
  const { score } = req.body;
  const courseId = req.params.id;
  const userId = (req as any).user?._id;

  try {
    // We need to fetch user cleanly
    const user = await import('../models/User').then(m => m.default.findById(userId));
    
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const enrollment = user.enrolledCourses.find((e: any) => e.course.toString() === courseId);
    if (!enrollment) {
      res.status(404).json({ message: 'Not enrolled in this course' });
      return;
    }

    if (score >= 70) {
      enrollment.progress = 100;
      // Mark as completed if logic exists
    } else {
      enrollment.progress = Math.max(enrollment.progress, 50);
    }

    await user.save();
    res.json({ message: 'Assessment submitted', progress: enrollment.progress });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};
