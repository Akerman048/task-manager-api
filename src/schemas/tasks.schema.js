import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().trim().min(1).max(255),
  description: z.string().optional(),
  status: z.enum(["todo", "in_progress", "done"]).optional(),
  due_date: z.string().date().optional(),
});

export const updateTaskSchema = createTaskSchema.partial();
