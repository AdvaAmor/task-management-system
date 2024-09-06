import {TProjectSchema, TProject} from '../types/types';
export interface IProjectDao {
  getProjectById: (id:string)=> Promise<TProjectSchema>;
  getAllProjects: ()=> Promise<TProjectSchema[]>;
  createProject(project: Omit<TProject, 'id'>): Promise<TProjectSchema>;
  updateProject(id: string, updates: Partial<Omit<TProjectSchema, '_id'>>): Promise<TProjectSchema>;
  deleteProject(id: string): Promise<TProjectSchema>;
};
