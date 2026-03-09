import type { Teacher } from "./teacher.interface.js";
import { TeacherModel } from "./teacher.model.js";

const createTeacherIntoDB = async (teacher: Teacher) => {
  const result = await TeacherModel.create(teacher);
  return result;
};

const getAllTeachersFromDB = async () => {
  const result = await TeacherModel.find();
  return result;
};

const getSingleTeacherFromBD = async (teacherId: string) => {
  const result = await TeacherModel.findOne({ teacherId });
  return result;
};

export const TeacherService = {
  createTeacherIntoDB,
  getAllTeachersFromDB,
  getSingleTeacherFromBD,
};
