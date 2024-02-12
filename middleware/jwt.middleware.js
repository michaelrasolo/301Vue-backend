// const { expressjwt: jwt } = require("express-jwt");
const User = require("../models/User.model");
const jwt = require("jsonwebtoken");
const SECRET_TOKEN = process.env.SECRET_TOKEN;

// Function used to extract the JWT token from the request's 'Authorization' Headers
async function isAuthenticated(req, res, next) {
  // Check the body for a token
  const authHeaders = req.headers.authorization;
  if (!authHeaders) {
    res.status(401).json({ message: "isAuthenticated ====> ⛔ Provide an authorization token" });
  }
  const token = authHeaders.replace("Bearer ", "");

  const payload = jwt.verify(token, SECRET_TOKEN, { algorithms: ["HS256"] });
  const user = await User.findById(payload.currentUser._id);
  if (!user) {
    return res.status(401).json({ message: "isAuthenticated ====> 🛑 User does not exist" });
  }
  req.user = user;
  console.log("isAuthenticated ====>",req.user);
  next();
}

module.exports = {
  isAuthenticated,
};
