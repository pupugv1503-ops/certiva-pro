import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'student' | 'instructor' | 'admin';
  enrolledCourses: {
    course: mongoose.Schema.Types.ObjectId;
    progress: number;
    completedLessons: mongoose.Schema.Types.ObjectId[];
  }[];
  matchPassword: (enteredPassword: string) => Promise<boolean>;
}

const userSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['student', 'instructor', 'admin'],
    default: 'student',
  },
  enrolledCourses: [{
    course: { type: Schema.Types.ObjectId, ref: 'Course' },
    progress: { type: Number, default: 0 },
    completedLessons: [{ type: Schema.Types.ObjectId }],
  }],
}, {
  timestamps: true,
});

userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function () {
  const user = this as any;
  if (!user.isModified('password')) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password as string, salt);
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
