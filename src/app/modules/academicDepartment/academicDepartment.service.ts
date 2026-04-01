import type { TAcademicDepartment } from "./academicDepartment.interface.js";
import { AcademicDepartment } from "./academicDepartment.model.js";

const createAcademicDepartmentIntoBD = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload);
  return result;
};

const getAllAcademicDepartmentFromDB = async () => {
  const result = AcademicDepartment.find().populate("academicFaculty");
  return result;
};

const getSingleAcademicDepartmentFromBD = async (id: string) => {
  const result = AcademicDepartment.findOne({
    _id: id,
  });
  return result;
};

const updateAcademicDepartmentIntoBD = async (
  id: string,
  payload: Partial<TAcademicDepartment>,
) => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    { returnDocument: "after" },
  );
  return result;
};

export const AcademicDepartmentServices = {
  createAcademicDepartmentIntoBD,
  getAllAcademicDepartmentFromDB,
  getSingleAcademicDepartmentFromBD,
  updateAcademicDepartmentIntoBD,
};
