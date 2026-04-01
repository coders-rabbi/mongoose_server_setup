import { Schema, model } from "mongoose";
import validator from "validator";
import type {
  StudentMethods,
  StudentModelType,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from "./student.interface.js";

const userNameSchema = new Schema<TUserName>({
  first_name: {
    type: String,
    trim: true, // unnecessary space will be removed from the beginning and end of the string
    required: [true, "First name is required"],
    maxLength: [20, "First name cannot exceed 20 characters"],
    minLength: [3, "First name must be at least 3 characters long"],
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      message: "{VALUE} is not in capitalized format",
    },
  },
  middle_name: {
    type: String,
    trim: true,
    required: [true, "Middle name is required"],
    maxLength: [20, "Middle name cannot exceed 20 characters"],
    minLength: [3, "Middle name must be at least 3 characters long"],
  },
  last_name: {
    type: String,
    trim: true, // unnecessary space will be removed from the beginning and end of the string
    required: [true, "Last name is required"],
    maxLength: [20, "Last name cannot exceed 20 characters"],
    minLength: [3, "Last name must be at least 3 characters long"],
    validate: {
      validator: function (value: string) {
        const lastNameStr = validator.isAlpha(value, "en-US"); // allow spaces in the name
        return lastNameStr;
      },
      message: "{VALUE} is not a valid last name",
    },
  },
});

const guardianSchema = new Schema<TGuardian>({
  father_name: {
    type: String,
    required: [true, "Father's name is required"],
    trim: true, // unnecessary space will be removed from the beginning and end of the string
    maxLength: [50, "Father's name cannot exceed 50 characters"],
  },
  father_occupation: {
    type: String,
    required: [true, "Father's occupation is required"],
  },
  father_contact_no: {
    type: String,
    required: [true, "Father's contact number is required"],
  },
  mother_name: { type: String, required: [true, "Mother's name is required"] },
  mother_occupation: {
    type: String,
    required: [true, "Mother's occupation is required"],
  },
  mother_contact_no: {
    type: String,
    required: [true, "Mother's contact number is required"],
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: [true, "Local guardian name is required"] },
  occupation: {
    type: String,
    required: [true, "Local guardian occupation is required"],
  },
  contact_no: {
    type: String,
    required: [true, "Local guardian contact number is required"],
  },
});

const studentSchema = new Schema<TStudent, StudentModelType, StudentMethods>({
  id: {
    type: String,
    required: [true, "Student ID is required"],
    unique: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  name: {
    type: userNameSchema,
    required: [true, "Student name details are required"],
  },
  gender: {
    type: String,
    enum: {
      values: ["male", "female", "other"],
      message: "{VALUE} is not a valid gender",
    },
    required: [true, "Gender is required"],
  },
  date_of_birth: {
    type: String,
    required: [true, "Date of birth is required"],
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    maxLength: [15, "Phone number cannot exceed 15 digits"],
  },
  emergency_contact: {
    type: String,
    required: [true, "Emergency contact is required"],
    maxLength: [15, "Emergency contact number cannot exceed 15 digits"],
  },
  email: {
    type: String,
    required: [true, "Email address is required"],
    unique: true,
    validate: {
      validator: function (value: string) {
        const validEmail = validator.isEmail(value);
        return validEmail;
      },
      message: "{VALUE} is not a valid email address",
    },
  },
  age: { type: Number, required: [true, "Age is required"] },
  blood_group: {
    type: String,
    enum: {
      values: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      message: "{VALUE} is not a valid blood group",
    },
    required: [true, "Blood group is required"],
  },
  present_address: {
    type: String,
    required: [true, "Present address is required"],
  },
  permanent_address: {
    type: String,
    required: [true, "Permanent address is required"],
  },
  guardian: {
    type: guardianSchema,
    required: [true, "Guardian details are required"],
  },
  local_guardian: {
    type: localGuardianSchema,
    required: [true, "Local guardian details are required"],
  },
  academicSemester: {
    type: Schema.Types.ObjectId,
    ref: "AcademicSemester",
    required: true,
  },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    ref: "AcademicDepartment",
    required: true,
  },
  profile_image: { type: String },
  isDeleted: { type: Boolean, default: false },
});

studentSchema.methods.isUserExist = async function (id: string) {
  const user = await Student.findOne(
    { id },
    { id: 1, email: 1, name: 1, isActive: 1 },
  );
  return user;
};

export const Student = model<TStudent, StudentModelType>(
  "Student",
  studentSchema,
);
