const asyncHandler = require("express-async-handler");
const Order = require("../model/order");

const postOrder = asyncHandler(async (req, res, next) => {
  const { email, totalQuantity, totalPrice, phoneNumber, totalTax, status } =
    req.body;

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
    throw new Error("Order data is not valid");
  }
});

const getSpecificOrder = asyncHandler(async (req, res, next) => {
  const email = req.params.email;
  const order = await Order.find({ email });
  if (order.length === 0) {
    res.status(404);
    throw new Error("No orders found!");
  }
  res.status(200).json(order);
});

const getAllOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.find();
  if (order.length === 0) {
    res.status(404);
    throw new Error("No orders found!");
  }
  res.status(200).json(order);
});
const calculateTotalEarn = asyncHandler(async (req, res, next) => {
  const orders = await Order.find();
  if (orders.length === 0) {
    res.status(404);
    throw new Error("No orders found!");
  }

  const monthlyEarnings = Array(12).fill(0); // Initialize an array to store earnings for each month

  orders.forEach((order) => {
    const orderMonth = order.createdAt.getMonth();
    monthlyEarnings[orderMonth] += order.totalPrice;
  });

  res.status(200).json({ monthlyEarnings });
});
const calculateTotalOrdersInMonth = asyncHandler(async (req, res, next) => {
  const orders = await Order.find();
  if (orders.length === 0) {
    res.status(404);
    throw new Error("No orders found!");
  }

  const monthlyOrders = Array(12).fill(0); // Initialize an array to store total orders for each month

  orders.forEach((order) => {
    const orderMonth = order.createdAt.getMonth();
    monthlyOrders[orderMonth]++;
  });

  res.status(200).json({ monthlyOrders });
});


const deleteOrder = asyncHandler(async (req, res, next) => {
  const orderId = req.params.id;
  const order = await Order.findById(orderId);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  await Order.deleteOne({ _id: orderId });
  res.status(200).json({ message: "Order deleted successfully" });
});

const updateOrder = asyncHandler(async (req, res, next) => {
  const orderId = req.params.id;
  const { email, phoneNumber, totalPrice, totalTax, status } = req.body;

  const order = await Order.findById(orderId);
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

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
  getSpecificOrder,
  calculateTotalEarn,
  calculateTotalOrdersInMonth,
};
