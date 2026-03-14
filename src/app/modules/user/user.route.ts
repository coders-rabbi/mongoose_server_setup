import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { UserControllers } from "./user.controller.js";
import { StudentDataValidation } from "../student/student.zodValidation.js";
import validationRequest from "../../utils/validateRequest.js";

const router = express.Router();

router.post(
  "/create-student",
  validationRequest(StudentDataValidation.createStudentValidationSchema),
  UserControllers.createStudent,
);

export const userRoute = router;
