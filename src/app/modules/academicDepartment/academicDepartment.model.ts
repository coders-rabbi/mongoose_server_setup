import { model, Schema } from "mongoose";
import type { TAcademicDepartment } from "./academicDepartment.interface.js";

export const academicDepartmentSchema = new Schema<TAcademicDepartment>({
  name: { type: String, required: true },
  academicFaculty: { type: Schema.Types.ObjectId,
    ref: "AcademicFaculty",
    required: true },
});


academicDepartmentSchema.pre("save", async function (next) {
  
});


export const AcademicDepartment = model<TAcademicDepartment>(
  "AcademicDepartment",
  academicDepartmentSchema,
);
