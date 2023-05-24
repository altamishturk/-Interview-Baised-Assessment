const Category = require('../Models/category');
const bigPromice = require("../middlewares/bigPromice");

// Get all categories
exports.getAll = bigPromice(async (req, res) => {

  const category = await Category.find();

  res.status(200).json({
    success: true,
    message: "___",
    category
  })
  
});

// Get a single category
exports.getById = bigPromice(async(req, res) => {

  const category = await Category.findById(req.params.categoryId)

  res.status(200).json({
    success: true,
    message: "___",
    category
  })

});

// Create a new category
exports.create = bigPromice(async(req, res) => {
  const category = new Category(req.body);
  
  await category.save();

  res.status(201).json({
    success: true,
    message: "___",
    category
  })

});

// Update an existing category
exports.update = bigPromice(async(req, res) => {

  const category = await Category.findByIdAndUpdate(req.params.categoryId, req.body, { new: true })

  res.status(200).json({
    success: true,
    message: "___",
    category
  })

 
});

// Delete a category
exports.deleteCategory = bigPromice(async(req, res) => {

  const category = await Category.findByIdAndRemove(req.params.categoryId);

  res.status(200).json({
    success: true,
    message: "___",
    category
  })
 
});