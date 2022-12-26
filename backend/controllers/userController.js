const User = require("../models/userModel");

const loginUser = async (req, res) => {
  res.json({ message: "Login user" });
};

const signupUser = async (req, res) => {
  res.json({ message: "Sign up user" });
};

module.exports = {
  loginUser,
  signupUser,
};
