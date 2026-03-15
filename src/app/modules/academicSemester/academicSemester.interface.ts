export type TAcademicSemesterName = "Autumn" | "Summar" | "Fall";
export type TMonths =
  | "January"
  | "February"
  | "March"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

export type TAcademicSemesterCode = "01" | "02" | "03";

export type TAcademicSemester = {
  name: TAcademicSemesterName;
  year: string;
  code: TAcademicSemesterName;
  startMonth: TMonths;
  endMonth: TMonths;
};


export type TAcademicSemesterCodeMapper = {
    [key: string]: string;
  };