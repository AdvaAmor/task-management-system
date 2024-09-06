import { TTaskSchema, TTask } from '../types/types';
import { ITaskDao } from './ITaskDao';

/**
 * InMemoryTaskDao is a mock data implementation of the ITaskDao interface.
 * This class provides an in-memory data structure to simulate project management functionality.
 * It is used for testing and development purposes to demonstrate how the functionality should behave
 * without relying on a real database. The methods in this class mimic the expected behavior of
 * a database-backed implementation, which can be used as a reference for creating a database
 * integration (e.g., MongoDB) for the project data.
 */

export class InMemoryTaskDao implements ITaskDao {
  private tasks: TTaskSchema[] = [];

  // Get task by ID
  getTaskById: (id: string) => Promise<TTaskSchema> = async (id) => {
    const task = this.tasks.find(task => task._id === id);
    if (!task) {
      throw new Error(`Task with id: ${id} not found.`);
    }
    return task;
  };

  // Get all tasks
  getAllTasks: () => Promise<TTaskSchema[]> = async () => {
    return this.tasks;
  };

  // Get tasks by project ID
  getTasksByProjectId: (id: string) => Promise<TTaskSchema[]> = async (id) => {
    return this.tasks.filter(task => task.projectId === id);
  };

  // Create a new task
  createTask: (task: Omit<TTask, 'id'>) => Promise<TTaskSchema> = async (task) => {
    const newTask: TTaskSchema = {
      _id: String(Date.now()),
      status: 'todo',
      ...task,
    };
    this.tasks.push(newTask);
    return newTask;
  };

  // Update a task
  updateTask: (id: string, updates: Partial<TTaskSchema>) => Promise<TTaskSchema> = async (id, updates) => {
    const taskIndex = this.tasks.findIndex(task => task._id === id);
    if (taskIndex === -1) {
      throw new Error(`Task with id: ${id} not found.`);
    }
    const updatedTask = { ...this.tasks[taskIndex], ...updates };
    this.tasks[taskIndex] = updatedTask;
    return updatedTask;
  };

  // Delete a task
  deleteTask: (id: string) => Promise<TTaskSchema> = async (id) => {
    const taskIndex = this.tasks.findIndex(task => task._id === id);
    if (taskIndex === -1) {
      throw new Error(`Task with id: ${id} not found.`);
    }
    const [deletedTask] = this.tasks.splice(taskIndex, 1);
    return deletedTask;
  };

  // Delete tasks by project ID
  deleteTasksByProjectId: (id: string) => Promise<boolean> = async (id) => {
    const initialLength = this.tasks.length;
    this.tasks = this.tasks.filter(task => task.projectId !== id);
    return this.tasks.length < initialLength;
  };
}
