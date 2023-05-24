const Product = require('../Models/product');
const cloudinary = require("cloudinary").v2;
const bigPromice = require("../middlewares/bigPromice");


// Get all products
exports.getAll = bigPromice(async (req, res) => {

  const products = await Product.find();

  res.status(200).json({
    success: true,
    message: "__",
    products
  })
   
});
  
  // Get a single product
  exports.getById =  bigPromice(async(req, res) => {


    const product = await Product.findById(req.params.productId);

    res.status(200).json({
      success: true,
      message: "__",
      product
    })
    
  });
  
  // Create a new product
  exports.create =  bigPromice(async (req, res) => {
        const product = new Product(req.body);

        const images = [];

        for (let i = 0; i < req.body.images?.length; i++) {
          const img = await cloudinary.uploader.upload(req.body.images[i],{folder:"e-comerce-website-(completed)"})
          // console.log(img);
          images.push({url: img.url,publicId: img.public_id})
        }


        product.images = images;

        await product.save();

        res.status(201).json({
          success: true,
          message: "__",
          product
        })
  });
  
  // Update an existing product
  exports.update =  bigPromice(async(req, res) => {

    const product = await Product.findByIdAndUpdate(req.params.productId, req.body, { new: true });

    res.status(200).json({
      success: true,
      message: "__",
      product
    })
    
  });
  

  // Delete a product
  exports.deleteProduct =  bigPromice(async(req, res) => {

    const product = await Product.findByIdAndRemove(req.params.productId);

    res.status(200).json({
      success: true,
      message: "__",
      product
    })
   
  });