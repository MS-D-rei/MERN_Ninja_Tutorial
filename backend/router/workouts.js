const express = require("express");
const router = express.Router();
const Workout = require("../models/workoutModel");
const { workout_index, workout_detail, workout_create_post } = require("../controllers/workoutController");

/* GET: get all workouts */
router.get("/", workout_index);

/* GET: get the workout */
router.get("/:id", workout_detail);

/* POST: create new workout */
router.post("/", workout_create_post);

/* DELETE: delete the workout */
router.delete("/:id", (req, res) => {
  res.json({ message: "Delete the workout" });
});

/* PATCH: update the workout */
router.patch("/:id", (req, res) => {
  res.json({ message: "Update the workout" });
});

module.exports = router;
