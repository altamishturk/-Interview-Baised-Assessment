const mongoose = require('mongoose');

const shippingDetailsSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  address1: {
    type: String,
    required: true
  },
  address2: {
    type: String,
    required: true
  },
  region: {
    type: String,
  },
  country: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  postalCode: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});


const User = mongoose.model('shipmentDetails', shippingDetailsSchema);

module.exports = User;