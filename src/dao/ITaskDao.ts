import {TTaskSchema,TTask} from '../types/types';
export interface ITaskDao {
  getTaskById: (id:string)=> Promise<TTaskSchema>;
  getAllTasks: ()=> Promise<TTaskSchema[]>;
  getTasksByProjectId: (id:string)=> Promise<TTaskSchema[]>;
  createTask(project: Omit<TTask, 'id'>): Promise<TTaskSchema>;
  updateTask(id: string, updates: Partial<Omit<TTaskSchema, '_id'>>): Promise<TTaskSchema>;
  deleteTask(id: string): Promise<TTaskSchema>;
  deleteTasksByProjectId(id: string):Promise<boolean>; 
};
