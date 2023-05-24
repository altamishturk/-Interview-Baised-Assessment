import {domainName} from "../../Constants/constants.js";
import fatchRequest from "../../utils/fatchRequest";
import { ADD_ORDER, DELETE_ORDER, GET_ALL_ORDERS, UPDATE_ORDER } from "../../Constants/actions";
import {toast} from "react-toastify";

// types 
type CreateOrder = {
    user?: string,
    products: [{product?: string,quantity?: number}],
    totalPrice?: number,
    status?: string,
    shippingDetails: string
}

type UpdateOrder = {
    _id: string,
    status?: string
}

export const getOneOrder = async (orderId: string) =>{

    const res = await fatchRequest(`${domainName}/orders/${orderId}`,"GET")

    return res;
}

export const getAllOrders = () => async (dispatch: any) =>{

    try {
        
        const res = await fatchRequest(`${domainName}/orders`,"GET")
        
        if(res.success){
            dispatch({type:GET_ALL_ORDERS,payload:res.orders})
        }
        else {
            toast.error("Server Error While fetching Orders");
        }
    } catch (error) {
        
    }

    // console.log(res);
}

export const createOrder = (order: CreateOrder) => async (dispatch: any) =>{

    try {
        const res = await fatchRequest(`${domainName}/orders`,"POST",order)
        
        // console.log(res);
        if(res.success){
            toast.success("Order Created Successfully!");
            dispatch({type:ADD_ORDER,payload:res.order});
        }
        else {
            toast.error(res.message);
        }
        

    } catch (error) {
        
    }

    // console.log(res);
}

export const updateOrder = (order: UpdateOrder) => async (dispatch: any) =>{

    try {
        const res = await fatchRequest(`${domainName}/orders/${order._id}`,"PUT",order)
        if(res.success){
            toast.success("Order Updateed Successfully!");
            dispatch({type:UPDATE_ORDER,payload:res.order});
        }
        else{
            toast.error(res.message);
        }
        

    } catch (error) {
        
    }
}

export const deleteOrder = (orderId: string) => async (dispatch: any) =>{

    try {
        const res = await fatchRequest(`${domainName}/orders/${orderId}`,"DELETE",{})
        if(res.success){
            dispatch({type:DELETE_ORDER,payload:orderId});
            toast.error(res.message);
        }
        else{
            toast.success("Order Deleted Successfully!");
        }
        

    } catch (error) {
        
    }
}
