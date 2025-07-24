import { tasks } from "../data/tasks";
import { Task } from "../types/Task";

let currentId = 1;

export const getTasks = () => tasks;

export const addTask = (title: string, description: string): Task => {
  const newTask: Task = {
    id: currentId++,
    title,
    description,
    status: "pending",
  };
  tasks.push(newTask);
  return newTask;
};

export const deleteTask = (id: number): boolean => {
  const index = tasks.findIndex(t => t.id === id);
  if (index !== -1) {
    tasks.splice(index, 1);
    return true;
  }
  return false;
};
