class AppError extends Error{
  constructor(message, statusCode, statusText, errors) {
    super(message)
    this.statusCode = statusCode;
    this.statusText = statusText;
    this.errors = errors;
    this.isOperational = true;
  }
}

export function createError(message, statusCode, statusText, errors) {
  return new AppError(message, statusCode, statusText, errors)
}

// const err = createError("test", 404, "fail");
// console.log(JSON.stringify(err),err.message);