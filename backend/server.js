require("dotenv").config();
const express = require("express");
const cors = require("cors");
const workoutRoutes = require("./router/workouts");
const mongoose = require("mongoose");

/* create express app */
const app = express();

const hostname = "localhost";
const port = process.env.PORT;

/* CORS setting */
const accessControlAllowOrigins = ["http://localhost:5173", "http://127.0.0.1:5173"];
const accessControlAllowMethods = [
  "GET",
  "HEAD",
  "PUT",
  "PATCH",
  "POST",
  "DELETE",
];

app.use(
  cors({
    origin: accessControlAllowOrigins,
    methods: accessControlAllowMethods,
  })
);

/* use middleware to parse json */
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

/* workouts routes */
app.use("/api/workouts", workoutRoutes);

/* connect DB */
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DB_URL)
  .then((result) => {
    console.log("MongoDB connected");
    app.listen(port, hostname, () => {
      console.log(`Listening port: ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
