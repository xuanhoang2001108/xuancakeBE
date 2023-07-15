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

const getAllCake = asyncHandler(async (req, res) => {
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
    comments: comments ? [{ email, comment: comments }] : [],
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
    cake.comments.push({
      email,
      comment,
      
    });
  }

  const updatedCake = await cake.save();
  const populatedCake = await Cake.findById(updatedCake._id)
    .populate("comments.user", "email")
    .exec();

  res.status(200).json(populatedCake);
});
const calculateCake = asyncHandler(async (req, res) => {
  const cakeCounts = await Cake.aggregate([
    { $group: { _id: "$type", count: { $sum: 1 } } },
  ]);

  if (cakeCounts.length === 0) {
    res.status(404);
    throw new Error("No cakes found");
  }

  res.status(200).json(cakeCounts);
});
const searchCake = asyncHandler(async (req, res, next) => {
  const { searchTerm } = req.query;

  try {
    // Define the search query
    const query = searchTerm ? { name: { $regex: searchTerm, $options: "i" } } : {};

    // Search for cakes based on the query
    const cakes = await Cake.find(query);

    if (cakes.length === 0) {
      res.status(404).json({ message: "No cakes found" });
    } else {
      res.status(200).json(cakes);
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = {
  getAllCake,
  getSpecificCake,
  postCake,
  deleteCake,
  updateCake,
  calculateCake,
  searchCake,
};
