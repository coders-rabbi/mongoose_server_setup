import type { RequestHandler } from "express";
import { AcademicSemesterServices } from "./academicSemester.service.js";
import sendResponse from "../../utils/sendResponse.js";
import status from "http-status";

const createAcademicSemester: RequestHandler = async (req, res, next) => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body,
  );
  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "Students retrieved successfully",
    data: result,
  });
};

export const AcademicSemesterControllers = {
  createAcademicSemester,
};
