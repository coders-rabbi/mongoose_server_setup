import type { TAcademicSemester } from "./academicSemester.interface.js";
import { AcademicSemester } from "./academicSemester.model.js";

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  const result = await AcademicSemester.create(payload);
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
};
