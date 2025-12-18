import mongoose, { Document, Schema } from 'mongoose';

export interface ICertificate extends Document {
  user: mongoose.Schema.Types.ObjectId;
  course: mongoose.Schema.Types.ObjectId;
  uniqueId: string; // for verification
  issueDate: Date;
}

const certificateSchema = new Schema<ICertificate>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  uniqueId: { type: String, required: true, unique: true },
  issueDate: { type: Date, default: Date.now },
}, {
  timestamps: true,
});

const Certificate = mongoose.model<ICertificate>('Certificate', certificateSchema);

export default Certificate;
