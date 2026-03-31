import { model, Schema } from "mongoose";
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from "./academicSemester.const.js";
import type { TAcademicSemester } from "./academicSemester.interface.js";
import AppError from "../../errors/appError.js";
import status from "http-status";

const AcademicSemesterSchema = new Schema<TAcademicSemester>({
  name: { type: String, required: true, enum: AcademicSemesterName },
  year: { type: String, required: true },
  code: { type: String, required: true, enum: AcademicSemesterCode },
  startMonth: { type: String, required: true, enum: Months },
  endMonth: { type: String, required: true, enum: Months },
});

AcademicSemesterSchema.pre("save", async function (next) {
  const isSemesterExists = await AcademicSemester.findOne({
    year: this.year,
    name: this.name,
  });
  if (isSemesterExists) {
    throw new AppError(status.CONFLICT, "This Semester Already Exist", "");
  }
});

export const AcademicSemester = model<TAcademicSemester>(
  "AcademicSemester",
  AcademicSemesterSchema,
);
