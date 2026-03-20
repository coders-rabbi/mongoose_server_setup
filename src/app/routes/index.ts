import { Router } from "express";
import { userRoute } from "../modules/user/user.route.js";
import { StudentRoute } from "../modules/student/student.route.js";
import { TeacherRouter } from "../modules/faculty/faculty.route.js";
import { AcademicSemesterRouters } from "../modules/academicSemester/academicSemster.route.js";
import { AcademicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.route.js";
import { AcademicDepartmentRoutes } from "../modules/academicDepartment/academicDeparment.route.js";

const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: userRoute,
  },
  {
    path: "/students",
    route: StudentRoute,
  },
  {
    path: "/teachers",
    route: TeacherRouter,
  },
  {
    path: "/academic-semesters",
    route: AcademicSemesterRouters,
  },
  {
    path: "/academic-faculties",
    route: AcademicFacultyRoutes,
  },
  {
    path: "/academic-deparments",
    route: AcademicDepartmentRoutes,
  },
];

moduleRoutes.forEach((routes) => router.use(routes.path, routes.route));

export default router;
