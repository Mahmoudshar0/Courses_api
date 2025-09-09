import { createError } from "../utils/appError.js";
export default function authoriz(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      const error = createError("unauthorized action", 401, "failed");
      next(error);
    }
    next();
  }
}