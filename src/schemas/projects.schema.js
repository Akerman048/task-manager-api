import { z } from "zod";

export const createProjectSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(255),
  description: z.string().optional(),
});

export const updateProjectSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(255).optional(),

  description: z.string().optional(),
});
