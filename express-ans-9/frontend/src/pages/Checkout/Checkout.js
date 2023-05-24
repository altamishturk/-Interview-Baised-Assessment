import React, { useState } from "react";
import currencyFormeter from "../../utils/formetCurrency";
import fetchRequest from "../../utils/fatchRequest";
import {useSelector} from "react-redux";
import Payment from "./Stripe"; 

export default function Checkout() {
    const cart = useSelector(state => state.cart);
    const [productsToBuy, setProductsToBuy] = useState(cart?.products);
    const [shippingDetails, setShippingDetails] = useState({
        firstName: "",
        lastName: "",
        address1: "",
        address2: "test",
        city: "",
        region: "",
        country: "india",
        postalCode: "",
        phoneNumber: "8684864632",
        state: "up",
        email: "",
        saveInfo: "",
        notes: ""
    });
    const productsIds = productsToBuy.map(p => {return {_id: p.product._id,quantity: p.quantity}});
    const [displayPaymentPage, setDisplayPaymentPage] = useState(false);
    const [clientSecret, setClientSecret] = useState("");
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const url = "http://localhost:4000/api/v1/payments/stripe/create-payment-intent";
        const res = await fetchRequest(url,"POST",{ items: productsIds,shippingDetails })
        if(res.success){
            setClientSecret(res.clientSecret);
            setDisplayPaymentPage(true);
        }
    }
    
   

    return (
        <div class="container p-12 mx-auto">
        <div class="flex flex-col w-full px-0 mx-auto md:flex-row">
            {
              displayPaymentPage?  <><Payment clientSecret={clientSecret} products={productsToBuy}/></>:<>
              <div class="flex flex-col md:w-full">
                <ShippingAddress handleSubmit={handleSubmit} setShippingDetails={setShippingDetails} shippingDetails={shippingDetails}/>
               </div>
               <div class="flex flex-col w-full ml-0 lg:ml-12 lg:w-2/5">
                   <OrderSummery products={productsToBuy} setProductsToBuy={setProductsToBuy}/>
               </div>
              </>
            }
        </div>
    </div>
    );
}



