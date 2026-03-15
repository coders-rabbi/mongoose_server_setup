import express from "express";
import validationRequest from "../../utils/validateRequest.js";
import { academicSemesterValidations } from "./academicSemseter.validation.js";
import { AcademicSemesterControllers } from "./academicSemester.controller.js";

const router = express.Router();

router.post(
  "/create-academicSemester",
  validationRequest(
    academicSemesterValidations.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.createAcademicSemester,
);

export const AcademicSemesterRouters = router;
