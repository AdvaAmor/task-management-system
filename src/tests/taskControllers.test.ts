import { Request, Response } from 'express';
import { getTaskById, getAllTasks, getTasksByProjectId, createTask, updateTask, deleteTask } from '../controllers/taskControllers';
import { ITaskDao } from '../dao/ITaskDao';
import { IProjectDao } from '../dao/IProjectDao';

const mockTaskDao: ITaskDao = {
  getTaskById: jest.fn(),
  getAllTasks: jest.fn(),
  getTasksByProjectId: jest.fn(),
  createTask: jest.fn(),
  updateTask: jest.fn(),
  deleteTask: jest.fn(),
  deleteTasksByProjectId: function (id: string): Promise<boolean> {
    throw new Error('Function not implemented.');
  }
};

const mockProjectDao: IProjectDao = {
  getProjectById: jest.fn(),
  getAllProjects: jest.fn(),
  createProject: jest.fn(),
  updateProject: jest.fn(),
  deleteProject: jest.fn(),
};

describe('Task Controller Tests', () => {
  // Test for getting a task by ID
  it('should get a task by ID', async () => {
    const req = { params: { taskId: '1' } } as unknown as Request;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

    const mockTask = { _id: '1', title: 'Test Task', description: 'Test Description', status: 'open', projectId: '2' };
    (mockTaskDao.getTaskById as jest.Mock).mockResolvedValue(mockTask);

    await getTaskById(mockTaskDao)(req, res);

    expect(mockTaskDao.getTaskById).toHaveBeenCalledWith('1');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      id: '1',
      title: 'Test Task',
      description: 'Test Description',
      status: 'open',
      projectId: '2'
    });
  });

  // Test for getting all tasks
  it('should get all tasks', async () => {
    const req = {} as unknown as Request;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

    const mockTasks = [
      { _id: '1', title: 'Task 1', description: 'Description 1', status: 'open', projectId: '2' },
      { _id: '2', title: 'Task 2', description: 'Description 2', status: 'closed', projectId: '3' }
    ];
    (mockTaskDao.getAllTasks as jest.Mock).mockResolvedValue(mockTasks);

    await getAllTasks(mockTaskDao)(req, res);

    expect(mockTaskDao.getAllTasks).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockTasks.map(task => ({
      id: task._id,
      title: task.title,
      description: task.description,
      status: task.status,
      projectId: task.projectId
    })));
  });

  // Test for getting tasks by project ID
  it('should get tasks by project ID', async () => {
    const req = { params: { projectId: '2' } } as unknown as Request;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

    const mockTasks = [
      { _id: '1', title: 'Task 1', description: 'Description 1', status: 'open', projectId: '2' },
      { _id: '2', title: 'Task 2', description: 'Description 2', status: 'closed', projectId: '2' }
    ];
    (mockTaskDao.getTasksByProjectId as jest.Mock).mockResolvedValue(mockTasks);

    await getTasksByProjectId(mockTaskDao)(req, res);

    expect(mockTaskDao.getTasksByProjectId).toHaveBeenCalledWith('2');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockTasks.map(task => ({
      id: task._id,
      title: task.title,
      description: task.description,
      status: task.status,
      projectId: task.projectId
    })));
  });

  // Test for creating a new task
  it('should create a new task', async () => {
    const req = { body: { title: 'New Task', description: 'New Description', projectId: '2' } } as unknown as Request;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

    const newTask = { _id: '1', title: 'New Task', description: 'New Description', status: 'open', projectId: '2' };
    (mockTaskDao.createTask as jest.Mock).mockResolvedValue(newTask);
    (mockProjectDao.getProjectById as jest.Mock).mockResolvedValue({ _id: '2', name: 'Test Project', description: 'Test Description' });

    await createTask(mockTaskDao, mockProjectDao)(req, res);

    expect(mockProjectDao.getProjectById).toHaveBeenCalledWith('2');
    expect(mockTaskDao.createTask).toHaveBeenCalledWith({ title: 'New Task', description: 'New Description', projectId: '2' });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      id: '1',
      title: 'New Task',
      description: 'New Description',
      status: 'open',
      projectId: '2'
    });
  });

  // Test for updating a task
  it('should update a task', async () => {
    const req = { params: { taskId: '1' }, body: { title: 'Updated Task' } } as unknown as Request;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

    const updatedTask = { _id: '1', title: 'Updated Task', description: 'Test Description', status: 'open', projectId: '2' };
    (mockTaskDao.updateTask as jest.Mock).mockResolvedValue(updatedTask);

    await updateTask(mockTaskDao)(req, res);

    expect(mockTaskDao.updateTask).toHaveBeenCalledWith('1', { title: 'Updated Task' });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(updatedTask);
  });

  // Test for deleting a task
  it('should delete a task by ID', async () => {
    const req = { params: { taskId: '1' } } as unknown as Request;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

    const deletedTask = { _id: '1', title: 'Deleted Task', description: 'Test Description', status: 'open', projectId: '2' };
    (mockTaskDao.deleteTask as jest.Mock).mockResolvedValue(deletedTask);

    await deleteTask(mockTaskDao)(req, res);

    expect(mockTaskDao.deleteTask).toHaveBeenCalledWith('1');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(deletedTask);
  });
});
