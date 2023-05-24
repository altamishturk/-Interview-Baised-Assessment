const express = require('express');
const router = express.Router();
const {getAll,getById,create,update,deleteReview, getReviewsByProductId} = require('../controllers/review');
const {isLoggedIn} = require("../middlewares/auth");


// Define the review routes
router.get('/', getAll);
router.get('/:reviewId', getById);
router.get('/product/:productId', getReviewsByProductId);
router.post('/', isLoggedIn,create);
router.put('/:reviewId', isLoggedIn,update);
router.delete('/:reviewId',isLoggedIn, deleteReview);

module.exports = router;