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

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, local_guardian, ...remainingData } = payload; // student এর name, guardian, local_guardian আলাদা করে destructure করা হলো কারণ এগুলো update করার জন্য আলাদা logic লাগবে। কারণ এগুলো non-primitive data/nested object, তাই এগুলো update করার জন্য আলাদা logic লাগবে। বাকি data গুলো একসাথে update করা যাবে।

  const modifiedData: Record<string, unknown> = { ...remainingData };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [keys, value] of Object.entries(guardian)) {
      modifiedData[`guardian.${keys}`] = value;
    }
  }

  if (local_guardian && Object.keys(local_guardian).length) {
    for (const [keys, value] of Object.entries(local_guardian)) {
      modifiedData[`local_guardian.${keys}`] = value;
    }
  }

  const result = await Student.findOneAndUpdate({ id }, modifiedData, {
    returnDocument: "after",
    runValidators: true,
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
    throw new AppError(
      status.BAD_REQUEST,
      "Failed to delete student and user",
      "",
    );
  } finally {
    await session.endSession();
  }
};

export const StudentService = {
  // createStudentIntoBD,
  getAllStudentsFromDB,
  getSingleStudentsFromDB,
  deleteStudentFromDB,
  updateStudentIntoDB,
};
