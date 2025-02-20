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
const assetImageSchema = object().shape({
  imageId: string(),
  alt: string(),
});

const assetFileSchema = object().shape({
  fileId: string(),
  name: string(),
  fileName: string(),
  size: number(),
});

export const assetSchemaStep1 = object({
  name: string().required("Asset name is required"),
  description: string().required("Asset description is required"),
  price: number().required("Asset price is required"),
  currencyId: string().required("Asset currency is required"),
  licenseId: string().required("Asset license are required"),
});

export const assetSchemaStep2 = object({
  images: array()
    .of(assetImageSchema)
    .min(1, "At least one image is required")
    .required("Asset images are required"),
  files: array()
    .of(assetFileSchema)
    .min(1, "At least one file is required")
    .required("Asset files are required"),
  thumbnailId: string().required("Asset thumbnail is required"),
});

export const assetSchemaStep3 = object({
  tags: array().of(object({ tagId: string(), name: string() })),
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
  fileName: string().required("File name is required"),
});

// images
export const imageSchema = object().shape({
  image: mixed().required("Image is required"),
  alt: string(),
});

// tags
export const tagSchema = object().shape({
  name: string().required("Tag name is required"),
});

// studio
export const studioSchema = object({
  logo: mixed().required("Studio logo is required"),
  name: string().required("Studio name is required"),
  slug: string().required("Studio slug is required"),
});

// studio about
export const studioAboutSchema = object({
  about: string().required("Studio about is required"),
  contactEmail: string().email().required("Studio contact email is required"),
});
