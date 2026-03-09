import type { Model } from "mongoose";

export type TStaffName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TStaffContactInfo = {
  email: string;
  phoneNumber: string;
  emergencyContact: string;
  currentAddress: string;
  permanentAddress: string;
};

export type TStaff = {
  staffId: string; // যেমন: STF-2026-001
  password: string;
  name: TStaffName;
  role:
    | "admin"
    | "accountant"
    | "librarian"
    | "security"
    | "cleaner"
    | "driver";
  designation: string;
  gender: "Male" | "Female" | "Other";
  date_of_birth: Date;
  contactInfo: TStaffContactInfo;
  joining_date: Date;
  salary: number;
  shift: "Morning" | "Day" | "Night";
  work_status: "full-time" | "part-time" | "contractual";
  status: "active" | "inactive";
};

// StaffModel ইন্টারফেসটি Mongoose মডেলকে বর্ণনা করে এবং একটি কাস্টম স্ট্যাটিক মেথড isStaffExists অন্তর্ভুক্ত করে যা একটি staffId গ্রহণ করে এবং সংশ্লিষ্ট TStaff অবজেক্ট বা null রিটার্ন করে।
export interface StaffModel extends Model<TStaff> {
  isStaffExists(staffId: string): Promise<TStaff | null>;
}

