require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../src/models/user");

// Middleware for handling auth
async function auth(req, res, next) {
  // Implement user auth logic
  // const token = req.cookies.token;
  try {
    const tokenHead = req.headers["authorization"];
    // console.log(tokenHead);

    const token = tokenHead.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "User is not logged in" });
    }
    const jwtPassword = process.env.SECRET_KEY;
    const decode = await jwt.verify(token, jwtPassword);
    let user = await User.findOne({ _id: decode.user })
    .select("-password -authKey ")
    .exec();
    if (!user) return res.status(403).json({ msg: "User not found" });
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return {
        message: error.message || "Internal server error",
        success: false,
      };
  }
}

module.exports = auth;