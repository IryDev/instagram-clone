import { checkEmailExists, checkUsernameExists } from "@/lib/appwrite/api";
import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
});

// Schéma Zod de base

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, "Create a password at least 6 characters long."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const signupSchema = z.object({
  email: z
    .string()
    .email("Enter a valid email address.")
    .refine(
      async (email) => {
        try {
          const exists = await checkEmailExists(email);
          return !exists; // Return true if email is available (doesn't exist)
        } catch {
          return false; // Return false if there's an error checking
        }
      },
      {
        message: "Another account is using the same email.",
      }
    ),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long.")
    .refine(
      async (username) => {
        try {
          const exists = await checkUsernameExists(username);
          return !exists; // Return true if username is available (doesn't exist)
        } catch {
          return false; // Return false if there's an error checking
        }
      },
      {
        message: "A user with that username already exists.",
      }
    ),
  password: z.string().min(6, "Create a password at least 6 characters long."),
  name: z.string().min(1, "This field is required."),
});
