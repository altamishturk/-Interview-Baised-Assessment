import { ADD_ORDER, DELETE_ORDER, GET_ALL_ORDERS, RESET_ORDERS, UPDATE_ORDER } from "../../Constants/actions";



function order(state=null,action){

    switch (action.type) {
        case GET_ALL_ORDERS:
            return action.payload 

        case ADD_ORDER:
            if(state){
                return [...state,action.payload]    
            }
            return [action.payload]

        case UPDATE_ORDER:
            return state.map(product => product._id === action.payload._id? {...product,...action.payload}:product)    
       
        case DELETE_ORDER:
            return state.filter(product => product._id !== action.payload)  

        case RESET_ORDERS:
            return null    
        
            default:
            return state;
    }

}


export default order;

