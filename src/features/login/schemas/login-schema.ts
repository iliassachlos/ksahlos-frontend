import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .min(2, "Username must be at least 2 characters")
    .max(100, "Username must be at most 100 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const loginDefaultValues: LoginSchema = {
  username: "",
  password: "",
};
