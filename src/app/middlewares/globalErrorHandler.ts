// import type { NextFunction, Request, Response } from "express";

import type { ErrorRequestHandler } from "express";
import { error } from "node:console";
import { ZodError } from "zod";
import type { TErrorSource } from "../interface/errorType.js";
import config from "../config/index.js";
import handleZodError from "../errors/handleZodError.js";
import handleValidationError from "../errors/handleValidationError.js";

// const globalErrorHandler = (
//   err: any,
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   return res.status(err.statusCode || 500).json({
//     success: false,
//     message: err.message || "Something went wrong!",
//     error: err,
//   });
// };

//handle others way of writing global error handler
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong!";

  let errorSource: TErrorSource = [
    {
      path: err.path || "",
      message: "Something went wrong!",
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSource = simplifiedError?.errorSource as TErrorSource;
  } else if (err?.name === "ValidationError") {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSource = simplifiedError?.errorSource as TErrorSource;
  }

  return res.status(err.statusCode || 500).json({
    success: false,
    message,
    errorSource,
    stack: config.NODE_ENV === "development" ? err?.stack : undefined,
  });
};

export default globalErrorHandler;
