import type { TAcademicDepartment } from "./academicDepartment.interface.js";
import { AcademicDepartment } from "./academicDepartment.model.js";

const createAcademicDepartmentIntoBD = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload);
  return result;
};

const getAllAcademicDeparmentFromDB = async () => {
  const result = AcademicDepartment.find();
  return result;
};

const getSingleAcademicDepartmentFromBD = async (id: string) => {
  const result = AcademicDepartment.findOne({
    _id: id,
  });
  return result;
};

export const AcademicDeparmentServices = {
  createAcademicDepartmentIntoBD,
  getAllAcademicDeparmentFromDB,
  getSingleAcademicDepartmentFromBD,
};
