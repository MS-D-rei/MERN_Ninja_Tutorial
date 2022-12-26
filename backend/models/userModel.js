const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { Schema } = mongoose;

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
  const isExists = await this.findOne({ email });
  if (isExists) {
    throw Error("The email already exists");
  }

  const salt = await bcrypt.genSalt(saltRound);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ name, email, password: hash });

  return user;
};

module.exports = mongoose.model("User", userSchema);
