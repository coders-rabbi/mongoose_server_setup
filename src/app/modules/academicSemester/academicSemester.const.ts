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
  "January",
  "February",
  "March",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const AcademicSemesterCode: TAcademicSemesterCode[] = ["01", "02", "03"];

export const adcademicSemesterNameCodeMapper: TAcademicSemesterCodeMapper = {
  Autumn: "01",
  Summar: "02",
  Fall: "03",
};