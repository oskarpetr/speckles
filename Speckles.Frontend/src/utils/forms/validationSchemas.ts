import { array, mixed, number, object, ref, string } from "yup";

// passwords
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

// assets
const imageSchema = object().shape({
  imageId: string(),
  alt: string(),
  base64: string(),
});

const assetFileSchema = object().shape({
  fileId: string(),
  name: string(),
  fileName: string(),
  size: number(),
  base64: string(),
});

export const assetSchemaStep1 = object({
  name: string().required("Asset name is required"),
  description: string().required("Asset description is required"),
  price: number().required("Asset price is required"),
  currencyId: string().required("Asset currency is required"),
  licenseId: string().required("Asset license are required"),
  tags: array().of(string()),
  customTags: array().of(string()),
});

export const assetSchemaStep2 = object({
  images: array().of(imageSchema).required("Asset images are required"),
  files: array().of(assetFileSchema).required("Asset files are required"),
  thumbnail: imageSchema.required("Asset thumbnail is required"),
});

// register
export const registerSchemaStep1 = object({
  fullName: string().required("Full name is required"),
  email: string()
    .email("Email address must be in a valid format")
    .required("Email address is required"),
});

export const registerSchemaStep2 = object({
  username: string().required("Username is required"),
  password: passwordSchema.required("Password is required"),
  confirmPassword: string()
    .oneOf([ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export const registerSchemaStep3 = object({
  country: string().required("Country is required"),
  state: string().required("State is required"),
  street: string().required("Street is required"),
  city: string().required("City is required"),
  zip: string().required("ZIP is required"),
});

// files
export const fileSchema = object().shape({
  file: mixed().required("File is required"),
  name: string().required("File name is required"),
  description: string().required("File description is required"),
});
