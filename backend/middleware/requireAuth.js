const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  // verify authorization
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(400).json({ message: "Authorization token required" });
  }

  // authorization header is like 'Bearer 1ifyawjntiot1k.sahjoyr4khodhas.safjiaoetahtio'
  // get token from authorization header
  const token = authorization.split(" ")[1];

  try {
    const jwtPayload = jwt.verify(token, process.env.JWT_SECRET);
    console.log(jwtPayload);
    /*
    => { _id: '63aaa232dbdf0eebca0dd86d', iat: 1672484724, exp: 1672743924 }
    */
    const { _id } = jwtPayload;

    // set user _id to req user property
    req.user = await User.findOne({ _id }).select('_id');

    next();
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Request is not authorized" });
  }
};

module.exports = requireAuth;