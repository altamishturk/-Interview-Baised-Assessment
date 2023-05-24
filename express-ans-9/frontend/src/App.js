import "./App.css";
import Home from "./pages/Home/Home.js";
import AboutUs from "./pages/AboutUs/AboutUs.js";
import ContactUs from "./pages/ContactUs/ContactUs.js";
import Checkout from "./pages/Checkout/Checkout";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Products from "./pages/Products/Products";
import { Route, BrowserRouter, Routes} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoutes";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Admin from "./pages/admin/Admin";
import CreateProduct from "./pages/admin/CreateProduct";
import StaticesCards from "./pages/admin/StaticesCards";
import ProductsList from "./pages/admin/ProductsList";
import UsersList from "./pages/admin/UsersList";
import OrdersList from "./pages/admin/OrdersList";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {getAllProducts} from "./store/ActionCreators/product.ts";
import {getLoggedInUser} from "./store/ActionCreators/user.ts";
import {getAllOrders} from "./store/ActionCreators/order.ts";
import PaymentFail from "./pages/PaymentFail";
import PaymentSuccess from "./pages/PaymentSuccess";
import Cart from "./pages/Cart";
import ProfilePage from "./pages/Profile";
import Layout from "./components/Layout";
import MyOrders from "./pages/MyOrders/MyOrders";


function App() {
  const dispatch = useDispatch();
  

  useEffect(() => {
    dispatch(getLoggedInUser());
    dispatch(getAllProducts());
    dispatch(getAllOrders());
  }, [dispatch]);
  
  return (
    <>
      <div className="app">
        <BrowserRouter>
          <Routes>
            {/* public routes  */}
            <Route excet path="/" element={<Layout item={Home}/>}/>
            <Route excet path="/login" element={<Layout item={Login}/>} />
            <Route excet path="/signup" element={<Layout item={SignUp}/>} />
            <Route excet path="/about" element={<Layout item={AboutUs}/>} />
            <Route excet path="/contact" element={<Layout item={ContactUs}/>} />
            <Route excet path="/products" element={<Layout item={Products}/>} />
           
            
            {/* private routes  */}
            <Route excet path="/" element={<PrivateRoute/>} >
               <Route excet path="profile" element={<Layout item={ProfilePage}/>}/>
               <Route excet path="payment-success" element={<Layout item={PaymentSuccess}/>}/>
               <Route excet path="payment-fail" element={<Layout item={PaymentFail}/>}/>
               <Route excet path="product/:productId" element={<Layout item={ProductDetail}/>} />
               <Route excet path="checkout" element={<Layout item={Checkout}/>} />
               <Route excet path="cart" element={<Layout item={Cart}/>} />
               <Route excet path="my-orders" element={<Layout item={MyOrders}/>} />
            </Route>


             {/* admin routes  */}
            <Route excet path="/" element={<PrivateRoute isAdmin={true}/>} >
              {/* admin routes  */}
              <Route path="/admin/dashboard" element={<><Admin/></>}>
                <Route path="" element={<StaticesCards/>}/>
                <Route path="products" element={<ProductsList/>}/>
                <Route path="products/add" element={<CreateProduct/>}/>
                <Route path="products/update/:_id" element={<CreateProduct/>}/>
                <Route path="users" element={<UsersList/>}/>
                <Route path="orders" element={<OrdersList/>}/>
              </Route>   
            </Route>
          </Routes>
        </BrowserRouter>
    

      </div>
    </>
  );
}


export default App;
