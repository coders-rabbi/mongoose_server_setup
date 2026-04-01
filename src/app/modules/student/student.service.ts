import mongoose from "mongoose";
import type { TStudent } from "./student.interface.js";
import { Student } from "./student.model.js";
import AppError from "../../errors/appError.js";
import status from "http-status";
import { User } from "../user/user.model.js";

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

const getAllStudentsFromDB = async () => {
  const result = await Student.find().populate("user");
  return result;
};

const getSingleStudentsFromDB = async (id: string) => {
  const result = await Student.findOne({ id })
    .populate("user")
    .populate("academicSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { returnDocument: "after", session },
    );

    if (!deletedStudent) {
      throw new AppError(status.BAD_REQUEST, "Failed to delete student", "");
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { returnDocument: "after", session },
    );

    if (!deletedUser) {
      throw new AppError(status.BAD_REQUEST, "Failed to delete user", "");
    }
    await session.commitTransaction();
    return deletedStudent;
  } catch (error) {
    await session.abortTransaction();
  } finally {
    await session.endSession();
  }
};

export const StudentService = {
  // createStudentIntoBD,
  getAllStudentsFromDB,
  getSingleStudentsFromDB,
  deleteStudentFromDB,
};
