export type TeacherName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TeacherContactInfo = {
  email: string;
  phone: string;
  currentAddress: string;
  permanentAddress: string;
};

export type Teacher = {
  teacherId: string;
  Name: TeacherName;
  designation: string;
  department: string;
  gender: string;
  date_of_birth: Date;
  contactInfo: TeacherContactInfo;
  qualification: string;
  joining_date: Date;
  experience: number;
  specialization: string;
  status: "active" | "inactive";
};
