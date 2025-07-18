const express = require("express");
const {
  addRating,
  getAverageRating,
} = require("../Controller/RatingController");
const router = express.Router();
router.post("/", addRating);
router.get("/:productId/average", getAverageRating);

module.exports = router;
