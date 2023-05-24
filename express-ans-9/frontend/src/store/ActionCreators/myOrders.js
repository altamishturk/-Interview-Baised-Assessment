import {GET_MY_ORDERS} from "../../Constants/actions";
import {toast} from "react-toastify";
import fatchRequest from "../../utils/fatchRequest";
import {domainName} from "../../Constants/constants.js";


export const getMyOrders = () => async (dispatch) =>{

    try {
        const res = await fatchRequest(`${domainName}/orders/my-orders`,"GET",{});
        if(res.success){
            dispatch({type:GET_MY_ORDERS,payload:res.orders});
        }
        else {
            toast.error(res.message);
        }
    } catch (error) {
        
    }

    // console.log(res);
}
