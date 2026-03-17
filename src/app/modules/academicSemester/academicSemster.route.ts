import express from "express";
import validationRequest from "../../utils/validateRequest.js";
import { AcademicSemesterValidations } from "./academicSemseter.validation.js";
import { AcademicSemesterControllers } from "./academicSemester.controller.js";

const router = express.Router();

router.post(
  "/create-academicSemester",
  validationRequest(
    AcademicSemesterValidations.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.createAcademicSemester,
);
router.get("/:semesterId", AcademicSemesterControllers.getSingleSemester);
router.patch(
  "/:semesterId",
  validationRequest(
    AcademicSemesterValidations.updateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.updateSingleSemester,
);
router.get("/", AcademicSemesterControllers.getAllSemesters);

export const AcademicSemesterRouters = router;
