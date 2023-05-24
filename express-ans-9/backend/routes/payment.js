const express = require('express');
const router = express.Router();

const {createCheckoutSessionStripe,createPaymentIntentStripe} = require('../controllers/payment');
const {isLoggedIn} = require("../middlewares/auth");


// Get all users
router.post('/stripe/create-checkout-session', isLoggedIn,createCheckoutSessionStripe);
router.post('/stripe/create-payment-intent', isLoggedIn,createPaymentIntentStripe);

module.exports = router;