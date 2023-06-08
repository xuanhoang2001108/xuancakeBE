const express = require("express");
const bodyParser = require("body-parser");
const orderRouter = express.Router();

const {
  postOrder,
  getAllOrder,
  deleteOrder,
  updateOrder,
} = require("../controller/orderController");

orderRouter.use(bodyParser.json());

orderRouter.route("/postOrder").post(postOrder);
orderRouter.route("/getAllOrder").get(getAllOrder);
orderRouter.route("/deleteOrder/:id").delete(deleteOrder);
orderRouter.route("/updateOrder/:id").put(updateOrder);
module.exports = orderRouter;
