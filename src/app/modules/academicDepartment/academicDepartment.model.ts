import { model, Schema } from "mongoose";
import type { TAcademicDepartment } from "./academicDepartment.interface.js";

export const academicDepartmentSchema = new Schema<TAcademicDepartment>({
  name: { type: String, required: true },
  academicFaculty: {
    type: Schema.Types.ObjectId,
    ref: "AcademicFaculty",
    required: true,
  },
});

//pre save middleware to check if the department already exists
academicDepartmentSchema.pre("save", async function () {
  const isDepartmentExist = await AcademicDepartment.findOne({
    name: this.name,
  });
  if (isDepartmentExist) {
    throw new Error("Academic Department already exists");
  }
});

export const AcademicDepartment = model<TAcademicDepartment>(
  "AcademicDepartment",
  academicDepartmentSchema,
);
