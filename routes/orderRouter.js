const express = require("express");
const bodyParser = require("body-parser");
const orderRouter = express.Router();

const {
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
} = require("../controller/orderController");
const order = require("../model/order");

orderRouter.use(bodyParser.json());

orderRouter.route("/postOrder").post(postOrder);
orderRouter.route("/getAllOrder").get(getAllOrder);
orderRouter.route("/deleteOrder/:id").delete(deleteOrder);
orderRouter.route("/updateOrder/:id").patch(updateOrder);
orderRouter.route("/getSpecificOrder/:email").get(getSpecificOrder);
orderRouter.route("/calculateTotalEarn").get(calculateTotalEarn);
orderRouter
  .route("/calculateTotalProvisionalEarning")
  .get(calculateTotalProvisionalEarning);
orderRouter
  .route("/calculateTotalPaidOrdersInMonth")
  .get(calculateTotalPaidOrdersInMonth);
orderRouter
  .route("/calculateTotalOrdersInMonth")
  .get(calculateTotalOrdersInMonth);
orderRouter.route("/searchOrder").get(searchOrder);
orderRouter.route("/cancelOrder/:id").patch(cancelOrder);
module.exports = orderRouter;
