import status from "http-status";
import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { AcademicFacultyServices } from "./academicFaculty.service.js";

const createAcademicFaculty = catchAsync(async (req, res) => {
  const { Faculty } = req.body;
  const result =
    await AcademicFacultyServices.createAcademicFacultyIntoDB(Faculty);
  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    data: result,
  });
});

const getAllAcademicFaculties = catchAsync(async (req, res) => {
  const reuslt = await AcademicFacultyServices.getAllAcademicFaculties();
  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    data: reuslt,
  });
});

const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result = await AcademicFacultyServices.getSingleAcademicFaculty(
    facultyId as string,
  );
  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "Academic Faculty is retrived Suceccfully",
    data: result,
  });
});

const updateSingleAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const { Faculty } = req.body;
  const result = await AcademicFacultyServices.updateAcademicFaculty(
    facultyId as string,
    Faculty,
  );
  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "Academic Faculty is updload Suceccfully",
    data: result,
  });
});

export const AcademicFacultyControllers = {
  createAcademicFaculty,
  getAllAcademicFaculties,
  getSingleAcademicFaculty,
  updateSingleAcademicFaculty,
};
