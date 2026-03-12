import type { NextFunction, Request, Response } from "express";
import { StudentService } from "./student.service.js";
import sendResponse from "../../utils/sendResponse.js";
import status from "http-status";

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { student: studentData } = req.body;

    // will call service function to create student into database
    const result = await StudentService.createStudentIntoBD(studentData);
    sendResponse(res, {
      success: true,
      statusCode: status.OK,
      message: "Student created successfully",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await StudentService.getAllStudentsFromBD();
    sendResponse(res, {
      success: true,
      statusCode: status.OK,
      message: "Students retrieved successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params;
    const result = await StudentService.getSingleStudentsFromBD(
      studentId as string,
    );

    sendResponse(res, {
      success: true,
      statusCode: status.OK,
      message: "Students retrieved successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const StudentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
