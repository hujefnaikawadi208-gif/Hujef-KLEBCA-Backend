const Product = require("../Model/Products");
const Rating = require("../Model/Rating");

exports.createProduct = async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json({ message: "Product created", product: newProduct });
  } catch (error) {
    next(error);
  }
};

exports.getAllProducts = async (req, res, next) => {
  try {
    const { category, minPrice, maxPrice, search } = req.query;

    const filter = {};

    if (category) filter.category = category;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    const products = await Product.find(filter);
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const ratings = await Rating.find({ productId });

    let averageRating = 0;
    if (ratings.length > 0) {
      const sum = ratings.reduce((total, rating) => total + rating.rating, 0);
      averageRating = sum / ratings.length;
    }
    const response = {
      ...product.toObject(),
      averageRating: parseFloat(averageRating.toFixed(1)),
      totalRatings: ratings.length,
      outOf5: 5,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  console.log(req.body);
  try {
    if (req.file) {
      console.log(req.file.filename)
      req.body.imageUrl = `/uploads/${req.file.filename}`;
    }
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product updated", product: updated });
  } catch (error) {
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (error) {
    next(error);
  }
};

exports.bulkUploadProducts = async (req, res, next) => {
  try {
    const products = req.body.products; // expect array
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "No products provided" });
    }

    const inserted = await Product.insertMany(products, { ordered: false });
    res.status(201).json({ message: "Products uploaded", inserted });
  } catch (error) {
    next(error);
  }
};