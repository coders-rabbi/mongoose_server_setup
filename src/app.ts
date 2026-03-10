import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import { StudentRoute } from "./app/modules/student/student.route.js";
import { TeacherRouter } from "./app/modules/faculty/faculty.route.js";
import { StaffRoute } from "./app/modules/admin/admin.route.js";
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

//application routes
app.use("/api/v1/students/", StudentRoute);
app.use("/api/v1/teachers/", TeacherRouter);
app.use("/api/v1/staffs/", StaffRoute);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello Rabbi!");
});

export default app;

