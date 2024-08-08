const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const app = express();
require('dotenv').config();
const port = process.env.port;
const url = process.env.url;
const usersRouter = require("./routes/userRoutes");
const employeesRouter = require("./routes/employeeRoutes");
mongoose.connect(url);
const db = mongoose.connection;

db.on("error", (err) => console.error(err));
db.on("open", () => console.log("Connected to database"));

app.use(cors({
    origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({limit: '50mb'}));
app.use(cookieParser());

app.use("/users", usersRouter);
app.use("/employees", employeesRouter);
// console.log(employeesRouter.stack);
app.listen(port, () => console.log(`Server started on port ${port}`));
