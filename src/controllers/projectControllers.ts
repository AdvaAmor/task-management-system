import { Request, Response } from 'express';
import { TProject, TProjectSchema } from '../types/types';
import { IProjectDao } from '../dao/IProjectDao';
import {ITaskDao} from '../dao/ITaskDao';

export const getProjectById = (dao: IProjectDao) => async (req: Request, res: Response) => {
  try {
    const projectId = req.params.projectId;
    const projectData: TProjectSchema = await dao.getProjectById(projectId);
    const project: TProject = {
      id: projectData._id,
      name: projectData.name,
      description: projectData.description,
    };

    res.status(200).json(project);
  } catch (error) {
    res.status(404).json({ error: (error as Error).message });
  }
};

export const getAllProjects = (dao: IProjectDao) => async (req: Request, res: Response) => {
  try {
    const projectsData: TProjectSchema[] = await dao.getAllProjects();
    const projects: TProject[] = projectsData.map(projectData => ({
      id: projectData._id,
      name: projectData.name,
      description: projectData.description,
    }));

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const createProject = (dao: IProjectDao) => async (req: Request, res: Response) => {
  try {
    const { name, description }: Omit<TProjectSchema, '_id'> = req.body;
    const newProject: TProjectSchema = await dao.createProject({ name, description });
    const project: TProject = {
      id: newProject._id,
      name: newProject.name,
      description: newProject.description,
    };

    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const updateProject = (dao: IProjectDao) => async (req: Request, res: Response) => {
  try {
    const projectId = req.params.projectId;
    const updates: Partial<Omit<TProjectSchema, '_id'>> = req.body;

    const updatedProject: TProjectSchema = await dao.updateProject(projectId, updates);
    const project: TProject = {
      id: updatedProject._id,
      name: updatedProject.name,
      description: updatedProject.description,
    };

    res.status(200).json(project);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const deleteProject = (projectDao: IProjectDao,taskDao: ITaskDao) => async (req: Request, res: Response) => {
  try {
    const projectId = req.params.projectId;

    await taskDao.deleteTasksByProjectId(projectId);

    const deleteProject = await projectDao.deleteProject(projectId);

    const project: TProject = {
      id: deleteProject._id,
      name: deleteProject.name,
      description: deleteProject.description,
    };
    res.status(200).json(project);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
