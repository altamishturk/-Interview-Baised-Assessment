import { ADD_CART_ITEM, CREATE_CART, GET_CART, REMOVE_CART_ITEM ,RESET_CART} from "../../Constants/actions";



export function cart(state=null,action){

    switch (action.type) {
        case GET_CART:
            return action.payload

        case CREATE_CART:
            return action.payload

        case ADD_CART_ITEM:
            return {
                ...state,
                products: [...state.products,action.payload]
            }    
       
        case REMOVE_CART_ITEM:
            return {
                ...state,
                products: state.products.filter(p=> p.product._id !== action.payload)
            } 

        case RESET_CART:
            return null   
    
        default:
            return state;
    }

}


export default cart;