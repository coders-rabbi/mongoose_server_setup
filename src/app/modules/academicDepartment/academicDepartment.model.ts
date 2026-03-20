import { model, Schema } from "mongoose";
import type { TAcademicDepartment } from "./academicDepartment.interface.js";

export const academicDepartmentSchema = new Schema<TAcademicDepartment>({
  name: { type: String, required: true },
  academicFaculty: { type: Schema.Types.ObjectId, required: true },
});

export const AcademicDepartment = model<TAcademicDepartment>(
  "AcademicDepartment",
  academicDepartmentSchema,
);
