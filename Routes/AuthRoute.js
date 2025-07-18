const express = require("express");
const router = express.Router();
const passport = require("passport");
const {auth} = require("../middleware/Auth");
const { login, logout } = require("../Controller/AuthController");
router.post("/login", login);
router.get("/logout", logout);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/login",
    session: true,
  }),
  (req, res) => {
    res.redirect("http://localhost:3000/oauth-success");
  }
);
router.get("/me", auth, (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  res.status(200).json({
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role,
  });
});

module.exports = router;
