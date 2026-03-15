import type { TAcademicSemester } from "./academicSemester.interface.js";
import { AcademicSemester } from "./academicSemester.model.js";

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  type TAcademicSemesterCodeMapper = {
    [key: string]: string;
  };

  const adacdemicSemesterNameCodeMapper: TAcademicSemesterCodeMapper = {
    Autumn: "01",
    Summar: "02",
    Fall: "03",
  };

  if (adacdemicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error("Invalid Semester Code");
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
};
