import {Navigate,Outlet} from 'react-router-dom';
import {useSelector} from "react-redux";


function PrivateRoute({isAdmin}) {
  const loggedInUser = useSelector(state => state.loggedInUser);

    if(isAdmin && loggedInUser?.role !== "admin"){
        return <Navigate to='/login' />;
    }
    if (loggedInUser) {
       return <Outlet/>;
    } 
    else {
       return <Navigate to='/login' />;
    }
    

  // return (
  //   <>
  //      {
  //       loggedInUser?.role === "admin" ?<Outlet/>: <Navigate to="/login"/>
  //      }
  //   </>
  // )
}


export default PrivateRoute;


// import React from 'react';
// import { Route, Routes } from 'react-router-dom';
// import {useSelector} from "react-redux";
// import {Navigate} from 'react-router-dom';

// const PrivateRoute = ({ element: Element,isAdmin, ...rest }) => {
//   const loggedInUser = useSelector(state => state.loggedInUser);

//   return (
//     <Routes>
//       <Route
//         {...rest}
//         render={props => {
//           if(isAdmin && !loggedInUser?.role === "admin"){
//             return <Navigate to='/login' />;
//           }
//           if (loggedInUser) {
//             return <Element {...props} />;
//           } else {
//             return <Navigate to='/login' />;
//           }
//         }}
//       />
//     </Routes>
//   );
// };

// export default PrivateRoute;

