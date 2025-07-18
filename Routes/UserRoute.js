const express = require("express");
const {
  getUserProfile,
  createUser,
  updateUserProfile,
  getAllUser,
} = require("../Controller/UserController");
const router = express.Router();

router.post("/register", createUser);
router.get("/", getAllUser);
router.get("/userProfile", getUserProfile);
router.put("/updateUser", updateUserProfile);

module.exports = router;
