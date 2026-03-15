import type {
  TAcademicSemesterCode,
  TAcademicSemesterCodeMapper,
  TAcademicSemesterName,
  TMonths,
} from "./academicSemester.interface.js";

export const AcademicSemesterName: TAcademicSemesterName[] = [
  "Autumn",
  "Summar",
  "Fall",
];
export const Months: TMonths[] = [
  "january",
  "february",
  "march",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

export const AcademicSemesterCode: TAcademicSemesterCode[] = ["01", "02", "03"];

export const adacdemicSemesterNameCodeMapper: TAcademicSemesterCodeMapper = {
  Autumn: "01",
  Summar: "02",
  Fall: "03",
};
