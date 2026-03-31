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

const createStudentIntoDB = async (password: string, payload: TStudent) => {
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
  const newUser = await User.create(userData);

  //create a student
  if (Object.keys(newUser).length) {
    payload.id = newUser.id;
    payload.user = newUser._id; //reference _id

    const newStudent = await Student.create(payload);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
