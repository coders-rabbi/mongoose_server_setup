import type { TAcademicFaculty } from "./academicFaculty.interface.js";
import { AcademicFaculty } from "./academicFaculty.model.js";

const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

const getAllAcademicFaculties = async () => {
  const result = await AcademicFaculty.find();
  return result;
};

const getSingleAcademicFaculty = async (id: string) => {
  const result = await AcademicFaculty.findOne({
    _id: id,
  });
  return result;
};

const updateAcademicFaculty = async (id: string, payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.findByIdAndUpdate(
    id,
    { $set: payload },
    {
      returnDocument: "after",
      runValidators: true,
    },
  );
  return result;
};

export const AcademicFacultyServices = {
  createAcademicFacultyIntoDB,
  getAllAcademicFaculties,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
};
