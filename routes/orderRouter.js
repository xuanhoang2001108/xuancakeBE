const express = require("express");
const bodyParser = require("body-parser");
const orderRouter = express.Router();

const { postOrder } = require("../controller/orderController");

orderRouter.use(bodyParser.json());

orderRouter.route("/post").post(postOrder);

module.exports = orderRouter;
