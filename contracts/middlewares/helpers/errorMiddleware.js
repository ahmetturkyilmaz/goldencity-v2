const mongoose = require("mongoose");
const ErrorHandler = require("../../utils/errorHandler");

const errorMiddleware = (err, req, res, next) => {
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({
      success: false,
      message: err.errors,
    });
  }

  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({
      success: false,
      message: "Invalid ID format",
    });
  }

  if (err instanceof ErrorHandler) {
    return res.status(err.statusCode || 500).json({
      success: false,
      message: err.message,
    });
  }

  return res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

module.exports = errorMiddleware;

