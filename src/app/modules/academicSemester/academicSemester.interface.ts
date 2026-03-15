export type TAcademicSemesterName = "Autumn" | "Summar" | "Fall";
export type TMonths =
  | "january"
  | "february"
  | "march"
  | "may"
  | "june"
  | "july"
  | "august"
  | "september"
  | "october"
  | "november"
  | "december";

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