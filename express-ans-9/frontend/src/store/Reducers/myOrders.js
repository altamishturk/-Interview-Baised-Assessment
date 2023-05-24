import {GET_MY_ORDERS,ADD_MY_ORDER,UPDATE_MY_ORDER,DELETE_MY_ORDER,RESET_MY_ORDERS } from "../../Constants/actions";



function order(state=null,action){

    switch (action.type) {
        case GET_MY_ORDERS:
            return action.payload 

        case ADD_MY_ORDER:
            if(state){
                return [...state,action.payload]    
            }
            return [action.payload]

        case UPDATE_MY_ORDER:
            return state.map(product => product._id === action.payload._id? {...product,...action.payload}:product)    
       
        case DELETE_MY_ORDER:
            return state.filter(product => product._id !== action.payload)  

        case RESET_MY_ORDERS:
            return null    
        
            default:
            return state;
    }

}


export default order;

