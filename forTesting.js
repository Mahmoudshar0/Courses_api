import User from "./models/user.js";
import connect from "./db.js";
import "dotenv/config";
import bcrypt from "bcryptjs"

connect()
const user = await User.findOne({ email: "admin@admin.com" });
console.log(typeof user);
// const test = await bcrypt.hash("123", 10);
// console.log(test);
// const isMatch = await bcrypt.compare("123", test);
// console.log(isMatch);