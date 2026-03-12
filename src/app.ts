import express, {
  type Application,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import { StudentRoute } from "./app/modules/student/student.route.js";
import { TeacherRouter } from "./app/modules/faculty/faculty.route.js";
import { userRoute } from "./app/modules/user/user.route.js";
import globalErrorHandler from "./app/globalErrorHandler/globalErrorHandler.js";
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

//application routes
app.use("/api/v1/students/", StudentRoute);
app.use("/api/v1/teachers/", TeacherRouter);
app.use("/api/v1/users/", userRoute);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello Rabbi!");
});

app.use(globalErrorHandler);

export default app;
