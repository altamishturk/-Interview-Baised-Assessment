const stripe = require('stripe')('sk_test_51K4MH1SCUI6JQcpYuud8rlrUGEhEIHXOTYs81VSEzLUAccSFa73wO7Ap6qnKil4nLerGLh80zjRf5aLJf1debfyl00uaKP7KQz');
const bigPromice = require("../middlewares/bigPromice");
const Product = require("../Models/product");
const ShippingDetails = require("../Models/shippingDetails");
const Order = require("../Models/order");


module.exports.createCheckoutSessionStripe = bigPromice(async (req, res) => {

  const productIds = req.body.productsIds.map(p => p._id);
  let products = await Product.find({_id: {$in: productIds}});
  function getQuantity(_id){
    const p = req.body.productsIds.find(p => p._id === _id);
    return p.quantity;
  }

  const orderedItems = products.map(p => {
    return {
      price_data: {
        currency: "inr",
        product_data: {
          name: p.name,
          description:p.description,
          images: [p.images[0].url]
        },
        unit_amount: p.price * 100,
      },
      quantity: getQuantity(p._id.toString()),
    }
  })

  const totalPrice = products.reduce((a,b) => a + b.price,0);
  const t = req.body.productsIds.map(p => {return {product: p._id,quantity: p.quantity}});
  const order = await Order.create({products: t,user: req.user._id,totalPrice})
  console.log(order);

  const session = await stripe.checkout.sessions.create({
    line_items: orderedItems,
    mode: 'payment',
    success_url: `http://localhost:3000/payment-success`,
    cancel_url: `http://localhost:3000/payment-fail`,
  });


  

    const sd = await ShippingDetails.findOne({user: req.user._id});
    if(!sd){
      const shipping = req.body.shippingDeatils;
      await ShippingDetails.create({...shipping,fullName: `${shipping.firstName} ${shipping.lastName}`,user: req.user._id});
    }


    res.status(200).json({
        success: true,
        message: "",
        url: session.url
    })

});



module.exports.createPaymentIntentStripe = bigPromice(async (req, res) => {


    const { items } = req.body;
    const totalPrice = await calculateOrderAmount(items);

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalPrice,
      currency: "inr",
      // automatic_payment_methods: {
      //   enabled: true,
      // },
    });


    const sd = await ShippingDetails.findOne({user: req.user._id});
    if(!sd){
      const shipping = req.body.shippingDetails;
      await ShippingDetails.create({...shipping,fullName: `${shipping.firstName} ${shipping.lastName}`,user: req.user._id});
    }

    res.status(200).json({
        success: true,
        message: "",
        clientSecret: paymentIntent.client_secret,
    })

});


async function calculateOrderAmount(items){

  const ids = items.map(i => i._id);

  const products = await Product.find({_id: {$in: ids}});

  let totalamount = 0;

  products.forEach(product => {
    const pro = items.find(i => i._id === product._id.toString());
    totalamount += product.price*pro.quantity;
  })

  return totalamount;
}
