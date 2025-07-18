const User = require("../Model/User");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/Token");

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    let user;
    if (!email || !password) {
      const error = new Error("Email and password required");
      error.statusCode = 400;
      throw error;
    }

    user = await User.findOne({ email });

    if (!user) {
      const error = new Error("Invalid credentials");
      error.statusCode = 400;
      throw error;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      const error = new Error("Invalid creadentials");
      error.statusCode = 400;
      throw error;
    }
    const token = generateToken({
      id: user._id,
      email: user.email,
      role: user.role,
    });
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: Number(process.env.COOKIE_AGE),
    });

    return res.status(200).json({
      message: "Login successful",
      userId: user._id,
      role: user.role,
    });
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
    });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    next(error);
  }
};