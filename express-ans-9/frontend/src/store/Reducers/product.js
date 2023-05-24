import {ADD_PRODUCT, DELETE_PRODUCT, GET_ALL_PRODUCTS, UPDATE_PRODUCT,RESET_PRODUCTS} from "../../Constants/actions";



function product(state=null,action){

    switch (action.type) {
        case GET_ALL_PRODUCTS:
            return action.payload 

        case ADD_PRODUCT:
            return [...state,action.payload]    

        case UPDATE_PRODUCT:
            return state.map(product => product._id === action.payload._id? {...product,...action.payload}:product)    
       
        case DELETE_PRODUCT:
            return state.filter(product => product._id !== action.payload)  

        case RESET_PRODUCTS:
            return null    
        
            default:
            return state;
    }

}


export default product;