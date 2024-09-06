import { Request, Response } from 'express';
import { getProjectById, getAllProjects, createProject, updateProject, deleteProject } from '../controllers/projectControllers';
import { IProjectDao } from '../dao/IProjectDao';
import { ITaskDao } from '../dao/ITaskDao';
import { TTaskSchema, TTask } from '../types/types';

// יצירת DAO מדומה
const mockProjectDao: IProjectDao = {
  getProjectById: jest.fn(),
  getAllProjects: jest.fn(),
  createProject: jest.fn(),
  updateProject: jest.fn(),
  deleteProject: jest.fn(),
};

const mockTaskDao: ITaskDao = {
  deleteTasksByProjectId: jest.fn(),
  getTaskById: jest.fn(),
  getAllTasks: jest.fn(),
  getTasksByProjectId: jest.fn(),
  createTask: jest.fn(),
  updateTask: jest.fn(),
  deleteTask: jest.fn()
};

describe('Project Controller Tests', () => {
  it('should get a project by ID', async () => {
    const req = { params: { projectId: '1' } } as Partial<Request>;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as Partial<Response> as Response;

    const mockProject = { _id: '1', name: 'Test Project', description: 'Test Description' };
    (mockProjectDao.getProjectById as jest.Mock).mockResolvedValue(mockProject);

    await getProjectById(mockProjectDao)(req as Request, res);

    expect(mockProjectDao.getProjectById).toHaveBeenCalledWith('1');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ id: '1', name: 'Test Project', description: 'Test Description' });
  });

  it('should get all projects', async () => {
    const req = {} as Partial<Request>;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as Partial<Response> as Response;

    const mockProjects = [
      { _id: '1', name: 'Project 1', description: 'Description 1' },
      { _id: '2', name: 'Project 2', description: 'Description 2' },
    ];
    (mockProjectDao.getAllProjects as jest.Mock).mockResolvedValue(mockProjects);

    await getAllProjects(mockProjectDao)(req as Request, res);

    expect(mockProjectDao.getAllProjects).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([
      { id: '1', name: 'Project 1', description: 'Description 1' },
      { id: '2', name: 'Project 2', description: 'Description 2' },
    ]);
  });

  it('should create a project', async () => {
    const req = { body: { name: 'New Project', description: 'New Description' } } as Partial<Request>;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as Partial<Response> as Response;

    const mockProject = { _id: '1', name: 'New Project', description: 'New Description' };
    (mockProjectDao.createProject as jest.Mock).mockResolvedValue(mockProject);

    await createProject(mockProjectDao)(req as Request, res);

    expect(mockProjectDao.createProject).toHaveBeenCalledWith({ name: 'New Project', description: 'New Description' });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: '1', name: 'New Project', description: 'New Description' });
  });

  it('should update a project', async () => {
    const req = { params: { projectId: '1' }, body: { name: 'Updated Project' } } as Partial<Request>;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as Partial<Response> as Response;

    const updatedProject = { _id: '1', name: 'Updated Project', description: 'Old Description' };
    (mockProjectDao.updateProject as jest.Mock).mockResolvedValue(updatedProject);

    await updateProject(mockProjectDao)(req as Request, res);

    expect(mockProjectDao.updateProject).toHaveBeenCalledWith('1', { name: 'Updated Project' });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ id: '1', name: 'Updated Project', description: 'Old Description' });
  });

  it('should delete a project', async () => {
    const req = { params: { projectId: '1' } } as Partial<Request>;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as Partial<Response> as Response;

    const deletedProject = { _id: '1', name: 'Deleted Project', description: 'Deleted Description' };
    (mockProjectDao.deleteProject as jest.Mock).mockResolvedValue(deletedProject);

    await deleteProject(mockProjectDao, mockTaskDao)(req as Request, res);

    expect(mockTaskDao.deleteTasksByProjectId).toHaveBeenCalledWith('1');
    expect(mockProjectDao.deleteProject).toHaveBeenCalledWith('1');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ id: '1', name: 'Deleted Project', description: 'Deleted Description' });
  });
});
