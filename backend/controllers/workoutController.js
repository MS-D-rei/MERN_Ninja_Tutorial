const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

// get all workouts
const workout_index = async (req, res) => {
  try {
    const allWorkouts = await Workout.find().sort({ createdAt: -1 });
    res.json(allWorkouts);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(400).json({ error: err });
    }
  }
};

// get the workout
const workout_detail = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({ error: "The workout not found" });
  }
  const workout = await Workout.findById(req.params.id);
  if (!workout) {
    return res.status(404).json({ error: "The workout not found" });
  }
  res.status(200).json(workout);
};

// create a new workout
const workout_create_post = async (req, res) => {
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
};

module.exports = {
  workout_index,
  workout_detail,
  workout_create_post,
};
