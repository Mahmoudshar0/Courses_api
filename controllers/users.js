import User from "../models/user.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";
import { createError } from "../utils/appError.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import genJWT from "../utils/generateJWT.js";

const getAllUsers = asyncWrapper(async (req, res) => {
  const users = await User.find({},{password: false, __v: false});
  res.status(200).json({ status: "success", data: { users } });
});

const register = asyncWrapper(async (req, res, next) => {
  const { firstName, lastName, email, password, role } = req.body;
  const isExist = await User.findOne({ email: email });
  if(isExist) {
    const error = createError("Email already exist", 400, "fail");
    return next(error);
  }
  if (!firstName || !lastName || !email || !password) {
    const error = createError("All fields are required", 400, "fail");
    return next(error)
  }

  // password hashing
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role
  })

  // generate JWT token
  const token = genJWT({email: user.email, id: user._id, role: user.role});
  user.token = token;
  await user.save();
  const safeUser = user.toObject()
  delete safeUser.password
  res.status(201).json({ status: "success", data: { safeUser } });
})

const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  if(!email || !password) {
    const error = createError("All fields are required", 400, "fail");
    return next(error);
  }

  const user = await User.findOne({ email: email });
  
  if (!user) {
    const error = createError("User Email or Password is incorrect", 404, "fail");
    return next(error);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    const error = createError("User Email or Password is incorrect", 404, "fail");
    return next(error);
  }
  const token = genJWT({ email: user.email, id: user._id, role: user.role });
  res.status(200).json({ status: "success", data: { user: "logged in successfuly", token } });

})

export { getAllUsers, register, login };