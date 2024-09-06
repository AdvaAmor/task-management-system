import { Router } from 'express';
import { IProjectDao } from '../dao/IProjectDao';
import {ITaskDao} from '../dao/ITaskDao';
import {authenticationMiddleware} from '../middleware/authenticationMiddleware';
import {authorizationMiddleware} from '../middleware/authorizationMiddleware';
import {
  getProjectById,
  getAllProjects,
  createProject,
  updateProject,
  deleteProject
} from '../controllers/projectControllers';

const createProjectRoutes = (projectDao: IProjectDao, taskDao: ITaskDao) => {
  const router = Router();

  router.get('/:projectId',authenticationMiddleware ,getProjectById(projectDao));
  router.get('/', authenticationMiddleware,getAllProjects(projectDao));
  router.post('/',authenticationMiddleware, authorizationMiddleware,createProject(projectDao));
  router.put('/:projectId', authenticationMiddleware,authorizationMiddleware,updateProject(projectDao));
  router.delete('/:projectId', authenticationMiddleware,authorizationMiddleware,deleteProject(projectDao,taskDao));

  return router;
};

export default createProjectRoutes;
