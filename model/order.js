const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  { 
  image: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    require: true,
  },
  totalQuantity: {
    type: Number,
    require: true,
  },
  totalPrice: {
    type: Number,
    require: true,
  },    
  phoneNumber: {
    type: Number,
    require: true,
  },
  tax: {
    type: Number,
    require: true,
  },
});

module.exports = mongoose.model("Order", orderSchema);
