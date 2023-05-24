import fatchRequest from "../../utils/fatchRequest";
import {GET_ALL_USERS,LOGIN_USER,RESET_CART,UPDATE_USER} from "../../Constants/actions";
import {toast} from "react-toastify";
import {domainName} from "../../Constants/constants.js";
import {getCart} from "./cart"
import {getMyOrders} from "./myOrders";
import setToken from "../../utils/setToken";



// types 
type CreateUser = {
    name?: string,
    email?: string,
    password?: string,
    adress: string,
    address: string,
    phone: string,
    orders: string,
    profilePic: string,
}

type UpdateUser = {
    _id: string,
    name: string,
    email: string,
    password: string,
    adress: string,
    address: string,
    phone: string,
    orders: string,
    profilePic: string,
}


export const createUser = (user: CreateUser) => async (dispatch: any) =>{

    try {
        const res = await fatchRequest(`${domainName}/users`,"POST",user);
        if(res.success){
            toast.success("Account Created And Login Success!");
            setToken(res.token);
            dispatch({type:LOGIN_USER,payload:res.user});
            dispatch({type:RESET_CART,payload:""});
        }
        else {
            toast.error(res.message);
        }
    } catch (error) {
        
    }

    // console.log(res);
}


export const updateUser = (user: UpdateUser) => async (dispatch: any) =>{

    try {
        const res = await fatchRequest(`${domainName}/users/${user._id}`,"PUT",user)
        if(res.success){
            dispatch({type:UPDATE_USER,payload:res})
        }
        else{
            toast.error(res.message);
        }
    } catch (error) {
        
    }

    // console.log(res);
}


export const getLoggedInUser = () => async (dispatch: any) =>{

    try {
        const res = await fatchRequest(`${domainName}/users/loggedIn`,"GET")
        // console.log(res);
        if(res.success){
            dispatch({type:LOGIN_USER,payload:res.user})
            dispatch(getCart());
            dispatch(getMyOrders());
        }
        else {
            toast.error(res.message);
        }
    } catch (error) {
        
    }

    // console.log(res);
}


export const getAllUsers = () => async (dispatch: any) =>{

    try {
        const res = await fatchRequest(`${domainName}/users`,"GET")
        if(res.success){
            dispatch({type:GET_ALL_USERS,payload:res.users})
        }
        else{
            toast.error(res.message);
        }
    } catch (error) {
        
    }
}



