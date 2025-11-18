import { z } from "zod";

/**
 * Create User
 * All required fields for new user
 */
export const CreateUserSchema = z.object({
  email: z.string().email("Invalid email address"),
  password_digest: z.string().min(6, "Password must be at least 6 characters"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  primary_phone: z.string().min(10, "Invalid phone number"),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  country_code: z.string().optional().nullable(),
});

/**
 * Update User
 * All fields optional (PATCH semantics)
 */
export const UpdateUserSchema = z.object({
  email: z.string().email("Invalid email address").optional(),
  password_digest: z.string().min(6, "Password must be at least 6 characters").optional(),
  username: z.string().min(3, "Username must be at least 3 characters").optional(),
  primary_phone: z.string().min(10, "Invalid phone number").optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  country_code: z.string().optional(),
  status: z.union([z.string(), z.number()]).optional(),
});

/**
 * Login User
 */
export const LoginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

/**
 * Change Password
 */
export const ChangePasswordSchema = z.object({
  old_password: z.string().min(6),
  new_password: z.string().min(6),
});

/**
 * Reset Password
 */
export const ResetPasswordSchema = z.object({
  token: z.string(),
  new_password: z.string().min(6),
});

/**
 * Types inferred automatically
 */
export type CreateUserInput = z.infer<typeof CreateUserSchema>;
export type UpdateUserInput = z.infer<typeof UpdateUserSchema>;
export type LoginUserInput = z.infer<typeof LoginUserSchema>;
export type ChangePasswordInput = z.infer<typeof ChangePasswordSchema>;
export type ResetPasswordInput = z.infer<typeof ResetPasswordSchema>;
