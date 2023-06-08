const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  email: {
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
  totalTax: {
    type: Number,
    require: true,
  },
  status: {
    type: String,
    require: true,
  }
});

module.exports = mongoose.model("Order", orderSchema);
