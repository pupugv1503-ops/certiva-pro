import mongoose, { Document, Schema } from 'mongoose';

export interface ILesson {
  title: string;
  type: 'video' | 'text' | 'quiz';
  content: string; // URL for video, markdown for text
  duration: number; // in minutes
  quizQuestions?: {
    question: string;
    options: string[];
    correctAnswer: number;
  }[];
}

export interface IModule {
  title: string;
  lessons: ILesson[];
}

export interface ICourse extends Document {
  title: string;
  description: string;
  instructor: mongoose.Schema.Types.ObjectId;
  level: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  thumbnail: string;
  modules: IModule[];
  price: number;
  isPublished: boolean;
}

const lessonSchema = new Schema<ILesson>({
  title: { type: String, required: true },
  type: { type: String, enum: ['video', 'text', 'quiz'], required: true },
  content: { type: String, required: true },
  duration: { type: Number, required: true },
  quizQuestions: [{
    question: String,
    options: [String],
    correctAnswer: Number,
  }],
});

const moduleSchema = new Schema<IModule>({
  title: { type: String, required: true },
  lessons: [lessonSchema],
});

const courseSchema = new Schema<ICourse>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  instructor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
  tags: [String],
  thumbnail: { type: String, default: 'default-course.jpg' },
  modules: [moduleSchema],
  price: { type: Number, default: 0 },
  isPublished: { type: Boolean, default: false },
}, {
  timestamps: true,
});

const Course = mongoose.model<ICourse>('Course', courseSchema);

export default Course;
