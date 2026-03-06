import type { Request, Response } from "express";
import { StudentService } from "./student.service.js";

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    // will call service function to create student into database
    const result = await StudentService.createStudentIntoBD(studentData);
    //send response
    res.status(200).json({
      success: true,
      message: "Student created successfully",
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Failed to create student",
      data: error,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentService.getAllStudentsFromBD();
    res.status(200).json({
      success: true,
      message: "Students retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Failed to retrieve students",
      data: error,
    });
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentService.getSingleStudentsFromBD(
      studentId as string,
    );
    res.status(200).json({
      success: true,
      message: "Student retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Failed to retrieve student",
      data: error,
    });
  }
};

export const StudentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
