import express from "express";
import { StudentController } from "./student.controller.js";

const router = express.Router();

router.post("/create-student", StudentController.createStudent);
router.get("/", StudentController.getAllStudents);
router.get("/:studentId", StudentController.getSingleStudent);

export const StudentRoute = router;
