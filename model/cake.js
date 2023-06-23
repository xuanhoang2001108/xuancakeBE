const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  // Định nghĩa các trường của model "User"
  // ...
});
const User = mongoose.model("User", userSchema);
const cakeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    tax: {
      type: Number,
      required: true,
      default: 0.01,
    },
    comment: String,
    description: {
      type: String,
      required: true,
    },
    email: String,
    comments: [
      {
        email: String,
        comment: String,
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cake", cakeSchema);
