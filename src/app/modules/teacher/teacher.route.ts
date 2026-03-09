import express from "express";
import { TeacherController } from "./teacher.controller.js";

const router = express.Router();

router.post("/create-teacher", TeacherController.createTeacher);
router.get("/", TeacherController.getAllTeachers);
router.get("/:teacherId", TeacherController.getSingleTeacher);

export const TeacherRouter = router;
