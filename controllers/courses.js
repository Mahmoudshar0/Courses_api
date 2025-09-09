import { validationResult } from "express-validator";
import Course from "../models/course.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";
import { createError } from "../utils/appError.js";

const getAllCourses = async (req, res) => {
  const courses = await Course.find({});
  res.json({status: "success", data: {courses}});
};

const getLimitedCourses = async (req, res) => {
  const { page=1, limit = 2 } = req.query;
  const skip = (page - 1) * limit;
  try {
      const courses = await Course.find().skip(skip).limit(limit);
      res.status(200).json({ status: "success", data: { courses } });
  } catch (err) {
      res.status(500).json({ status: "error", msg: err.message });
  }
}

const getCourse = asyncWrapper(async (req, res, next) => {
  const { courseId } = req.params;
    const course = await Course.findById(courseId);
  if (!course) {
    // without custom error class
    const error = new Error();
    error.message = "course not found";
    error.statusCode = 404;
    return next(error)
    }
    res.json({ status: "success", data: { course } });
});

const createCourse = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      const error = createError(
      "invalid",
      400,
      "test",
      errors.array().map((e) => ({ [e.path]: e.msg }))
    );
    return next(error);
  }
  const {name, price} = req.body
  await new Course({
    name,
    price
  }).save()
  const courses = await Course.find();
  res.status(201).send({statues: "success", data:{courses}});
});

const updateCourse = asyncWrapper(async(req, res, next) => {
  const { courseId } = req.params;
  const result = await Course.findByIdAndUpdate(courseId, req.body, {returnNewDocument: true});
  if (!result) {
    const error = createError("course not found", 404, "fail");
    return next(error);
  }
  const updateCourse = await Course.findById(courseId)
  res.status(200).json({ statues: "success", data: {updateCourse}});
});

const deleteCourse = asyncWrapper(async (req, res, next) => {
  const { courseId } = req.params;
  const result = await Course.deleteOne({_id: courseId});
    if (!result.deletedCount) {
      const error = createError("course not found", 404, "fail");
      return next(error);
    }
  res.status(200).json({ status: "success", data: "null" });
});

export {
  getAllCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  getLimitedCourses,
};
