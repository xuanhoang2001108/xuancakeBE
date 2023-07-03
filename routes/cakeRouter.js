const express = require("express");
const bodyParser = require("body-parser");
const cakeRouter = express.Router();

const {
  getAllCake,
  getSpecificCake,
  postCake,
  deleteCake,
  updateCake,
  calculateCake,
  searchCake,
} = require("../controller/cakeController");

cakeRouter.use(bodyParser.json());

cakeRouter.route("/getAllCake").get(getAllCake);
cakeRouter.route("/postCake").post(postCake);
cakeRouter.route("/deleteCake/:id").delete(deleteCake);
cakeRouter.route("/updateCake/:id").patch(updateCake);
cakeRouter.route("/getSpecificCake/:id").get(getSpecificCake);
cakeRouter.route("/calculateCake").get(calculateCake);
cakeRouter.route("/searchCake").get(searchCake);
module.exports = cakeRouter;
