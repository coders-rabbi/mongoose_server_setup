import type { TAcademicSemester } from "../academicSemester/academicSemester.interface.js";
import { User } from "./user.model.js";

const finalLastStudentId = async () => {
  const lastSutdent = await User.findOne(
    {
      role: "student",
    },
    {
      id: 1,
      _id: 0,
    },
  ).sort({
    createdAt: -1
  }).lean();
  return lastSutdent?.id ? lastSutdent.id.substring(6) : undefined;
};
export const generateStudentId = async (payload: TAcademicSemester) => {
  const currentID = (await finalLastStudentId()) || (0).toString();

  let incrementaId = (Number(currentID) + 1).toString().padStart(4, "0");

  const finalId = `${payload.year}${payload.code}${incrementaId}`;
  return finalId;
};
