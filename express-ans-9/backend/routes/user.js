const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
const {isLoggedIn} = require("../middlewares/auth");

// Get all users
router.get('/', userController.getAllUsers);

// Get all users
router.get('/loggedIn', isLoggedIn,userController.getLoggedInUser);

// Get a single user
router.get('/:userId', userController.getUser);

// Create a new user
router.post('/', userController.createUser);

// Update an existing user
router.put('/:userId', userController.updateUser);

// Delete a user
router.delete('/:userId', userController.deleteUser);

module.exports = router;