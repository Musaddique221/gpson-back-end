import Order from "../models/orderModel.js";
import asyncHandler from "express-async-handler";

/**
 * @desc		Create new order
 * @route		POST/orders
 * @access	public
 */

const addOrderItems = asyncHandler(async (req, res) => {
  const { name, image, category, brand, description, price, user } = req.body;

  const order = new Order({
    user,
    name,
    image,
    category,
    brand,
    description,
    price,
  });

  if (order) {
    const createOrder = await order.save();
    res.status(201).json(createOrder);
  } else {
    res.status(400);
    throw new Error("Something Went wrong");
  }
});

/**
 * @desc		Get logged in user's orders
 * @route		GET /myorders
 * @access	private
 */
const getMyOrders = asyncHandler(async (req, res) => {
  console.log(req.params.id, "38");
  try {
    const orders = await Order.find({ user: req.params.id });
    res.json(orders);
  } catch (err) {
    res.json(err.message);
  }
});

/**
 * @desc		Delete a product
 * @route		DELETE /cart/:id
 * @access	public/admin
 */

const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findByIdAndDelete(req.params.id);
  if (order) {
    res.json({ message: "order removed" });
  } else {
    res.status(404);
    throw new Error("order not found");
  }
});

export { addOrderItems, getMyOrders, deleteOrder };
