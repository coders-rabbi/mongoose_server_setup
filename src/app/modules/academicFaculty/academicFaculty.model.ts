import { model, Schema } from "mongoose";
import type { TAcademicFaculty } from "./academicFaculty.interface.js";

const AcademicFacultySchema = new Schema<TAcademicFaculty>(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const AcademicFaculty = model<TAcademicFaculty>(
  "AcademicFaculty",
  AcademicFacultySchema,
);
