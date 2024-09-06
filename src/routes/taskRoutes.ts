import { Router } from 'express';
import { ITaskDao } from '../dao/ITaskDao';
import {IProjectDao} from '../dao/IProjectDao';
import {authenticationMiddleware} from '../middleware/authenticationMiddleware';
import {
  getTaskById,
  getAllTasks,
  getTasksByProjectId,
  createTask,
  updateTask,
  deleteTask,
} from '../controllers/taskControllers';

const createTaskRoutes = (taskDao: ITaskDao, projectDao: IProjectDao) => {
  const router = Router();

  router.get('/:taskId', authenticationMiddleware,getTaskById(taskDao));
  router.get('/', authenticationMiddleware,getAllTasks(taskDao));
  router.get('/project/:projectId', authenticationMiddleware,getTasksByProjectId(taskDao));
  router.post('/', authenticationMiddleware,createTask(taskDao,projectDao));
  router.put('/:taskId', authenticationMiddleware,updateTask(taskDao));
  router.delete('/:taskId', authenticationMiddleware,deleteTask(taskDao));

  return router;
};

export default createTaskRoutes;
