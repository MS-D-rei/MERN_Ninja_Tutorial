const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Get all workouts" });
});

router.get("/:workoutId", (req, res) => {
  res.json({ message: "Get the single workout" });
});

router.post("/", (req, res) => {
  res.json({ message: "POST the new workout" });
});

router.delete("/:workoutId", (req, res) => {
  res.json({ message: "Delete the workout" });
});

router.patch("/:workoutId", (req, res) => {
  res.json({ message: "Update the workout" });
});

module.exports = router;
