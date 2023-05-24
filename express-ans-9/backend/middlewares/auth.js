const jwt = require('jsonwebtoken');
const User = require("../Models/user");


const isLoggedIn = async (req, res, next)=>{
    try {
        const token = req.headers.authorization.split(' ')[1];
        
        // console.log(token);
        
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);

        const currentTime = Math.floor(Date.now() / 1000);
        // console.log(currentTime,decodedToken.exp);
        if(decodedToken.exp < currentTime){
          return res.send({
            success: false,
            message: "Sesion Explred Login again"
          })
        }
  

        const user = await User.findById(decodedToken._doc._id);

        
        if (!user) {
          return res.send({
            success: false,
            message: "Please Login"
          })
        }
        
        req.user = user;
        
        next();
      } catch (error) {
        res.status(401).json({
          message: 'Auth failed',
        });
      }
}


const isAdmin = (req, res, next)=>{
    
    // User.findById(req.user._id)
    //   .then((user) => {
    //     if (user.isAdmin) {
    //       next();
    //     } else {
    //       res.status(401).json({ message: 'Unauthorized' });
    //     }
    //   })
    //   .catch((error) => {
    //     res.status(500).json({ message: 'Something went wrong' });
    //   });
}



module.exports = {isLoggedIn,isAdmin}