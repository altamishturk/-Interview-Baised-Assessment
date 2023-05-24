const express = require('express');
const router = express.Router();
const { deleteCart, update, create, getById, getAll, getByUserId, addCartItem, removeCartItem } = require('../controllers/cart');
const {isLoggedIn} = require("../middlewares/auth");

// Define the review routes
router.get('/', getAll);
router.get('/:cartId', getById);
router.get('/user/:userId', isLoggedIn,getByUserId);
router.post('/', isLoggedIn,create);
router.put('/:cartId', isLoggedIn,update);
router.put('/add/:cartId', isLoggedIn,addCartItem);
router.put('/remove/:cartId/:productId',isLoggedIn, removeCartItem);
router.delete('/:cartId', isLoggedIn,deleteCart);

module.exports = router;