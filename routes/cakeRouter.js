const express = require("express");
const bodyParser = require("body-parser");
const cakeRouter = express.Router();

const {
  getAllCake,
  getSpecificCake,
  postCake,
  deleteCake,
  updateCake,
} = require("../controller/cakeController");

cakeRouter.use(bodyParser.json());

cakeRouter.route("/getAllCake").get(getAllCake);
cakeRouter.route("/postCake").post(postCake);
cakeRouter.route("/deleteCake/:id").delete(deleteCake);
cakeRouter.route("/updateCake/:id").put(updateCake);
cakeRouter.route("/getSpecificCake/:id").get(getSpecificCake);

module.exports = cakeRouter;
