import {domainName} from "../../Constants/constants.js";
import fatchRequest from "../../utils/fatchRequest";
import {ADD_PRODUCT, DELETE_PRODUCT, GET_ALL_PRODUCTS, UPDATE_PRODUCT} from "../../Constants/actions";
import {toast} from "react-toastify";

// types 
type CreateProduct = {
    name?: string,
    price?: number,
    description: string,
    images: string,
    quantity?: number,
    category?: string,
    brand: string,
    discountPercentage: number
}

type UpdateProduct = {
    _id: string,
    name: string,
    price: number,
    description: string,
    images: string,
    quantity: number,
    category: string,
    brand: string,
    discountPercentage: number
}

export const getOneProduct = async (productId: string) =>{

    const res = await fatchRequest(`${domainName}/products/${productId}`,"GET")

    return res;
}

export const getAllProducts = () => async (dispatch: any) =>{

    try {
        
        const res = await fatchRequest(`${domainName}/products`,"GET")
        
        if(res.success){
            dispatch({type:GET_ALL_PRODUCTS,payload:res.products})
        }
        else {
            toast.error("Server Error While fetching Products");
        }
    } catch (error) {
        
    }

    // console.log(res);
}

export const createProduct = (product: CreateProduct) => async (dispatch: any) =>{

    try {
        const res = await fatchRequest(`${domainName}/products`,"POST",product)
        
        // console.log(res);
        if(res.success){
            toast.success("Product Created Successfully!");
            dispatch({type:ADD_PRODUCT,payload:res.product});
        }
        else {
            toast.error(res.message);
        }
        

    } catch (error) {
        
    }

    // console.log(res);
}

export const updateProduct = (product: UpdateProduct) => async (dispatch: any) =>{

    try {
        const res = await fatchRequest(`${domainName}/products/${product._id}`,"PUT",product)
        if(res.success){
            toast.success("Product Updateed Successfully!");
            dispatch({type:UPDATE_PRODUCT,payload:res.product});
        }
        else{
            toast.error(res.message);
        }
        

    } catch (error) {
        
    }
}

export const deleteProduct = (productId: string) => async (dispatch: any) =>{

    try {
        const res = await fatchRequest(`${domainName}/products/${productId}`,"DELETE",{})
        if(res.success){
            dispatch({type:DELETE_PRODUCT,payload:productId});
            toast.error(res.message);
        }
        else{
            toast.success("Product Deleted Successfully!");
        }
        

    } catch (error) {
        
    }
}


