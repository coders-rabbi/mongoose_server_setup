import express, {
  type Application,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import globalErrorHandler from "./app/middlewares/globalErrorHandler.js";
import notFound from "./app/middlewares/notFound.js";
import router from "./app/routes/index.js";
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

//application routes
app.use("/api/v1/", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Rabbi!");
});

//global error handler
app.use(globalErrorHandler);

//not found error handler
app.use(notFound);

export default app;
