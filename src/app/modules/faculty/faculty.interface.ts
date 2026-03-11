export type TteacherName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TteacherContactInfo = {
  email: string;
  phone: string;
  currentAddress: string;
  permanentAddress: string;
};

export type Tteacher = {
  teacherId: string;
  Name: TteacherName;
  designation: string;
  department: string;
  gender: string;
  date_of_birth: Date;
  contactInfo: TteacherContactInfo;
  qualification: string;
  joining_date: Date;
  experience: number;
  specialization: string;
  status: "active" | "inactive";
};
