import type { Model } from "mongoose";

export type TAdminName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TAdminContactInfo = {
  email: string;
  phoneNumber: string;
  emergencyContact: string;
  currentAddress: string;
  permanentAddress: string;
};

export type TAdmin = {
  adminId: string; // যেমন: STF-2026-001
  password: string;
  name: TAdminName;
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
  contactInfo: TAdminContactInfo;
  joining_date: Date;
  salary: number;
  shift: "Morning" | "Day" | "Night";
  work_status: "full-time" | "part-time" | "contractual";
  status: "active" | "inactive";
  isdeleted: boolean
};


// AdminModel ইন্টারফেসটি Mongoose মডেলকে বর্ণনা করে এবং একটি কাস্টম স্ট্যাটিক মেথড isAdminExists অন্তর্ভুক্ত করে যা একটি adminId গ্রহণ করে এবং সংশ্লিষ্ট TAdmin অবজেক্ট বা null রিটার্ন করে।
export interface AdminModel extends Model<TAdmin> {
  isStaffExists(staffId: string): Promise<TAdmin | null>;
}

