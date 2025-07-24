import express from "express";
import { z } from "zod";
import {
  getTasks,
  addTask,
  deleteTask,
  toggleTaskStatus,
} from "../services/taskService";

const router = express.Router();

const TaskSchema = z.object({
  title: z.string(),
  description: z.string(),
});

// GET /tasks
router.get("/", (req, res) => {
  res.json(getTasks());
});

// POST /tasks
router.post("/", (req, res) => {
  const parse = TaskSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const task = addTask(parse.data.title, parse.data.description);
  res.status(201).json(task);
});

// DELETE /tasks/:id
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  if (deleteTask(id)) res.status(204).end();
  else res.status(404).json({ error: "Tâche introuvable" });
});

// PATCH /tasks/:id (changer le statut)
router.patch("/:id", (req, res) => {
  const updated = toggleTaskStatus(req.params.id);
  if (!updated) {
    return res.status(404).json({ error: "Tâche introuvable" });
  }
  res.json(updated);
});

export default router;
