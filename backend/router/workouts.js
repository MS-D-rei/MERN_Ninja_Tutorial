const express = require("express");
const router = express.Router();
const Workout = require("../models/workoutModel");
const { workout_index, workout_detail, workout_create_post, workout_delete, workout_update_patch } = require("../controllers/workoutController");

/* GET: get all workouts */
router.get("/", workout_index);

/* GET: get the workout */
router.get("/:id", workout_detail);

/* POST: create new workout */
router.post("/", workout_create_post);

/* DELETE: delete the workout */
router.delete("/:id", workout_delete);

/* PATCH: update the workout */
router.patch("/:id", workout_update_patch);

module.exports = router;
