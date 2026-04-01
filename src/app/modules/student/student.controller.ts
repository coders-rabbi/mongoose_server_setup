import { StudentService } from "./student.service.js";
import sendResponse from "../../utils/sendResponse.js";
import status from "http-status";
import type { NextFunction, Request, RequestHandler, Response } from "express";
import catchAsync from "../../utils/catchAsync.js";

const getAllStudents = catchAsync(async (req, res) => {
  const result = await StudentService.getAllStudentsFromDB();
  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "Students retrieved successfully",
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentService.getSingleStudentsFromDB(
    studentId as string,
  );

  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "Students retrieved successfully",
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentService.deleteStudentFromDB(studentId as string);

  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "Student deleted successfully",
    data: result,
  });
});

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
