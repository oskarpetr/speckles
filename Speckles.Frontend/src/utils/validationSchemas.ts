import { string } from "yup";

const commonPasswords = [
  "password",
  "123456",
  "12345678",
  "qwerty",
  "abc123",
  "password1",
];

export const passwordSchema = string()
  .min(12, "Password must be at least 12 characters")
  .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
  .matches(/[a-z]/, "Password must contain at least one lowercase letter")
  .matches(/[0-9]/, "Password must contain at least one number")
  .matches(/[@$!%*?&#]/, "Password must contain at least one special character")
  .notOneOf(commonPasswords, "This password is too common");
