import React, { useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import currencyFormet from "../../utils/formetCurrency";
import timeSince from "../../utils/timeSince";
import {getMyOrders} from "../../store/ActionCreators/myOrders"
import CardSkeleton from "../../components/CardSkeleton";


function MyOrders() {

  const dispatch = useDispatch();
  const myOrders = useSelector(state => state.myOrders); 
  
  
  useEffect(() => {
    if(!myOrders){
      dispatch(getMyOrders());
    }
  }, [dispatch,myOrders]);


  return (
    <div className="min-h-[calc(100vh-448px)] py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
            <div className="flex justify-start item-start space-y-2 flex-col ">
                <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9  text-gray-800">My Orders</h1>
            </div>
            <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                    <div className="flex flex-col gap-5 justify-start items-start   w-full">
                      {
                        myOrders && myOrders.map((order,i)=> {
                          if(order.products.length > 0){
                            return <Order key={i} order={order}/>
                          }
                          else{
                            return ""
                          }
                        })
                      }
                      {
                        !myOrders && <CardSkeleton/>
                      }
                    </div>
                </div>
            </div>
    </div>
  )
}

export default MyOrders;



function Order({order}){


  return (
    <div className='flex flex-col w-full bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8'>
    {
        order.products.map((product,i) => <Product key={i} product={product.product} createdAt={order.createdAt} quantity={product.quantity}/>)
    }
    </div>
  )
}



function Product({product,quantity,createdAt}){


  return (<>
   <div className="mt-6 md:mt-0 flex justify-start flex-col md:flex-row  items-start md:items-center space-y-4  md:space-x-6 xl:space-x-8 w-full ">
                            <div className="w-full md:w-40">
                                <img className="w-full hidden md:block" src={product?.images[0]?.url} alt="dress" />
                                <img className="w-full md:hidden" src={product?.images[0]?.url} alt="dress" />
                            </div>
                            <div className="  flex justify-between items-start w-full flex-col md:flex-row space-y-4 md:space-y-0  ">
                                <div className="w-full flex flex-col justify-start items-start space-y-8">
                                    <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">{product?.name}</h3>
                                    <div className="flex justify-start items-start flex-col space-y-2">
                                        <p className="text-sm leading-none text-gray-800">
                                            <span className="text-gray-300">Style: </span> Italic Minimal Design
                                        </p>
                                    </div>
                                </div>
                                <div className="flex justify-between space-x-8 items-start w-full">
                                    <p className="text-base xl:text-lg leading-6">
                                       {currencyFormet(product?.price || 0)}
                                    </p>
                                    <p className="text-base xl:text-lg leading-6 text-gray-800">{quantity<=9? `0${quantity}`:quantity}</p>
                                    <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">{timeSince(new Date(createdAt))}</p>
                                </div>
                            </div>
                        </div>
  </>)
}