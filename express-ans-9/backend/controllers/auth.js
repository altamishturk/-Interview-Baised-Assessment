const User = require("../Models/user");
const sendToken = require("../utils/sendToken");
const bigPromice = require("../middlewares/bigPromice");
const ErrorHandler = require("../utils/ErrorHandler");

// Login a user
exports.login = bigPromice(async (req, res,next) => {

      // Find the user with the provided email
      const user = await User.findOne({ email: req.body.email });

      if (!user) {
        return next(new ErrorHandler(400,"Email or password is incorrect"))
      }

      // Check if the password is correct
      const isMatch = await user.comparePassword(req.body.password);

      if (!isMatch) {
        return next(new ErrorHandler(400,"Email or password is incorrect"))
      }

      req.user = user;

      sendToken(req,res);

});


  // Logout a user
exports.logout = bigPromice(async(req, res) => {

      res.cookie("token", null, {
          expires: new Date(Date.now()),
          httpOnly: true,
      });

      res.status(200).json({
        success: true,
        message: "logout success!"
      })
})


