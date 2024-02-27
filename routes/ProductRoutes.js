import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

/**
 * @desc		Get all products
 * @route		GET /
 * @access	public
 */

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

/**
 * @desc		Get single product
 * @route		GET /api/products/:id
 * @access	public
 */

const getProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "product not found" });
    }
  } catch (error) {
    console.log(`${error}`);
    res.status(500).json({ message: "something went wrong" });
  }
});

export { getProducts, getProductById };
