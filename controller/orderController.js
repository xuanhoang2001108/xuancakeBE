const asyncHandler = require("express-async-handler");
const Order = require("../model/order");

const postOrder = asyncHandler(async (req, res, next) => {
  const {
    email,
    totalQuantity,
    totalPrice,
    phoneNumber,
    totalTax,
    status,
    paymentStatus,
  } = req.body;

  const order = await Order.create({
    email,
    totalQuantity,
    totalPrice,
    phoneNumber,
    totalTax,
    status: "Pending",
    paymentStatus: "Not Paid",
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
  const orders = await Order.find({ paymentStatus: "Paid" });
  if (orders.length === 0) {
    res.status(404);
    throw new Error("No paid orders found!");
  }

  const monthlyEarnings = Array(12).fill(0); // Initialize an array to store earnings for each month

  orders.forEach((order) => {
    const orderMonth = order.createdAt.getMonth();
    monthlyEarnings[orderMonth] += order.totalPrice;
  });

  res.status(200).json({ monthlyEarnings });
});
const calculateTotalProvisionalEarning = asyncHandler(
  async (req, res, next) => {
    const orders = await Order.find();
    if (orders.length === 0) {
      res.status(404);
      throw new Error("No paid orders found!");
    }

    const monthlyProvisionalEarnings = Array(12).fill(0); // Initialize an array to store earnings for each month

    orders.forEach((order) => {
      const orderMonth = order.createdAt.getMonth();
      monthlyProvisionalEarnings[orderMonth] += order.totalPrice;
    });
    res.status(200).json({ monthlyProvisionalEarnings });
  }
);

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

const calculateTotalPaidOrdersInMonth = asyncHandler(async (req, res, next) => {
  const orders = await Order.find({ paymentStatus: "Paid" });
  if (orders.length === 0) {
    res.status(404);
    throw new Error("No orders found!");
  }

  const monthlyPaidOrders = Array(12).fill(0); // Initialize an array to store total orders for each month

  orders.forEach((order) => {
    const orderMonth = order.createdAt.getMonth();
    monthlyPaidOrders[orderMonth]++;
  });

  res.status(200).json({ monthlyPaidOrders });
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
  const { email, phoneNumber, totalPrice, totalTax, status, paymentStatus } =
    req.body;

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
  order.paymentStatus = paymentStatus || order.paymentStatus;

  const updatedOrder = await order.save();
  res.status(200).json(updatedOrder);
});
const searchOrder = asyncHandler(async (req, res, next) => {
  const { searchTerm } = req.query;

  try {
    console.log("Search term:", searchTerm);

    let query = {};

    if (searchTerm) {
      if (!isNaN(searchTerm)) {
        // Nếu searchTerm là một chuỗi số
        query = {
          phoneNumber: searchTerm,
        };
      } else {
        // Nếu searchTerm là một chuỗi không phải số
        query = {
          email: { $regex: searchTerm, $options: "i" },
        };
      }
    }

    console.log("Query:", query);

    const orders = await Order.find(query);

    console.log("Orders:", orders);

    if (orders.length === 0) {
      res.status(404).json({ message: "No order found" });
    } else {
      res.status(200).json(orders);
    }
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
const cancelOrder = asyncHandler(async (req, res, next) => {
  const orderId = req.params.id;
  const order = await Order.findById(orderId);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  if (order.status !== "Pending") {
    res.status(400);
    throw new Error("Cannot cancel order");
  }

  order.status = "Canceled";
  const canceledOrder = await order.save();
  res.status(200).json(canceledOrder);
});

module.exports = {
  postOrder,
  getAllOrder,
  deleteOrder,
  updateOrder,
  getSpecificOrder,
  calculateTotalEarn,
  calculateTotalOrdersInMonth,
  searchOrder,
  cancelOrder,
  calculateTotalProvisionalEarning,
  calculateTotalPaidOrdersInMonth,
};
