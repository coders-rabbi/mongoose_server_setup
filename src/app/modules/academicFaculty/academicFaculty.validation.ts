import z from "zod";

const createAcademicFacultValidationSchema = z.object({
  Faculty: z.object({
    name: z.string({
      message: "Academic Faculty Must be string",
    }),
  }),
});
const updateAcademicFacultValidationSchema = z.object({
  Faculty: z.object({
    name: z.string({
      message: "Academic Faculty Must be string",
    }),
  }),
});

export const AcademicFacultyValidations = {
  createAcademicFacultValidationSchema,
  updateAcademicFacultValidationSchema,
};
