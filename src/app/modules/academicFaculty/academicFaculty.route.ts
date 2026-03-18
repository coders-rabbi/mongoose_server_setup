import express from "express";
import { AcademicFacultyControllers } from "./academicFaculty.controller.js";
import validationRequest from "../../utils/validateRequest.js";
import { AcademicFacultyValidations } from "./academicFaculty.validation.js";

const router = express.Router();

router.post(
  "/create-faculty",
  validationRequest(
    AcademicFacultyValidations.createAcademicFacultValidationSchema,
  ),
  AcademicFacultyControllers.createAcademicFaculty,
);

router.get("/", AcademicFacultyControllers.getAllAcademicFaculties);
router.get("/:facultyId", AcademicFacultyControllers.getSingleAcademicFaculty);
router.patch(
  "/:facultyId",
  validationRequest(
    AcademicFacultyValidations.updateAcademicFacultValidationSchema,
  ),
  AcademicFacultyControllers.updateSingleAcademicFaculty,
);

export const AcademicFacultyRoutes = router;
