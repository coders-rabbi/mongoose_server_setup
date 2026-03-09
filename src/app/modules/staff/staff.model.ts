import { model, Schema } from "mongoose";
import {
  type Staff,
  type StaffContactInfo,
  type StaffName,
} from "./staff.interface.js";

const StaffNameSchema = new Schema<StaffName>({
  firstName: { type: String, required: true },
  middleName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const StaffContactInfoSchema = new Schema<StaffContactInfo>({
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true }, 
  emergencyContact: { type: String, required: true },
  currentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
});

const StaffSchema = new Schema({
  staffId: { type: String, required: true, unique: true },
  name: { type: StaffNameSchema, required: true },
  role: {
    type: String,
    enum: ["admin", "accountant", "librarian", "security", "cleaner", "driver"],
    required: true,
  },
  designation: { type: String, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  date_of_birth: { type: Date, required: true },
  contactInfo: { type: StaffContactInfoSchema, required: true },
  joining_date: { type: Date, required: true },
  salary: { type: Number, required: true },
  shift: { type: String, enum: ["Morning", "Day", "Night"], required: true },
  work_status: {
    type: String,
    enum: ["full-time", "part-time", "contractual"],
    required: true,
  },
  status: { type: String, enum: ["active", "inactive"], required: true },
});

export const StaffModel = model<Staff>("Staff", StaffSchema);
