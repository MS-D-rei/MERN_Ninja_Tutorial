const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

// get all workouts
const workout_index = async (req, res) => {
  try {
    // req.user comes from requireAuth.js
    const user_id = req.user._id;
    const allWorkouts = await Workout.find({ user_id }).sort({ createdAt: -1 });
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

  let errorMessages = [];

  if (title.trim().length === 0) {
    errorMessages.push("Exersize Title is empty");
  }

  if (load.trim().length === 0) {
    errorMessages.push("Load is empty");
  }

  if (reps.trim().length === 0) {
    errorMessages.push("Reps is empty");
  }

  if (errorMessages.length > 0) {
    return res.status(400).json({ error: errorMessages });
  }

  try {
    // req.user comes from requireAuth.js
    const user_id = req.user._id;
    const workout = await Workout.create({ title, reps, load, user_id });
    res.status(200).json(workout);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(400).json({ error: err });
    }
  }
};

// delete the workout
const workout_delete = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(404).json({ error: "The workout not found" });
  }
  const workout = await Workout.findByIdAndDelete(req.params.id);
  if (!workout) {
    return res.status(400).json({ error: "The workout not found" });
  }
  res.status(200).json(workout);
};

// update the workout
const workout_update_patch = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(404).json({ error: "The workout not found" });
  }
  const workout = await Workout.findOneAndUpdate(
    { _id: req.params.id },
    {
      ...req.body,
    }
  );
  if (!workout) {
    return res.status(400).json({ error: "The workout not found" });
  }
  res.status(200).json(workout);
};

module.exports = {
  workout_index,
  workout_detail,
  workout_create_post,
  workout_delete,
  workout_update_patch,
};
