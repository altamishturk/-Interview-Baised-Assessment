import {domainName} from "../../Constants/constants.js";
import fatchRequest from "../../utils/fatchRequest";


// types 
type Review = {
    product?: string,
    user?: string,
    rating?: string,
    comment?: string,
    images: string
}

export const creatteReview = async (review: Review) =>{

    try {
        
        const res = await fatchRequest(`${domainName}/reviews`,"POST",review);
        
        return res;

    } catch (error) {
        
    }

    // console.log(res);
}


export const getReviewsByProductId = async (productId: string) =>{

    try {
        
        const res = await fatchRequest(`${domainName}/reviews/product/${productId}`,"GET",);
        
        return res;

    } catch (error) {
        
    }

    // console.log(res);
}