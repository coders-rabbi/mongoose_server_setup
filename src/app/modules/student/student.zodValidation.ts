import { z } from "zod";

// Sub-schema for UserName
const userNameValidationSchema = z.object({
  first_name: z
    .string()
    .trim()
    .min(3, { message: "First name must be at least 3 characters long" })
    .max(20, { message: "First name cannot exceed 20 characters" })
    .refine(
      (value) => value.charAt(0).toUpperCase() + value.slice(1) === value,
      {
        message: "First name must be in capitalized format",
      },
    ),
  middle_name: z
    .string()
    .trim()
    .min(3, { message: "Middle name must be at least 3 characters long" })
    .max(20, { message: "Middle name cannot exceed 20 characters" }),
  last_name: z
    .string()
    .trim()
    .min(3, { message: "Last name must be at least 3 characters long" })
    .max(20, { message: "Last name cannot exceed 20 characters" })
    // Basic regex for alphabet-only validation
    .refine((value) => /^[A-Za-z]+$/.test(value), {
      message: "Last name is not a valid last name (alphabets only)",
    }),
});

// Sub-schema for Guardian
const guardianValidationSchema = z.object({
  father_name: z.string().trim().max(50),
  father_occupation: z.string().nonempty("Father's occupation is required"),
  father_contact_no: z.string().nonempty("Father's contact number is required"),
  mother_name: z.string().nonempty("Mother's name is required"),
  mother_occupation: z.string().nonempty("Mother's occupation is required"),
  mother_contact_no: z.string().nonempty("Mother's contact number is required"),
});

// Sub-schema for Local Guardian
const localGuardianValidationSchema = z.object({
  name: z.string().nonempty("Local guardian name is required"),
  occupation: z.string().nonempty("Local guardian occupation is required"),
  contact_no: z.string().nonempty("Local guardian contact number is required"),
});

// Main Student Validation Schema
export const createStudentValidationSchema = z.object({
  student: z.object({
    name: userNameValidationSchema,
    gender: z.enum(["male", "female", "other"]),
    date_of_birth: z.string().nonempty("Date of birth is required"),
    phone: z.string().max(15, "Phone number cannot exceed 15 digits"),
    emergency_contact: z
      .string()
      .max(15, "Emergency contact cannot exceed 15 digits"),
    email: z.string().email("Invalid email address"),
    age: z.number().positive("Age must be a positive number"),
    blood_group: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
    present_address: z.string().nonempty("Present address is required"),
    permanent_address: z.string().nonempty("Permanent address is required"),
    guardian: guardianValidationSchema,
    local_guardian: localGuardianValidationSchema,
    profile_image: z.string().optional(),
  }),
});

export const StudentDataValidation = {
  createStudentValidationSchema,
};
