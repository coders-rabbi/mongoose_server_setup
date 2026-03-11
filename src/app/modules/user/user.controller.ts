import type { Request, Response } from "express";
import { UserServices } from "./user.service.js";

const createStudent = async (req: Request, res: Response) => {
  const { password, student: studentData } = req.body;
  try {
    const result = await UserServices.createStudentIntoDB(
      password,
      studentData,
    );
    res.status(200).json({
      success: true,
      message: "User Created Successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "User failed to create",
      error: error,
    });
  }
};

export const UserControllers = {
  createStudent,
};
