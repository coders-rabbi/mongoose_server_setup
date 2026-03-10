import { z } from "zod";

const createStaffZodSchema = z.object({
  staff: z.object({
    staffId: z.string().min(1, "Staff ID is required"),
    password: z.string().max(20, "password maximum 20 character"),
    name: z.object({
      firstName: z.string().min(1, "First name is required"),
      middleName: z.string().min(1, "Middle name is required"),
      lastName: z.string().min(1, "Last name is required"),
    }),
    role: z.enum([
      "admin",
      "accountant",
      "librarian",
      "security",
      "cleaner",
      "driver",
    ]),
    designation: z.string().min(1, "Designation is required"),
    gender: z.enum(["Male", "Female", "Other"]),
    date_of_birth: z.coerce.date(), // এটি ISO স্ট্রিংকে সরাসরি Date অবজেক্টে রূপান্তর করবে
    contactInfo: z.object({
      email: z.string().email("Invalid email address"),
      phoneNumber: z.string().min(1, "Phone number is required"),
      emergencyContact: z.string().min(1, "Emergency contact is required"),
      currentAddress: z.string().min(1, "Current address is required"),
      permanentAddress: z.string().min(1, "Permanent address is required"),
    }),
    joining_date: z.coerce.date(),
    salary: z.number().positive("Salary must be a positive number"),
    shift: z.enum(["Morning", "Day", "Night"]),
    work_status: z.enum(["full-time", "part-time", "contractual"]),
    status: z.enum(["active", "inactive"]),
    isdeleted: z.boolean(),
  }),
});

export const StaffValidation = {
  createStaffZodSchema,
};
