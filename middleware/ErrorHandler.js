const ErrorHandler = async (err, req, res, next) => {
  const StatusCode = err.statuscode || 500;
  const errorResponse = {
    ...err,
    message: err.message || "Server Side Error",
  };
  console.log(err)
  res.status(StatusCode).json(errorResponse);
};

module.exports = ErrorHandler;
