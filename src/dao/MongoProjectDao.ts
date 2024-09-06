import { TProjectSchema, TProject } from '../types/types';
import { IProjectDao } from './IProjectDao';
import Project from '../models/Project'; 

export class MongoProjectDao implements IProjectDao {
  
  // Get project by ID
  getProjectById: (id: string) => Promise<TProjectSchema> = async (id) => {
    const project = await Project.findById(id).exec();
    if (!project) {
      throw new Error(`Project with id: ${id} not found.`);
    }
    return project.toObject();
  };

  // Get all projects
  getAllProjects: () => Promise<TProjectSchema[]> = async () => {
    const projects = await Project.find().exec();
    return projects.map(project => project.toObject());
  };

  // Create a new project
  createProject: (project: Omit<TProject, 'id'>) => Promise<TProjectSchema> = async (project) => {
    const newProject = new Project(project);
    await newProject.save();
    return newProject.toObject();
  };

  // Update a project
  updateProject: (id: string, project: Partial<TProjectSchema>) => Promise<TProjectSchema> = async (id, project) => {
    const updatedProject = await Project.findByIdAndUpdate(id, project, { new: true, runValidators:true }).exec();
    if (!updatedProject) {
      throw new Error(`Project with id: ${id} not found.`);
    }
    return updatedProject.toObject();
  };

  // Delete a project
  deleteProject: (id: string) => Promise<TProjectSchema> = async (id) => {
    const deletedProject = await Project.findByIdAndDelete(id).exec();
    if (!deletedProject) {
      throw new Error(`Project with id: ${id} not found.`);
    }
    return deletedProject.toObject();
  };
}
