import express from "express";
import { getAllUsers, register, login } from "../controllers/users.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get("/", auth, getAllUsers);
router.post("/register", register);
router.post("/login", login);

export default router;