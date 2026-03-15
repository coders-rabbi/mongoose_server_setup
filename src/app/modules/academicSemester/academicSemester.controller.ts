import type { RequestHandler } from "express";
import { AcademicSemesterServices } from "./academicSemester.service.js";
import sendResponse from "../../utils/sendResponse.js";
import status from "http-status";
import catchAsync from "../../utils/catchAsync.js";

const createAcademicSemester: RequestHandler = async (req, res) => {
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

const getAllSemesters = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAllAcademicSemestersFromDB();
  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "Academic Semesters retrive successfully",
    data: result,
  });
});

const getSingleSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const result = await AcademicSemesterServices.getSingleSemesterFromDB(
    semesterId as string,
  );
  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "Academic Single Semester retrive successfully",
    data: result,
  });
});

const updateSingleSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const { AcademicSemester } = req.body;
  const result = await AcademicSemesterServices.updateSingleSemesterFromDB(
    semesterId as string,
    AcademicSemester,
  );
  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "Semester Update Successful",
    data: result,
  });
});

export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAllSemesters,
  getSingleSemester,
  updateSingleSemester,
};
