const jwt = require("jsonwebtoken");

function generateToken(data) {
  return jwt.sign(
    {
      ...data,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: process.env.EXPIRY,
    }
  );
}

module.exports = generateToken;
