const express = require('express');
const router = express.Router();
const {getAll,getById,create,update,deleteProduct} = require('../controllers/product');
const {isLoggedIn} = require("../middlewares/auth");

// Define the product routes
router.get('/', getAll);
router.get('/:productId', getById);
router.post('/',isLoggedIn, create);
router.put('/:productId',isLoggedIn, update);
router.delete('/:productId',isLoggedIn, deleteProduct);

module.exports = router;