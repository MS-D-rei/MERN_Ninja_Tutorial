const express = require("express");
const router = express.Router();

/* get all workouts */
router.get("/", (req, res) => {
  res.json({ message: "Get all workouts" });
});

/* get the workout */
router.get("/:workoutId", (req, res) => {
  res.json({ message: "Get the single workout" });
});

/* create new workout */
router.post("/", (req, res) => {
  res.json({ message: "POST the new workout" });
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
