const asyncHandler = require("express-async-handler");
const Order = require("../model/order");

const postOrder = asyncHandler(async (req, res, next) => {
  const {
    image,
    email,
    totalQuantity,
    totalPrice,
    phoneNumber,
    tax,
  } = req.body;

  const order = await Order.create({
    image,
    email,
    totalQuantity,
    totalPrice,
    phoneNumber,
    tax,
  });
  if (order) {
    res.status(201).json(order);
  } else {
    res.status(400);
    throw new Error("Order data is not Valid");
  }
});

module.exports = {
  postOrder,
};
