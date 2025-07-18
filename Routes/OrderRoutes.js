const express = require("express");
const {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  handlePaymentWebhook,
} = require("../Controller/OrdersController");
const router = express.Router();

router.post("/create", createOrder);
router.get("/my-orders", getUserOrders);
router.get("/all", getAllOrders);
router.put("/status", updateOrderStatus);
router.post("/webhook", handlePaymentWebhook);
module.exports = router;
