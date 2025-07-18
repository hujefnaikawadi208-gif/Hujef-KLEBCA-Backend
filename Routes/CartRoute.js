const express = require("express");
const {
  addToCart,
  removeFromCart,
  viewCart,
  updateCartItemQty,
} = require("../Controller/CartController");
const router = express.Router();

router.post("/add", addToCart);
router.post("/remove", removeFromCart);
router.get("/", viewCart);
router.put("/update", updateCartItemQty);

module.exports = router;
