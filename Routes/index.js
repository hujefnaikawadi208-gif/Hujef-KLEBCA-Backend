const express = require("express");
const router = express.Router();

const userRoutes = require("../Routes/UserRoute");
const cartRoutes = require("../Routes/CartRoute");
const productRoutes = require("../Routes/ProductRoute");
const orderRoutes = require("../Routes/OrderRoutes");
const ratingRoutes = require("../Routes/RatingRoute");
const authRoutes = require("../Routes/AuthRoute");
const {auth} = require("../middleware/Auth");

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/carts", auth, cartRoutes);
router.use("/products", productRoutes);
router.use("/orders", auth, orderRoutes);
router.use("/ratings",auth, ratingRoutes);

module.exports = router;
