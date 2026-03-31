import type { Model, Types } from "mongoose";

export type TUserName = {
  first_name: string;
  middle_name?: string;
  last_name: string;
};

export type TGuardian = {
  father_name: string;
  father_occupation: string;
  father_contact_no: string;
  mother_name: string;
  mother_occupation: string;
  mother_contact_no: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contact_no: string;
  address: string;
};

export type TStudent = {
  id: string;
  user: Types.ObjectId;
  name: TUserName;
  gender: "male" | "female";
  date_of_birth: string;
  phone: string;
  emergency_contact: string;
  email: string;
  age: number;
  blood_group?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  present_address: string;
  permanent_address: string;
  guardian: TGuardian;
  local_guardian: TLocalGuardian;
  academicSemester: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  profile_image?: string;
};

export type StudentMethods = {
  isUserExist(id: string): Promise<TStudent | null>;
};

export type StudentModelType = Model<TStudent, {}, StudentMethods>;
