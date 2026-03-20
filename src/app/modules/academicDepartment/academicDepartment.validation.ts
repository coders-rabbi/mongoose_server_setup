import { z } from "zod";

const createAcademicDepartmentValidationSchema = z.object({
  department: z.object({
    name: z.string({
      message: "Academic Deparment is required",
    }),
    academicFaculty: z.string({
      message: "Academic Deparment is required",
    }),
  }),
});

const updateAcademicDepartmentValidationSchema = z.object({
  department: z.object({
    name: z.string().optional(),
    academicFaculty: z.string(),
  }),
});

export const AcademicDepartmentValidations = {
  createAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
};
