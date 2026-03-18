import type { TAcademicSemester } from "../academicSemester/academicSemester.interface.js";
import { User } from "./user.model.js";

const finalLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: "student",
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastStudent?.id ? lastStudent.id : undefined;
};
export const generateStudentId = async (payload: TAcademicSemester) => {
  let currentId = "0000";

  const lastStudentId = await finalLastStudentId();
  const lastStudentYear = lastStudentId?.substring(0, 4);
  const lastStudentCode = lastStudentId?.substring(4, 6);

  if (lastStudentId && lastStudentYear === payload.year && lastStudentCode === payload.code
      
  ) {
    currentId = lastStudentId?.substring(6);
  }

  let incrementaId = (Number(currentId) + 1).toString().padStart(4, "0");

  const finalId = `${payload.year}${payload.code}${incrementaId}`;
  return finalId;
};
