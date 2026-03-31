import status from "http-status";
import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { AcademicDepartmentServices } from "./academicDepartment.service.js";
const createAcademicDepartment = catchAsync(async (req, res) => {
  const { department } = req.body;
  const result =
    await AcademicDepartmentServices.createAcademicDepartmentIntoBD(department);
  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "Academic Deparment Create Succssfully",
    data: result,
  });
});

const getAllAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentServices.getAllAcademicDepartmentFromDB();
  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "All Academic Departments retrieved successfully",
    data: result,
  });
});

const getSingleAcademicDepartment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await AcademicDepartmentServices.getSingleAcademicDepartmentFromBD(
      id as string,
    );
  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "Academic Department retrieved successfully",
    data: result,
  });
});

export const AcademicDepartmentControllers = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
};
