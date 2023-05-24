const Review = require('../Models/review');
const bigPromice = require("../middlewares/bigPromice");
const cloudinary = require("cloudinary").v2;

// Get all reviews
exports.getAll = bigPromice(async(req, res) => {

  const reviews = await Review.find({});
  
  res.status(200).json({
    success: true,
    message: "__",
    reviews
  })
  
});

// Get a single review
exports.getById = bigPromice(async(req, res) => {

  const review = await Review.findById(req.params.reviewId);

  res.status(200).json({
    success: true,
    message: "__",
    review
  })

});

// Get a single review
exports.getReviewsByProductId = bigPromice(async(req, res) => {

  const reviews = await Review.find({product: req.params.productId}).populate({path: "user",select: "name profilePic"});

  res.status(200).json({
    success: true,
    message: "__",
    reviews
  })

});

// Create a new review
exports.create = bigPromice(async(req, res) => {

  const review = new Review(req.body);

  const images = [];

  for (let i = 0; i < req.body.images?.length; i++) {
    const img = await cloudinary.uploader.upload(req.body.images[i],{folder:"e-comerce-website-(completed)"})
    // console.log(img);
    images.push({url: img.url,publicId: img.public_id})
  }

  review.images = images;
  review.user = req.user._id;


  await review.save();

  res.status(201).json({
    success: true,
    message: "__",
    review
  })

});

// Update an existing review
exports.update = bigPromice(async(req, res) => {

  const review = await Review.findByIdAndUpdate(req.params.reviewId,req.body, { new: true });

  res.status(200).json({
    success: true,
    message: "__",
    review
  })

});

// Delete a review
exports.deleteReview = bigPromice(async(req, res) => {

  const review = await Review.findByIdAndRemove(req.params.reviewId);

  res.status(200).json({
    success: true,
    message: "__",
    review
  })

});
