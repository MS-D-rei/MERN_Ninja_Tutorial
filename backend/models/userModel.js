const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const saltRound = 10;

/* sign up static method */
userSchema.statics.signup = async function (name, email, password) {
  // validation
  if (!name || !email || !password) {
    throw new Error("All fields must be filled");
  }

  let errorMessages = []

  if (!validator.isEmail(email)) {
    errorMessages.push("Email is not valid");
  }
  if (
    !validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 0,
      minNumbers: 0,
      minSymbols: 0,
    })
  ) {
    errorMessages.push("Password is not valid");
  }

  if (errorMessages.length > 0) {
    throw new Error(errorMessages);
  }

  const isExists = await this.findOne({ email });
  if (isExists) {
    throw Error("The email already exists");
  }

  // hash password
  const salt = await bcrypt.genSalt(saltRound);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ name, email, password: hash });

  return user;
};

module.exports = mongoose.model("User", userSchema);
