import express from "express";
import { StudentController } from "./student.controller.js";
import validationRequest from "../../utils/validateRequest.js";
import { StudentDataValidation } from "./student.zodValidation.js";

const router = express.Router();

router.get("/", StudentController.getAllStudents);
router.get("/:studentId", StudentController.getSingleStudent);
router.patch("/:studentId",validationRequest(StudentDataValidation.updateStudentValidationSchema) ,StudentController.updateStudent);
router.delete("/:studentId", StudentController.deleteStudent);

export const StudentRoute = router;
