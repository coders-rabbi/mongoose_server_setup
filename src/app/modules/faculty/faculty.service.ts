import type { Tteacher } from "./faculty.interface.js";
import { TeacherModel } from "./faculty.model.js";

const createTeacherIntoDB = async (teacher: Tteacher) => {
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
