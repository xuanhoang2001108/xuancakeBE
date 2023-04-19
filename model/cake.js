const mongoose = require("mongoose");
const cakeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
    type: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    tax: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Cake", cakeSchema);
