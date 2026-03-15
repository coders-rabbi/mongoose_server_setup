import z from "zod";
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from "./academicSemester.const.js";

const createAcademicSemesterValidationSchema = z.object({
  AcademicSemester: z.object({
    name: z.enum([...AcademicSemesterName]),
    year: z.date(),
    code: z.enum([...AcademicSemesterCode]),
    startMonth: z.enum([...Months]),
    endMonth: z.enum([...Months]),
  }),
});

export const academicSemesterValidations = {
  createAcademicSemesterValidationSchema,
};
