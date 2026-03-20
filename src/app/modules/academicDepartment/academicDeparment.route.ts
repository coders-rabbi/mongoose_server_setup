import express from "express";
import { AcademicDepartmentControllers } from "./academicDepartment.controller.js";
import validationRequest from "../../utils/validateRequest.js";
import { AcademicDepartmentValidations } from "./academicDepartment.validation.js";

const router = express.Router();

router.post(
  "/create-academicDeparment",
  validationRequest(
    AcademicDepartmentValidations.createAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentControllers.createAcademicDepartment,
);

export const AcademicDepartmentRoutes = router;
