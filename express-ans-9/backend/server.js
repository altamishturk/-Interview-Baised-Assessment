require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const cloudinary = require('cloudinary').v2;
// const axois = require("axios");
// const fs = require("fs");

// (async ()=>{
//   const {data} = await axois.get('https://dummyjson.com/products');
 
//   const myData = [];

//   data.products.forEach(element => {
//     let obj = {};

//     for (const key in element) {
//         if(key !== "id" && key !== "thumbnail"&&key !== "rating"&& key !== "rating"){
//           if(key === "title"){
//             obj.name = element[key]
//           }
//           else if(key === "stock"){
//             obj.quantity = element[key]
//           }
//           else if(key === "images"){
//             const imgarr = element[key].map(im => {return {url: im, publicId: ""}})
//             obj.images = imgarr
//           }
//           else{
//             obj[key] = element[key];
//           }
//         }
//     }

//     myData.push(obj);

//   });
//   const jsonData = JSON.stringify(myData);
                
//   //  fs.writeFile('data.json', jsonData, (err) => {
//   //      if (err) {
//   //        console.error(err);
//   //        return;
//   //      }
//   //      console.log('Data written to file');
//   //  });
// })();

cloudinary.config({
  cloud_name: process.env.CLOUDNARY_CLOUD_NAME,
  api_key: process.env.CLOUDNARY_API_KEY,
  api_secret: process.env.CLOUDNARY_API_SECRET
});


const corsOption = {
  origin: ['http://localhost:3000'],
};

app.use(cors());

const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost/mydb';

mongoose.connect(mongoURI);

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB connection established');
});

connection.on('error', (error) => {
  console.log(error);
});



app.use(express.json({limit: "1mb"}));
app.use(express.urlencoded({ extended: true }));



// Set up routes
app.get('/', (req, res) => {
  res.send('Welcome to the server!');
});



// import routes
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');
const categoryRoutes = require('./routes/category');
const reviewRoutes = require('./routes/review');
const cartRoutes = require('./routes/cart');
const paymentRoutes = require('./routes/payment');

// Define routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/reviews', reviewRoutes);
app.use('/api/v1/carts', cartRoutes);
app.use('/api/v1/payments', paymentRoutes);


// error handler middleware
const errorHandler = require('./middlewares/error'); 
app.use(errorHandler);


// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server listening on port ${port}`));