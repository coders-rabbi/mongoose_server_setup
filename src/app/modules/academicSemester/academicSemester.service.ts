import { adacdemicSemesterNameCodeMapper } from "./academicSemester.const.js";
import type { TAcademicSemester } from "./academicSemester.interface.js";
import { AcademicSemester } from "./academicSemester.model.js";

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  
  if (adacdemicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error("Invalid Semester Code");
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
};
