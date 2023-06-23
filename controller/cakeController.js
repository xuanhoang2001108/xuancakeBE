const asyncHandler = require("express-async-handler");
const Cake = require("../model/cake");

const getSpecificCake = asyncHandler(async (req, res, next) => {
  const cakes = await Cake.findById(req.params.id);
  if (cakes.length === 0) {
    res.status(404);
    throw new Error("Dont have any cake!");
  }
  res.status(200).json(cakes);
});

const getAllCake = asyncHandler(async (req,res, ) => {
  const cakes = await Cake.find();
  if (cakes.length === 0) {
    res.status(404);
    throw new Error("Dont have any cake!");
  }
  res.status(200).json(cakes);
});

const postCake = asyncHandler(async (req, res) => {
  const { name, image, type, price, comments, description, email } = req.body;

  const cake = await Cake.create({
    name,
    image,
    type,
    price,
    comments: [{ email, comment: comments }],
    description,
    email,
  });
  if (cake) {
    res.status(201).json(cake);
  } else {
    res.status(400);
    throw new Error("Cake data is not Valid");
  }
});
const deleteCake = asyncHandler(async (req, res, next) => {
  const cake = await Cake.findById(req.params.id);

  if (!cake) {
    res.status(404);
    throw new Error("Cake not found");
  }

  await Cake.deleteOne({ _id: cake._id });
  res.status(200).json({ message: "Cake deleted successfully" });
});

const updateCake = asyncHandler(async (req, res) => {
  const { name, image, type, price, email, comment, description } = req.body;
  const cake = await Cake.findById(req.params.id);

  if (!cake) {
    res.status(404);
    throw new Error("Cake not found");
  }

  cake.name = name || cake.name;
  cake.image = image || cake.image;
  cake.type = type || cake.type;
  cake.price = price || cake.price;
  cake.description = description || cake.description;
  cake.comments = cake.comments || [];
  if (email && comment) {
    cake.comments.push({ email, comment, user: req.user ? req.user._id : null });
  }

  const updatedCake = await cake.save();
  const populatedCake = await Cake.findById(updatedCake._id)
  .populate("comments.user", "email")
  .exec();

res.status(200).json(populatedCake);
});

module.exports = {
  getAllCake,
  getSpecificCake,
  postCake,
  deleteCake,
  updateCake,
};
