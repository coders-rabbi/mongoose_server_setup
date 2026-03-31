import type { TStudent } from "./student.interface.js";
import { Student } from "./student.model.js";

// const createStudentIntoBD = async (studentData: TStudent) => {
//   // bulid in static method of mongoose to create a document into database
//   // const result = await Student.create(studentData);

//   // create an instance method of student model and then save it into database
//   // const student = new Student(studentData);

//   if (await student.isUserExist(studentData.id)) {
//     throw new Error("Student already exists");
//   }

//   const result = await student.save();
//   return result;
// };

const getAllStudentsFromBD = async () => {
  const result = await Student.find().populate("user");
  return result;
};

const getSingleStudentsFromBD = async (id: string) => {
  const result = await Student.findOne({ id }).populate("user");
  return result;
};


export const StudentService = {
  // createStudentIntoBD,
  getAllStudentsFromBD,
  getSingleStudentsFromBD,
};
