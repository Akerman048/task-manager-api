import { z } from "zod";

export const userRegisterSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().email(),
  password: z.string().min(6, "Password is too short"),
});

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password is too short"),
});
