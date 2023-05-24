const User = require("../Models/user");
const sendToken = require('../utils/sendToken');
const cloudinary = require("cloudinary").v2;
const bigPromice = require("../middlewares/bigPromice");

// Get all users
exports.getAllUsers = bigPromice(async (req, res) => {

    const users = await User.find();


    res.status(200).json({
        success: true,
        message: "__",
        users
      })

});

// Get a single user
exports.getUser = bigPromice(async (req, res) => {

    const user = await User.findById(req.params.userId);
 

    res.status(200).json({
        success: true,
        message: "__",
        user
      })

});

// Get a logged in user
exports.getLoggedInUser = bigPromice(async (req, res) => {

    res.status(200).json({
        success: true,
        message: "__",
        user: req.user
      })

});

// Create a new user
exports.createUser = bigPromice(async (req, res) => {

    const user = new User(req.body);
    
    // Use the Cloudinary uploader to upload the image
    // const img = await cloudinary.uploader.upload(req.body.profilePic,{folder:"e-comerce-website-(completed)"});
  
    // user.profilePic = {url: img.url,publicId: img.public_id}


    await user.save();

    req.user = user;

    sendToken(req,res);

});

// Update an existing user
exports.updateUser = bigPromice(async (req, res) => {

    const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });

    res.status(200).json({
        success: true,
        message: "__",
        user
      })

});

// Delete a user
exports.deleteUser = bigPromice(async (req, res) => {

    const user = await User.findByIdAndDelete(req.params.userId);
   
    res.status(200).json({
        success: true,
        message: "__",
        user
      })
 
});




