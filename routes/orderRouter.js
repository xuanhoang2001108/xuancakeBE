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
} = require("../controller/orderController");

orderRouter.use(bodyParser.json());

orderRouter.route("/postOrder").post(postOrder);
orderRouter.route("/getAllOrder").get(getAllOrder);
orderRouter.route("/deleteOrder/:id").delete(deleteOrder);
orderRouter.route("/updateOrder/:id").patch(updateOrder);
orderRouter.route("/getSpecificOrder/:email").get(getSpecificOrder);
orderRouter.route("/calculateTotalEarn").get(calculateTotalEarn);
orderRouter.route("/calculateTotalOrdersInMonth").get(calculateTotalOrdersInMonth);
module.exports = orderRouter;
