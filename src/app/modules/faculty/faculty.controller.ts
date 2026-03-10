import type { Request, Response } from "express";
import { TeacherService } from "./faculty.service.js";
import { TeacherValidation } from "./faculty.validation.js";

const createTeacher = async (req: Request, res: Response) => {
  try {
    const validatedData =
      await TeacherValidation.createTeacherValidationSchema.validateAsync(
        req.body,
      );

    const result = await TeacherService.createTeacherIntoDB(
      validatedData.teacher,
    );

    res.status(200).json({
      success: true,
      message: "Teacher created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.details?.[0]?.message || "Validation Error",
      error: error,
    });
  }
};

const getAllTeachers = async (req: Request, res: Response) => {
  try {
    const result = await TeacherService.getAllTeachersFromDB();
    res.status(200).json({
      success: true,
      message: "Teachers retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: "Failed to retrieve teachers",
      error: error,
    });
  }
};

const getSingleTeacher = async (req: Request, res: Response) => {
  try {
    const { teacherId } = req.params;
    const result = await TeacherService.getSingleTeacherFromBD(
      teacherId as string,
    );
    res.status(200).json({
      success: true,
      message: "Teacher retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Failed to retrieve teacher",
      error: error,
    });
  }
};

export const TeacherController = {
  createTeacher,
  getAllTeachers,
  getSingleTeacher,
};
