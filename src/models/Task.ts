import mongoose, { Schema } from 'mongoose';
import {TTaskSchema} from '../types/types';

const taskSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: { 
    type: String,
    enum: ['todo', 'in-progress', 'done'],
    default: 'todo',
  },
  projectId:{
    type: Schema.Types.ObjectId,
    ref: 'Project', 
    required: true,
  }
});

const Task = mongoose.model<TTaskSchema>("Task", taskSchema);

export default Task;