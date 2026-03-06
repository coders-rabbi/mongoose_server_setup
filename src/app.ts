import express, { type Application, type Request, type Response } from "express";
import cors from "cors";
import { StudentRoute } from "./app/modules/student/student.route.js";
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors())

//application routes
app.use("/api/v1/students/", StudentRoute);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello Rabbi!");
});

export default app;

