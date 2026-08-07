import * as yup from "yup";

export const schema = yup.object({
  name: yup.string().required("Name is required"),
  
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required"),

  age: yup
    .number()
    .typeError("Age must be a number")
    .min(18, "Must be 18+")
    .required("Age is required"),

  password: yup
    .string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
});