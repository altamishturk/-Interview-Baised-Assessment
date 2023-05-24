import {UPDATE_USER,GET_ALL_USERS, RESET_USERS} from "../../Constants/actions";



export function users(state=null,action){

    switch (action.type) {
        case GET_ALL_USERS:
            return action.payload

        case UPDATE_USER:
            return state.map(product => product._id === action.payload._id? {...product,...action.payload}:product)    
    
        case RESET_USERS:
            return null  
    
        default:
            return state;
    }

}


export default users;