function ShippingAddress({handleSubmit,shippingDetails,setShippingDetails}){

    const handleChange = (e)=> {
        setShippingDetails(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    return (
        <>
        <h2 class="mb-4 font-bold md:text-xl text-heading ">Shipping Address
                </h2>
                <form onSubmit={(e)=>handleSubmit(e)} class="justify-center w-full mx-auto" method="post">
                    <div class="">
                        <div class="space-x-0 lg:flex lg:space-x-4">
                            <div class="w-full lg:w-1/2">
                                <label for="firstName" class="block mb-3 text-sm font-semibold text-gray-500">First
                                    Name</label>
                                <input 
                                value={shippingDetails.firstName}
                                onChange={handleChange}
                                name="firstName" 
                                type="text" 
                                placeholder="First Name"
                                class="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"/>
                            </div>
                            <div class="w-full lg:w-1/2 ">
                                <label for="firstName" class="block mb-3 text-sm font-semibold text-gray-500">Last
                                    Name</label>
                                <input 
                                 value={shippingDetails.lastName}
                                onChange={handleChange}
                                name="lastName" 
                                type="text" 
                                placeholder="Last Name"
                                class="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"/>
                            </div>
                        </div>
                        <div class="mt-4">
                            <div class="w-full">
                                <label for="Email"
                                    class="block mb-3 text-sm font-semibold text-gray-500">Email</label>
                                <input 
                                 value={shippingDetails.email}
                                onChange={handleChange}
                                name="email" 
                                type="text" 
                                placeholder="Email"
                                class="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"/>
                            </div>
                        </div>
                        <div class="mt-4">
                            <div class="w-full">
                                <label for="Address"
                                    class="block mb-3 text-sm font-semibold text-gray-500">Address</label>
                                <textarea
                                onChange={handleChange}
                                value={shippingDetails.address1}
                                class="w-full px-4 py-3 text-xs border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                                name="address1" 
                                cols="20" 
                                rows="4" 
                                placeholder="Address"></textarea>
                            </div>
                        </div>
                        <div class="space-x-0 lg:flex lg:space-x-4">
                            <div class="w-full lg:w-1/2">
                                <label for="city"
                                    class="block mb-3 text-sm font-semibold text-gray-500">City</label>
                                <input 
                                onChange={handleChange}
                                value={shippingDetails.city}
                                name="city" 
                                type="text" 
                                placeholder="City"
                                class="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"/>
                            </div>
                            <div class="w-full lg:w-1/2 ">
                                <label for="postcode" class="block mb-3 text-sm font-semibold text-gray-500">
                                    Postcode</label>
                                <input 
                                value={shippingDetails.postalCode}
                                onChange={handleChange}
                                name="postalCode" 
                                type="text" 
                                placeholder="Post Code"
                                class="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"/>
                            </div>
                        </div>
                        <div class="flex items-center mt-4">
                            <label class="flex items-center text-sm group text-heading">
                                <input 
                                value={shippingDetails.saveInfo}
                                onChange={handleChange}
                                name="saveInfo"
                                type="checkbox"
                                class="w-5 h-5 border border-gray-300 rounded focus:outline-none focus:ring-1"/>
                                <span class="ml-2">Save this information for next time</span></label>
                        </div>
                        <div class="relative pt-3 xl:pt-6"><label for="note"
                                class="block mb-3 text-sm font-semibold text-gray-500"> Notes
                                (Optional)</label>
                                <textarea 
                                value={shippingDetails.notes}
                                onChange={handleChange}
                                name="notes"
                                class="flex items-center w-full px-4 py-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
                                rows="4" 
                                placeholder="Notes for delivery"></textarea>
                        </div>
                        <div class="mt-4">
                            <button
                                class="w-full px-6 py-2 text-white bg-brandbg2 hover:bg-brandbg2Hover">Process</button>
                        </div>
                    </div>
                </form>
        </>
    )
}


function OrderSummery({products,setProductsToBuy}){
    const subTotal = products.reduce((a,b)=>a+b.product.price,0);
    const shippingCharge = 10;

    const handleRemoveProduct =(_id)=> {
        setProductsToBuy(prev => {
            return prev.filter(product => product.product._id !== _id);
        })
    }

    return (
        <>
          <div class="pt-12 md:pt-0 2xl:ps-4">
         <h2 class="text-xl font-bold">Order Summary
                    </h2>
                    <div class="mt-8">
                        <div class="flex flex-col space-y-4">
                            {
                                products.map((product,i) => {
                                    const desc = product.product?.description;
                                    return <>
                                    <div class="flex space-x-4" key={i}>
                                            <div>
                                                <img src={product.product?.images? product.product?.images[0].url:""} alt="product"
                                                    class="w-60"/>
                                            </div>
                                            <div>
                                                <h2 class="text-xl font-bold">{product.product?.name}</h2>
                                                <p class="text-sm">{desc.slice(0,37)}...</p>
                                                <span class="text-red-600">Price</span> {currencyFormeter(product.product?.price)}
                                            </div>
                                            <div>
                                                <svg onClick={()=>handleRemoveProduct(product.product._id)} xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none"
                                                    viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                        d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </div>
                                        </div>
                                    </>
                                })
                            }
                            
                        </div>
                    </div>
                    <div class="flex p-4 mt-4">
                        <h2 class="text-xl font-bold">ITEMS 2</h2>
                    </div>
                    <div
                        class="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                        Subtotal<span class="ml-2">{currencyFormeter(subTotal)}</span></div>
                    <div
                        class="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                        Shipping Charge<span class="ml-2">{currencyFormeter(shippingCharge)}</span></div>
                    <div
                        class="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                        Total<span class="ml-2">{currencyFormeter(subTotal+shippingCharge)}</span></div>
            </div>            
        </>
    )
}

