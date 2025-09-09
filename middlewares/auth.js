import jwt from "jsonwebtoken";
import { createError } from "../utils/appError.js";
const auth = (req, res, next) => {
  const token = req.headers['authorization'] || req.headers['Authorization'];
  if (!token) {
    const err = createError("must provide token", 400, "failed");
    return next(err);
  }
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next()
  } catch (err) {
        const error = createError("unauthorized", 401, "failed");
        return next(error);
  }
  // next();
}
export default auth;