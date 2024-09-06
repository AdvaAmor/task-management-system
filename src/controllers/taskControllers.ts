import { Request, Response } from 'express';
import { TTaskSchema,TTask } from '../types/types';
import { ITaskDao } from '../dao/ITaskDao';
import {IProjectDao} from '../dao/IProjectDao';

// Get task by ID
export const getTaskById = (dao: ITaskDao) => async (req: Request, res: Response) => {
  try {
    const taskId = req.params.taskId;
    const taskData: TTaskSchema = await dao.getTaskById(taskId);
    const task: TTask = {
      id: taskData._id,
      title: taskData.title,
      description: taskData.description,
      status: taskData.status,
      projectId:taskData.projectId,
    };
    
    res.status(200).json(task);
  } catch (error) {
    res.status(404).json({ error: (error as Error).message });
  }
};

// Get all tasks
export const getAllTasks = (dao: ITaskDao) => async (req: Request, res: Response) => {
  try {
    const tasksData: TTaskSchema[] = await dao.getAllTasks();
    const tasks: TTask[] = tasksData.map(task => ({
      id: task._id,
      title: task.title,
      description: task.description,
      status: task.status,
      projectId:task.projectId,
    }));

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Get tasks by project ID
export const getTasksByProjectId = (dao: ITaskDao) => async (req: Request, res: Response) => {
  try {
    const projectId = req.params.projectId;
    const tasksData: TTaskSchema[] = await dao.getTasksByProjectId(projectId);
    const tasks: TTask[] = tasksData.map(task => ({
      id: task._id,
      title: task.title,
      description: task.description,
      status: task.status,
      projectId:task.projectId,
    }));
    
    res.status(200).json(tasks);
  } catch (error) {
    res.status(404).json({ error: (error as Error).message });
  }
};

// Create a new task
export const createTask = (taskDao: ITaskDao, projectDao: IProjectDao) => async (req: Request, res: Response) => {
  try {
    const { title, description, projectId }: Omit<TTask, 'id'> = req.body;

     // Check if the project exists before creating the task
     await projectDao.getProjectById(projectId);
     
    const newTask: TTaskSchema = await taskDao.createTask({title, description, projectId});
    const task: TTask = {
      id: newTask._id,
      title: newTask.title,
      description: newTask.description,
      status: newTask.status,
      projectId:newTask.projectId,
    };

    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

// Update a task
export const updateTask = (dao: ITaskDao) => async (req: Request, res: Response) => {
  try {
    const taskId = req.params.taskId;
    const updates: Partial<Omit<TTaskSchema, '_id'>> = req.body;
    const updatedTask: TTaskSchema = await dao.updateTask(taskId, updates);
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

// Delete a task by ID
export const deleteTask = (dao: ITaskDao) => async (req: Request, res: Response) => {
  try {
    const taskId = req.params.taskId;
    const deletedTask: TTaskSchema = await dao.deleteTask(taskId);
    res.status(200).json(deletedTask);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
