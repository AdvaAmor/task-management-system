import { TTaskSchema,TTask } from '../types/types';
import { ITaskDao } from './ITaskDao';
import Task from '../models/Task'; 

export class MongoTaskDao implements ITaskDao {
  
  // Get task by ID
  getTaskById: (id: string) => Promise<TTaskSchema> = async (id) => {
    const task = await Task.findById(id).exec();
    if (!task) {
      throw new Error(`task with id: ${id} not found.`);
    }
    return task.toObject();
  };

  // Get all tasks
  getAllTasks: () => Promise<TTaskSchema[]> = async () => {
    const tasks = await Task.find().exec();
    return tasks.map(task => task.toObject());
  };

  // Get task by id
  getTasksByProjectId: (id: string) => Promise<TTaskSchema[]> = async (id) =>{
    const tasks = await Task.find({ projectId:id }).exec();
    return tasks.map(task => task.toObject()); 
  };

  // Create a new task
  createTask: (task: Omit<TTask, 'id'>) => Promise<TTaskSchema> = async (task) => {
    const newTask = new Task(task);
    await newTask.save();
    return newTask.toObject();
  };

  // Update a task
  updateTask: (id: string, task: Partial<TTaskSchema>) => Promise<TTaskSchema> = async (id, task) => {
    const updatedTask = await Task.findByIdAndUpdate(id, task, { new: true ,runValidators:true }).exec();
    if (!updatedTask) {
      throw new Error(`Task with id: ${id} not found.`);
    }
    return updatedTask.toObject();
  };

  // Delete a task
  deleteTask: (id: string) => Promise<TTaskSchema> = async (id) => {
    const deletedTask = await Task.findByIdAndDelete(id).exec();
    if (!deletedTask) {
      throw new Error(`Task with id: ${id} not found.`);
    }
    return deletedTask.toObject();
  };

  deleteTasksByProjectId: (id: string) => Promise<boolean> = async (id) => {
    await Task.deleteMany({ projectId: id }).exec();
    return Promise.resolve(true);
  };
}
