import status from "http-status";
import AppError from "../../errors/appError.js";
import { adcademicSemesterNameCodeMapper } from "./academicSemester.const.js";
import type { TAcademicSemester } from "./academicSemester.interface.js";
import { AcademicSemester } from "./academicSemester.model.js";

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  if (adcademicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new AppError(status.BAD_REQUEST, "Invalid Semester Code", "");
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllAcademicSemestersFromDB = async () => {
  const result = await AcademicSemester.find();
  return result;
};

const getSingleSemesterFromDB = async (_id: string) => {
  const result = await AcademicSemester.findOne({
    _id: _id,
  });
  return result;
};

const updateSingleSemesterFromDB = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    adcademicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new AppError(status.BAD_REQUEST, "Invalid Semester Code", "");
  }

  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemestersFromDB,
  getSingleSemesterFromDB,
  updateSingleSemesterFromDB,
};
