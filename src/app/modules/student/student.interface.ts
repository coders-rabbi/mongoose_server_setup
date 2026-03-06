
export type UserName = {
  first_name: string;
  middle_name?: string;
  last_name: string;
};

export type Guardian = {
  father_name: string;
  father_occupation: string;
  father_contact_no: string;
  mother_name: string;
  mother_occupation: string;
  mother_contact_no: string;
};

export type LocalGuardian = {
  name: string;
  occupation: string;
  contact_no: string;
  address: string;
};

export type Student = {
  id: string;
  name: UserName;
  gender: "male" | "female";
  date_of_birth: string;
  phone: string;
  emergency_contact: string;
  email: string;
  age: number;
  blood_group?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  present_address: string;
  permanent_address: string;
  guardian: Guardian;
  local_guardian: LocalGuardian;
  profile_image?: string;
  isActive: "active" | "blocked";
};
