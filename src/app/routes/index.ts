import { Router } from "express";
import { userRoute } from "../modules/user/user.route.js";
import { StudentRoute } from "../modules/student/student.route.js";
import { TeacherRouter } from "../modules/faculty/faculty.route.js";

const router = Router()

const moduleRoutes = [
    {
        path: "/users",
        route: userRoute
    },
    {
        path: "students",
        route: StudentRoute
    },
    {
        path: 'teachers',
        route: TeacherRouter
    }
]

moduleRoutes.forEach((routes) => router.use(routes.path, routes.route))

export default router;






