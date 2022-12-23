const express = require("express");
const router = express.Router();
const Workout = require("../models/Workout");

/* get all workouts */
router.get("/", (req, res) => {
  res.json({ message: "Get all workouts" });
});

/* get the workout */
router.get("/:workoutId", (req, res) => {
  res.json({ message: "Get the single workout" });
});

/* create new workout */
router.post("/", async (req, res) => {
  const { title, reps, load } = req.body;
  try {
    const workout = await Workout.create({ title, reps, load });
    res.status(200).json(workout);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(400).json({ error: err });
    }
  }
});

/* delete the workout */
router.delete("/:workoutId", (req, res) => {
  res.json({ message: "Delete the workout" });
});

/* update the workout */
router.patch("/:workoutId", (req, res) => {
  res.json({ message: "Update the workout" });
});

module.exports = router;
