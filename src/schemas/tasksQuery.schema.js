import { z } from "zod";

export const tasksQuerySchema = z.object({
  status: z.enum(["todo", "in_progress", "done"]).optional(),
  search: z.string().trim().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  sortBy: z
    .enum(["created_at", "due_date", "title", "status"])
    .default("created_at"),
  order: z.enum(["asc", "desc"]).default("desc"),
});
