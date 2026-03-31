import { model, Schema } from "mongoose";
import type { TAcademicDepartment } from "./academicDepartment.interface.js";
import console from "console";

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


//query middleware to check if the department is exists before update
academicDepartmentSchema.pre("findOneAndUpdate", async function () {
  const query = this.getQuery();
  console.log("query", query._id);
  const isDepartmentExist = await AcademicDepartment.findOne({
    _id: query._id,
  });
  if (!isDepartmentExist) {
    throw new Error("Academic Department is not exists");
  }
});

export const AcademicDepartment = model<TAcademicDepartment>(
  "AcademicDepartment",
  academicDepartmentSchema,
);
