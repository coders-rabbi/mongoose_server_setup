import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { UserControllers } from "./user.controller.js";
import { StudentDataValidation } from "../student/student.zodValidation.js";


const router = express.Router();

const validationRequest = (schema: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      next(error);
    }
  };
};

router.post(
  "/create-student",
  validationRequest(StudentDataValidation.studentValidationSchema),
  UserControllers.createStudent,
);

export const userRoute = router;
