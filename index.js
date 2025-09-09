import express from "express";
import morgan from "morgan";
import coursesRouter from "./routes/courses.js";
import usersRouter from "./routes/users.js";

// load the data in .env file into proccess
import "dotenv/config";

import connect from "./db.js";
import cors from "cors";

// connection of the data banse
connect();

const port = process.env.PORT;

// create the app instance
const app = express();

// handle the cross origin resourse sharing
app.use(cors());

// handle the request logging
app.use(morgan("dev"));

// handle the json body request
app.use(express.json());

// 
app.get("/", (req, res) => {
  res.send({path:"hello world"});
})

// handle the all related courses routes
// app.use("/api/courses", coursesRouter);
// app.use("/api/users", usersRouter);

// handle the unkown routes
// app.all('{*splat}', (req, res) => {
//   res.status(404).json({status: "error", message: "Path Not found" });
// });

// handle the global handlers errors
// app.use((error, req, res, next) => {
//   console.log("i am in global error handler");
//   res.status(error.statusCode || 500).json({status: error.statusText , message: error.message || error.errors, des: "i am from global error handler" });
// });

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
}); 