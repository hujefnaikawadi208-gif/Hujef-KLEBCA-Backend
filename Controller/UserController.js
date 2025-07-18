const bcrypt = require("bcrypt");
const User=require("../Model/User")
exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    console.log(name)
    if (!name || !email || !password) {
      const error = new Error("Missing Required data");
      error.statusCode = 400;
      throw error;
    }
    const existing = await User.findOne({ email: email });

    if (existing) {
      const error = new Error("User already found");
      error.statusCode = 400;
      throw error;
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name: name,
      email: email,
      password: hashPassword,
      role: role || "customer",
    });
    res.status(200).json({
      message: "User created Successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err) {
    console.log(err)
    next(err);
  }
};

exports.getAllUser = async (req, res, next) => {
  try {
    const user = await User.find().select("-password");
    res.status(200).json({
      user,
    });
  } catch (err) {
    next(err);
  }
};

exports.getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    res.status(200).json({
      user,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateUserProfile = async (req, res, next) => {
  try {
    const updates = req.body;
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }
    const updateUser = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
      runValidators: true,
    }).select("-password");
    res.json({
      message: "User updated successfull",
      updateUser,
    });
  } catch (err) {
    next(err);
  }
};
