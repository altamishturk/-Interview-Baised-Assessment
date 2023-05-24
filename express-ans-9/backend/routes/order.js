const express = require('express');
const router = express.Router();
const {getAll,getById,create,update,deleteOrder, getMyOrders} = require('../controllers/order');
const {isLoggedIn} = require("../middlewares/auth");

// Define the order routes
router.get('/', isLoggedIn,getAll);
router.get('/my-orders', isLoggedIn,getMyOrders);
router.get('/:orderId', isLoggedIn,getById);
router.post('/', isLoggedIn,create);
router.put('/:orderId', isLoggedIn,update);
router.delete('/:orderId',isLoggedIn, deleteOrder);

module.exports = router;