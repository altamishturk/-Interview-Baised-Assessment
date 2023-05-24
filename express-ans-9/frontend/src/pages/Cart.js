import React,{useState,useEffect} from "react";
import {useDispatch,useSelector} from "react-redux";
import {getCart, removeCartItem} from "../store/ActionCreators/cart";
import currencyFormeter from "../utils/formetCurrency";
import {Link, useNavigate} from "react-router-dom";

export default function Cart({show,setShow}) {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const [totalAmount, setTotalAmount] = useState(0);
    const [tax, setTax] = useState(0);
    const [shipping, setShipping] = useState(0);
    const navigator = useNavigate();

    const handleRemove =(productId)=>{
        dispatch(removeCartItem(cart._id,productId));
    }

    useEffect(()=>{
        if(cart?.products?.length > 0){
            const totalAmt = cart.products.reduce((a,b)=> a + b.product.price,0);
            setTotalAmount(totalAmt);
            setTax(10);
            setShipping(100);
        }
    },[cart])

    useEffect(() => {
        if(!cart){
            dispatch(getCart());
        }
    }, [dispatch,cart]);
    
    return (
        <>
            <div className="w-full min-h-screen bg-gray-900 fixed top-0 right-0 z-10">
                    <div className="w-full min-h-screen bg-black bg-opacity-90 top-0 left-0 overflow-y-auto overflow-x-hidden fixed z-1000" id="chec-div">
                        <div className="w-full absolute z-10 right-0 h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700" id="checkout">
                            <div className="flex md:flex-row flex-col justify-end" id="cart">
                                <div className="lg:w-1/2 w-full md:pl-10 pl-4 pr-10 md:pr-4 md:py-12 py-8 bg-white overflow-y-auto overflow-x-hidden h-screen" id="scroll">
                                    <div className="flex items-center text-gray-500 hover:text-gray-600 cursor-pointer">
                                        <Link to="/">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-left" width={16} height={16} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <polyline points="15 6 9 12 15 18" />
                                        </svg>
                                        <p className="text-sm pl-2 leading-none">Back</p>
                                        </Link>
                                    </div>
                                    <p className="text-5xl font-black leading-10 text-gray-800 pt-3">Bag</p>
                                    {
                                        cart && cart.products.map((product,i)=>{
                                            return <CartItem key={i} p={product} handleRemove={handleRemove}/>
                                        })
                                    }
                                </div>
                                <div className="xl:w-1/2 md:w-1/3 xl:w-1/4 w-full bg-gray-100 h-full">
                                    <div className="flex flex-col md:h-screen px-14 py-20 justify-between overflow-y-auto">
                                        <div>
                                            <p className="text-4xl font-black leading-9 text-gray-800">Summary</p>
                                            <div className="flex items-center justify-between pt-16">
                                                <p className="text-base leading-none text-gray-800">Subtotal</p>
                                                <p className="text-base leading-none text-gray-800">{currencyFormeter(totalAmount)}</p>
                                            </div>
                                            <div className="flex items-center justify-between pt-5">
                                                <p className="text-base leading-none text-gray-800">Shipping</p>
                                                <p className="text-base leading-none text-gray-800">{currencyFormeter(shipping)}</p>
                                            </div>
                                            <div className="flex items-center justify-between pt-5">
                                                <p className="text-base leading-none text-gray-800">Tax</p>
                                                <p className="text-base leading-none text-gray-800">{currencyFormeter(tax)}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex items-center pb-6 justify-between lg:pt-5 pt-20">
                                                <p className="text-2xl leading-normal text-gray-800">Total</p>
                                                <p className="text-2xl font-bold leading-normal text-right text-gray-800">{currencyFormeter(totalAmount+shipping+tax)}</p>
                                            </div>
                                            <button onClick={() => {navigator('/checkout',{state: cart.products});}} className="text-base leading-none w-full py-5 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white">
                                                Checkout
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </>
    );
}


function CartItem({p,handleRemove}){
    const [qty, setQty] = useState(0);
    const {product,quantity} = p;

    
    useEffect(() => {
        setQty(quantity);
    }, [quantity]);
    // console.log(product);
    return (
        <>
    <div className="md:flex items-center mt-14 py-8 border-t border-gray-200">
                                        <div className="w-1/4">
                                            {
                                                product.images && <img src={product?.images[0].url} alt="product"/>
                                            }
                                        </div>
                                        <div className="md:pl-3 md:w-3/4">
                                            <p className="text-xs leading-3 text-gray-800 md:pt-0 pt-4">RF293</p>
                                            <div className="flex items-center justify-between w-full pt-1">
                                                <p className="text-base font-black leading-none text-gray-800">{product.name}</p>
                                                <select value={qty} onChange={(e)=>setQty(e.target.value)} className="py-2 px-1 border border-gray-200 mr-6 focus:outline-none">
                                                    {
                                                        [...Array.from(Array(10).keys())].map((i) => <option key={i+1} value={i+1}>{i+1}</option>)
                                                    }
                                                    
                                                </select>
                                            </div>
                                            <p className="text-xs leading-3 text-gray-600 pt-2">Height: 10 inches</p>
                                            <p className="text-xs leading-3 text-gray-600 py-4">Color: Black</p>
                                            <p className="w-96 text-xs leading-3 text-gray-600">Composition: 100% calf leather</p>
                                            <div className="flex items-center justify-between pt-5 pr-6">
                                                <div className="flex itemms-center">
                                                    <p className="text-xs leading-3 underline text-gray-800 cursor-pointer">Add to favorites</p>
                                                    <p onClick={()=>handleRemove(product._id)} className="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer">Remove</p>
                                                </div>
                                                <p className="text-base font-black leading-none text-gray-800">{currencyFormeter(product.price*qty)}</p>
                                            </div>
                                        </div>
                                    </div>
        </>
    )
}
