import express from "express";
import {
  getAllCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  getLimitedCourses
} from "../controllers/courses.js";
import validationSchema from "../middlewares/validationSchema.js";
import auth from "../middlewares/auth.js"
import allowedTo from "../middlewares/allowedTo.js"


const router = express.Router();

router.get("/", getAllCourses);

router.get("/limited", getLimitedCourses);

router.get("/:courseId", getCourse);

router.post(
  "/",
  validationSchema(),
  createCourse
);

router.patch("/:courseId", updateCourse);

router.delete("/:courseId", auth, allowedTo("admin", "manager"), deleteCourse);

export default router;