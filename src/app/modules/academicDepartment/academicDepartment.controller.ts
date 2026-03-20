import status from "http-status";
import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { AcademicDeparmentServices } from "./academicDepartment.service.js";

const createAcademicDepartment = catchAsync(async (req, res) => {
  const { department } = req.body;
  const result =
    await AcademicDeparmentServices.createAcademicDepartmentIntoBD(department);
  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "Academic Deparment Create Succssfully",
    data: result,
  });
});

export const AcademicDepartmentControllers = {
  createAcademicDepartment,
};
