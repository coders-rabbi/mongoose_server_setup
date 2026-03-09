import { model, Schema } from "mongoose";
import {
  type StaffModel,
  type TStaff,
  type TStaffContactInfo,
  type TStaffName,
} from "./staff.interface.js";
import bcrypt from "bcrypt";
import config from "../../config/index.js";

const StaffNameSchema = new Schema<TStaffName>({
  firstName: { type: String, required: true },
  middleName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const StaffContactInfoSchema = new Schema<TStaffContactInfo>({
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  emergencyContact: { type: String, required: true },
  currentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
});

const StaffSchema = new Schema<TStaff, StaffModel>({
  staffId: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
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
  isdeleted: { type: Boolean, default: false },
});

//password hashing using bycript library
// StaffSchema.pre("save", async function (next) {
//   const staffInfo = this;
//   staffInfo.password = await bcrypt.hash(
//     staffInfo.password,
//     Number(config.bycritp_salt_round),
//   );
//   next();
// });

// password hashing using bcrypt library
StaffSchema.pre("save", async function () {
  const staffInfo = this;
  staffInfo.password = await bcrypt.hash(
    staffInfo.password,
    Number(config.bycritp_salt_round),
  );
});

StaffSchema.post("save", async function (doc) {
  doc.password = "";
});

StaffSchema.pre("find", async function (this: any) {
  this.find({ isdeleted: { $ne: true } });
});

StaffSchema.statics.isStaffExists = async function (staffId: string) {
  const exsistingStaff = await Staff.findOne({ staffId });
  return exsistingStaff;
};

export const Staff = model<TStaff, StaffModel>("Staff", StaffSchema);
