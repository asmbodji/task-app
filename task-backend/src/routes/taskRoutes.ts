import express from "express";
import { getTasks, addTask, deleteTask } from "../services/taskService";
import { z } from "zod";

const router = express.Router();

const TaskSchema = z.object({
  title: z.string(),
  description: z.string(),
});

router.get("/", (req, res) => {
  res.json(getTasks());
});

router.post("/", (req, res) => {
  const parse = TaskSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const task = addTask(parse.data.title, parse.data.description);
  res.status(201).json(task);
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (deleteTask(id)) res.status(204).end();
  else res.status(404).json({ error: "Task not found" });
});

export default router;
