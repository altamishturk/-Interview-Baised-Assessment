import { LOGIN_USER, LOGOUT_USER } from "../../Constants/actions";

function loggedInUser(state=null,action){
    switch (action.type) {
        case LOGIN_USER:
            return action.payload

        case LOGOUT_USER:
            return null
    
        default:
            return state;
    }
}


export default loggedInUser;
