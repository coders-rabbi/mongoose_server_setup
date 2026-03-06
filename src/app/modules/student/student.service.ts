import type { Student } from "./student.interface.js";
import { StudentModel } from "./student.model.js";

const createStudentIntoBD = async (student: Student) => {
  const result = await StudentModel.create(student);
  return result;
};

const getAllStudentsFromBD = async () => {
  const result = await StudentModel.find();
  return result;
};

const getSingleStudentsFromBD = async (id: string) => {
  const result = await StudentModel.findOne({ id });
  return result;
};

export const StudentService = {
  createStudentIntoBD,
  getAllStudentsFromBD,
  getSingleStudentsFromBD,
};
