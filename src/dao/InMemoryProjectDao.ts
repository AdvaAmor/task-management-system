import { TProjectSchema,TProject } from '../types/types';
import { IProjectDao } from './IProjectDao';

/**
 * InMemoryProjectDao is a mock data implementation of the IProjectDao interface.
 * This class provides an in-memory data structure to simulate project management functionality.
 * It is used for testing and development purposes to demonstrate how the functionality should behave
 * without relying on a real database. The methods in this class mimic the expected behavior of
 * a database-backed implementation, which can be used as a reference for creating a database
 * integration (e.g., MongoDB) for the project data.
 */

export class InMemoryProjectDao implements IProjectDao {
  private projects: TProjectSchema[] = [
    { _id: '1234', name: 'adva1', description: 'assdfggghh' },
    { _id: '56789', name: 'adva2', description: 'assdfggghh' },
    { _id: '987654', name: 'adva4', description: 'assdfggghh' },
  ];

  getProjectById: (id: string) => Promise<TProjectSchema> = (id: string) => {
    const project = this.projects.find(p => p._id === id);
    if (project) {
      return Promise.resolve(project);
    }
    return Promise.reject(new Error('Project not found'));
  };

  getAllProjects: () => Promise<TProjectSchema[]> = () => {
    return Promise.resolve(this.projects);
  };

  createProject: (project: Omit<TProject, 'id'>) => Promise<TProjectSchema> = (project) => {
    // Check if a project with the same name already exists
    const existingProject = this.projects.find(p => p.name === project.name);
  
    if (existingProject) {
      // If a project with the same name exists, reject the promise with an error
      return Promise.reject(new Error(`Project with name "${project.name}" already exists.`));
    }
  
    // If no project with the same name exists, create the new project
    const newProject: TProjectSchema = { _id: String(Date.now()), ...project };
    this.projects.push(newProject);
    return Promise.resolve(newProject);
  };
  
  updateProject: (id: string, updates: Partial<Omit<TProjectSchema, '_id'>>) => Promise<TProjectSchema> = (id, updates) => {
    const projectIndex = this.projects.findIndex(p => p._id === id);
    if (projectIndex === -1) {
      return Promise.reject(new Error(`Project with id: ${id} not found.`));
    }
  
    // If the update includes a new name, check if that name already exists
    if (updates.name) {
      const existingProjectWithName = this.projects.find(p => p.name === updates.name && p._id !== id);
      if (existingProjectWithName) {
        // If another project with the same name exists, reject the promise with an error
        return Promise.reject(new Error(`Project with name "${updates.name}" already exists.`));
      }
    }
  
    // Proceed with the update if the name is unique or not being updated
    const updatedProject = { ...this.projects[projectIndex], ...updates };
    this.projects[projectIndex] = updatedProject;
    return Promise.resolve(updatedProject);
  };
  

deleteProject: (id: string) => Promise<TProjectSchema> = (id) => {
  const projectIndex = this.projects.findIndex(p => p._id === id);
  
  if (projectIndex === -1) {
    return Promise.reject(new Error(`Project with id: ${id} not found.`));
  }

  // Store the project before deleting it
  const deletedProject = this.projects[projectIndex];

  // Remove the project from the array
  this.projects.splice(projectIndex, 1);

  // Resolve the promise with the deleted project
  return Promise.resolve(deletedProject);
};
}
