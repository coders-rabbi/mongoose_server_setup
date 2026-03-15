import type { RequestHandler } from "express";
import { AcademicSemesterServices } from "./academicSemester.service.js";
import sendResponse from "../../utils/sendResponse.js";
import status from "http-status";

const createAcademicSemester: RequestHandler = async (req, res, next) => {
  const { AcademicSemester } = req.body;
  const result =
    await AcademicSemesterServices.createAcademicSemesterIntoDB(
      AcademicSemester,
    );
  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "Academic Semester created successfully",
    data: result,
  });
};

export const AcademicSemesterControllers = {
  createAcademicSemester,
};
