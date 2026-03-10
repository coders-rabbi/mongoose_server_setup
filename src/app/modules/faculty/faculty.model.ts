import { model, Schema } from "mongoose";
import type {
  TeacherName,
  Teacher,
  TeacherContactInfo,
} from "./faculty.interface.js";

const teacherNameSchema = new Schema<TeacherName>({
  firstName: { type: String, required: true, trim: true },
  middleName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
});

const teacherContactInfoSchema = new Schema<TeacherContactInfo>({
  email: { type: String, required: true , unique: true},
  phone: { type: String, required: true, trim: true },
  currentAddress: { type: String, trim: true },
  permanentAddress: { type: String, trim: true },
});

const TeacherSchema = new Schema<Teacher>({
  teacherId: { type: String, unique: true, required: true },
  Name: { type: teacherNameSchema, required: true },
  designation: { type: String, required: true },
  department: { type: String },
  gender: { type: String, required: true },
  date_of_birth: { type: Date, required: true },
  contactInfo: { type: teacherContactInfoSchema, required: true },
  qualification: { type: String },
  joining_date: { type: Date },
  experience: { type: Number },
  specialization: { type: String },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
});

export const TeacherModel = model<Teacher>("Teacher", TeacherSchema);
