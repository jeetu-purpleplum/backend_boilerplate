// src/schemas/user.schema.ts
import { z } from "zod";

export const createUserSchema = z.object({
  body: z.object({
    name: z
      .string({ error: "Name is Required" })
      .min(3, "Name must be at least 3 characters"),
    email: z
      .email("Invalid email format"),
    password: z
      .string({ error: "Password is required" })
      .min(6, "Password must be at least 6 characters long"),
  }),
});

export const updateUserSchema = z.object({
  params: z.object({
    id: z.string({ error: "User ID is required" }),
  }),
  body: z.object({
    name: z.string().optional(),
    email: z.email("Invalid Email format").optional(),
  }),
});

// 👇 You can also export the inferred TypeScript types
export type CreateUserInput = z.infer<typeof createUserSchema>["body"];
export type UpdateUserInput = z.infer<typeof updateUserSchema>["body"];
