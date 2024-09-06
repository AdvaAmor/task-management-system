import mongoose, { Schema } from 'mongoose';
import { TProjectSchema } from '../types/types';

const projectSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
});

const Project = mongoose.model<TProjectSchema>('Project', projectSchema);

export default Project;
