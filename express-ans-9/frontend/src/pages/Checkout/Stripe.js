import React,{useState} from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import {createOrder} from "../../store/ActionCreators/order.ts";
import {useDispatch} from "react-redux";
import currencyFormeter from "../../utils/formetCurrency";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51K4MH1SCUI6JQcpYq4nzDexHPPsZuBVTMZOPIcijhghtJx4UTggvcwIqBHuu9VWEi9Py4v04bFEXFXpWnFMfdddd00ISTPKSfL");

export default function Chechout({clientSecret,products}) {
 
  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
    <div className="container mx-auto">
      <div class="m-10">
        <h1 class="ml-5 mb-5 font-semibold text-3xl font-sans">E-Comm</h1>
        <div class="content-center flex flex-col md:flex-row rounded-xl overflow-hidden">
          <div class="basis-1/2">
            <img className="w-full h-full " src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="e-com"/>
          </div>
          <div class="bg-brandbg1 basis-1/2 p-5 lg:p-10">
            {!clientSecret ? (
              <h1 class="font-semibold text-3xl font-sans">Loading ...</h1>
            ) : (
              <Elements
                stripe={stripePromise}
                options={options}
              >
                <CheckoutForm products={products}/>
              </Elements>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}






function CheckoutForm({products}) {
  const stripe = useStripe();
  const elements = useElements();
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const subTotal = products.reduce((a,b)=>a+b.product.price,0);
  const shippingCharge = 10;

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(isLoading);

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const res = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/payment-success`,
      },
    });


    if(res.paymentIntent?.status === "succeeded"){
      let tp = products.map(p => {return {product: p._id,quantity: p.quantity}})
      dispatch(createOrder({products: tp}));
      console.log(email);
      navigator("/payment-success");
    }


    const error = res.error;
    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error?.type === "card_error" || error?.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs"
  }

  return (
    <>
    <form onSubmit={handleSubmit}>
       <LinkAuthenticationElement
         id="link-authentication-element"
         onChange={(e) => setEmail(e.target.value)}
       />
      <PaymentElement options={paymentElementOptions}/>
      <button class="w-full mt-5 p-2 bg-brandbg2 text-white rounded-md ">Pay Now {currencyFormeter(subTotal+shippingCharge)}</button>
       {/* Show any error or success messages */}
       {message && <div id="payment-message">{message}</div>}
    </form>
    </>
  );
}