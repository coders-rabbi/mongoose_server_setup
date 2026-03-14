import config from "../../config/index.js";
import type { TStudent } from "../student/student.interface.js";
import { Student } from "../student/student.model.js";
import type { TUser } from "./user.interface.js";
import { User } from "./user.model.js";

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  //create a user object
  const userData: Partial<TUser> = {};
  //manually id set
  userData.id = "2030010002";

  //if password is not given, use default password
  userData.password = password || (config.default_pass as string);

  //set student role;
  userData.role = "student";

  //create a user
  const newUser = await User.create(userData);

  //create a student
  if (Object.keys(newUser).length) {
    studentData.id = newUser.id;
    studentData.user = newUser._id; //reference _id

    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
