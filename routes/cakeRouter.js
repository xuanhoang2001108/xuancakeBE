const express = require("express");
const bodyParser = require("body-parser");
const cakeRouter = express.Router();

const {
  getAllCake,
  getSpecificCake,
  postCake,
  deleteCake,
  putCake,
} = require("../controller/cakeController");

cakeRouter.use(bodyParser.json());

cakeRouter.route("/getAllCake").get(getAllCake);
cakeRouter.route("/postCake").post(postCake); 
// cakeRouter.route("/delete/:id").delete(deleteCake);
// cakeRouter.route("/put/:id").put(putCake);

cakeRouter.route("/getSpecificCake/:id").get(getSpecificCake);

module.exports = cakeRouter;
