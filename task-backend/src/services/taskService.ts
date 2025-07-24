import { Task } from "../types/Task";
import { tasks } from "../data/tasks";
import crypto from "crypto";

// Créer une tâche
export const addTask = (title: string, description: string): Task => {
  const newTask: Task = {
    id: crypto.randomUUID(),
    title,
    description,
    status: "pending",
  };
  tasks.push(newTask);
  return newTask;
};

// Lire toutes les tâches
export const getTasks = (): Task[] => tasks;

// Supprimer une tâche
export const deleteTask = (id: string): boolean => {
  const index = tasks.findIndex(task => task.id === id);
  if (index !== -1) {
    tasks.splice(index, 1);
    return true;
  }
  return false;
};

// Basculer le statut d'une tâche
export const toggleTaskStatus = (id: string): Task | null => {
  const task = tasks.find(t => t.id === id);
  if (!task) return null;
  task.status = task.status === "pending" ? "done" : "pending";
  return task;
};
