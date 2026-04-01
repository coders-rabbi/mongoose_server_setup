import status from "http-status";
import config from "../../config/index.js";
import AppError from "../../errors/appError.js";
import type { TAcademicSemester } from "../academicSemester/academicSemester.interface.js";
import { AcademicSemester } from "../academicSemester/academicSemester.model.js";
import type { TStudent } from "../student/student.interface.js";
import { Student } from "../student/student.model.js";
import type { TUser } from "./user.interface.js";
import { User } from "./user.model.js";
import { generateStudentId } from "./user.utils.js";
import mongoose from "mongoose";

// const createStudentIntoDB = async (password: string, payload: TStudent) => {
//   //create a user object
//   const userData: Partial<TUser> = {};
//   //if password is not given, use default password
//   userData.password = password || (config.default_pass as string);
//   //set student role;
//   userData.role = "student";

//   const admissionSemester = await AcademicSemester.findById(
//     payload.academicSemester,
//   );
//   if (!admissionSemester) {
//     throw new AppError(status.NOT_FOUND, "Academic semester not found!", "");
//   }

//   //set generatedId
//   userData.id = await generateStudentId(admissionSemester);
//   //create a user
//   const newUser = await User.create(userData);

//   //create a student
//   if (Object.keys(newUser).length) {
//     payload.id = newUser.id;
//     payload.user = newUser._id; //reference _id

//     const newStudent = await Student.create(payload);
//     return newStudent;
//   }
// };

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    //create a user object
    const userData: Partial<TUser> = {};
    //if password is not given, use default password
    userData.password = password || (config.default_pass as string);
    //set student role;
    userData.role = "student";

    const admissionSemester = await AcademicSemester.findById(
      payload.academicSemester,
    );
    if (!admissionSemester) {
      throw new AppError(status.NOT_FOUND, "Academic semester not found!", "");
    }

    //set generatedId
    userData.id = await generateStudentId(admissionSemester);
    //create a user
    const newUser = await User.create([userData], { session });

    //create a student
    if (!newUser[0]) {
      throw new AppError(status.BAD_REQUEST, "Failed to create user!", "");
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    //create a student transaction-2
    const newStudent = await Student.create([payload], { session });

    if (!newStudent.length) {
      throw new AppError(status.BAD_REQUEST, "Failed to create student!", "");
    }
    await session.commitTransaction();
    return newStudent;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
};

export const UserServices = {
  createStudentIntoDB,
};
