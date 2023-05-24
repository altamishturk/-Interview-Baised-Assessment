const express = require('express');
const router = express.Router();
const {getAll,getById, create, update, deleteCategory} = require('../controllers/category');
const {isLoggedIn} = require("../middlewares/auth");

// Define the category routes
router.get('/', getAll);
router.get('/:categoryId', getById);
router.post('/', isLoggedIn,create);
router.put('/:categoryId', isLoggedIn,update);
router.delete('/:categoryId', isLoggedIn,deleteCategory);

module.exports = router;
