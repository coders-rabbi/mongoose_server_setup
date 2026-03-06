import { Schema, model } from "mongoose";
import type { Guardian, LocalGuardian, Student, UserName } from "./student.interface.js";

const userNameSchema = new Schema<UserName>({
  first_name: { type: String, required: true },
  middle_name: { type: String },
  last_name: { type: String, required: true },
});

const guardianSchema = new Schema<Guardian>({
  father_name: { type: String, required: true },
  father_occupation: { type: String, required: true },
  father_contact_no: { type: String, required: true },
  mother_name: { type: String, required: true },
  mother_occupation: { type: String, required: true },
  mother_contact_no: { type: String, required: true },
});

const localGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contact_no: { type: String, required: true },
});

const studentSchema = new Schema<Student>({
  id: { type: String, required: true },
  name: userNameSchema,
  gender: { type: String, enum: ["male", "female"], required: true },
  date_of_birth: { type: String, required: true },
  phone: { type: String, required: true },
  emergency_contact: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, required: true },
  blood_group: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    required: true,
  },
  present_address: { type: String, required: true },
  permanent_address: { type: String, required: true },
  guardian: guardianSchema,
  local_guardian: localGuardianSchema,
  profile_image: { type: String },
  isActive: { type: String, enum: ["active", "blocked"], required: true },
});

export const StudentModel = model<Student>("Student", studentSchema);
