import { model, Schema } from "mongoose";
import {
  type AdminModel,
  type TAdmin,
  type TAdminContactInfo,
  type TAdminName,
} from "./admin.interface.js";
import bcrypt from "bcrypt";
import config from "../../config/index.js";

const AdminNameSchema = new Schema<TAdminName>({
  firstName: { type: String, required: true },
  middleName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const AdminContactInfoSchema = new Schema<TAdminContactInfo>({
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  emergencyContact: { type: String, required: true },
  currentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
});

const AdminSchema = new Schema<TAdmin, AdminModel>(
  {
    adminId: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    name: { type: AdminNameSchema, required: true },
    role: {
      type: String,
      enum: [
        "admin",
        "accountant",
        "librarian",
        "security",
        "cleaner",
        "driver",
      ],
      required: true,
    },
    designation: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    date_of_birth: { type: Date, required: true },
    contactInfo: { type: AdminContactInfoSchema, required: true },
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
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

//vitual
AdminSchema.virtual("fullName").get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

// password hashing using bcrypt library
AdminSchema.pre("save", async function () {
  const staffInfo = this;
  staffInfo.password = await bcrypt.hash(
    staffInfo.password,
    Number(config.bycritp_salt_round),
  );
});

AdminSchema.post("save", async function (doc) {
  doc.password = "";
});

AdminSchema.pre("find", async function (this: any) {
  this.find({ isdeleted: { $ne: true } });
});

AdminSchema.pre("findOne", async function (this: any) {
  this.find({ isdeleted: { $ne: true } });
});

AdminSchema.pre("aggregate", function (this: any) {
  this.pipeline().unshift({ $match: { isdeleted: { $ne: true } } });
});

AdminSchema.statics.isAdminExist = async function (adminId: string) {
  const existingAdmin = await Admin.findOne({ adminId });
  return existingAdmin;
};

export const Admin = model<TAdmin, AdminModel>("Admin", AdminSchema);
