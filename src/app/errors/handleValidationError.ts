import type mongoose from "mongoose";
import type { TErrorSource } from "../interface/errorType.js";

const handleValidationError = (err: mongoose.Error.ValidationError) => {
  const errorSource: TErrorSource = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path,
        message: val?.message,
      };
    },
  );

  const statusCode = 400;
  return {
    statusCode,
    message: "Validation Error",
    errorSource,
  };
};

export default handleValidationError;
