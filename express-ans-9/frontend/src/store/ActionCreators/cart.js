import {domainName} from "../../Constants/constants.js";
import fatchRequest from "../../utils/fatchRequest";
import {ADD_CART_ITEM, CREATE_CART, GET_CART, REMOVE_CART_ITEM} from "../../Constants/actions";
import {toast} from "react-toastify";


export const getCart = () => async (dispatch) =>{

    try {
        const res = await fatchRequest(`${domainName}/carts/user/id`,"GET")
        console.log(res);
        if(res.success){
            dispatch({type: GET_CART, payload: res.cart})
        }
        else {
            toast.error(res.message);
        }
    } catch (error) {
        
    }

    // console.log(res);
}

export const createCart = (cart) => async (dispatch) =>{

    try {
        const res = await fatchRequest(`${domainName}/carts`,"POST",cart)
        if(res.success){
            toast.success("Item added Successfully!")
            dispatch({type:CREATE_CART,payload:res.cart}) 
        }
        else {
            toast.error(res.message);    
        }
        

    } catch (error) {
        
    }

    // console.log(res);
}

export const addCartItem = (cartId,product) => async (dispatch) =>{

    try {
        // console.log(cartId,product);
        const res = await fatchRequest(`${domainName}/carts/add/${cartId}`,"PUT",product)
        if(res.success){
            toast.success("Item Added Successfully!");
            // console.log(res);
            const temp = res.cart.products.find(p => p.product._id === product.product)
            dispatch({type: ADD_CART_ITEM,payload: temp})
        }
        else{
            toast.error(res.message);
        }
        

    } catch (error) {
        
    }

    // console.log(res);
}


export const removeCartItem = (cartId,productId) => async (dispatch) =>{

    try {
        const res = await fatchRequest(`${domainName}/carts/remove/${cartId}/${productId}`,"PUT",{})
        
        // console.log(productId);
        if(res.success){
            toast.success("Product removed Successfully!");
            dispatch({type: REMOVE_CART_ITEM, payload:productId});
        }
        else{
            toast.error(res.message);
        }
        

    } catch (error) {
        
    }
}
