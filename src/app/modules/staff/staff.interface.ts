export type StaffName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type StaffContactInfo = {
  email: string;
  phoneNumber: string;
  emergencyContact: string;
  currentAddress: string;
  permanentAddress: string;
};

export type Staff = {
  staffId: string; // যেমন: STF-2026-001
  name: StaffName;
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
  contactInfo: StaffContactInfo;
  joining_date: Date;
  salary: number;
  shift: "Morning" | "Day" | "Night";
  work_status: "full-time" | "part-time" | "contractual";
  status: "active" | "inactive";
};
