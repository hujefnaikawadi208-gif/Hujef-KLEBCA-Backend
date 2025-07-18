const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {auth} = require("../middleware/Auth");
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../Controller/ProductController");

router.post("/", auth,upload.single("image"), createProduct);

router.get("/", getAllProducts);

router.get("/:id", getProductById);

router.put("/:id", auth, upload.single("image"), updateProduct);

router.delete("/:id", auth, deleteProduct);

module.exports = router;
