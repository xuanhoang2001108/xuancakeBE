const asyncHandler = require("express-async-handler");
const Order = require("../model/order");

const postOrder = asyncHandler(async (req, res, next) => {
  const { email, totalQuantity, totalPrice, phoneNumber, totalTax, status } = req.body;

  const order = await Order.create({
    email,
    totalQuantity,
    totalPrice,
    phoneNumber,
    totalTax,
    status: "Pending",
  });
  if (order) {
    res.status(201).json(order);
  } else {
    res.status(400);
    throw new Error("Order data is not Valid");
  }
});

const getAllOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.find();
  if (order.length === 0) {
    res.status(404);
    throw new Error("Dont have any order!");
  }
  res.status(200).json(order);
});
const deleteOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  await Order.deleteOne({ _id: order._id });
  res.status(200).json({ message: "Order deleted successfully" });
});

const updateOrder = asyncHandler(async (req, res, next) => {
  const { id, email,phoneNumber, totalPrice, totalTax, status } = req.body;
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  order.id = id || order.id;
  order.email = email || order.email;
  order.phoneNumber = phoneNumber || order.phoneNumber;
  order.totalPrice = totalPrice || order.totalPrice;
  order.totalTax = totalTax || order.totalTax;
  order.status = status || order.status;
  const updatedOrder = await order.save();
  res.status(200).json(updatedOrder);
});
module.exports = {
  postOrder,
  getAllOrder,
  deleteOrder,
  updateOrder,
};
