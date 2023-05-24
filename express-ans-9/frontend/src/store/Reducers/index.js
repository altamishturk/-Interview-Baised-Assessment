import productReducer from "./product";
import usersReducer from "./user";
import authReducer from "./auth";
import cartReducer from "./cart";
import orderReducer from "./order";
import myOrders from "./myOrders";


const rootReducer = {
    products: productReducer,
    users: usersReducer,
    loggedInUser: authReducer,
    cart: cartReducer,
    orders: orderReducer,
    myOrders: myOrders
};


export default rootReducer;