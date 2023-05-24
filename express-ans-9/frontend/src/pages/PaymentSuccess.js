import React, { useEffect, useState } from 'react';
import {Link ,useLocation} from "react-router-dom";


function PaymentSuccess() {
  const location = useLocation();
  const [queryData, setQueryData] = useState({});


  useEffect(() => {
    const str = location.search.replace("?","");
    let obj = {};
    str.split("&").forEach(el => {
      let temp = el.split("=");
      obj[temp[0]] = temp[1];
    });
    setQueryData(obj);
  }, [location]);

  useEffect(()=>{
    if(queryData.payment_intent){
      console.log(queryData);
    }
  },[queryData]);
  

  return (
    <div className="bg-gray-100 h-screen flex justify-center items-center">
      <div className="bg-white p-6  mx-4">
        <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
            <path fill="currentColor"
                d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
            </path>
        </svg>
        <div className="text-center">
            <h3 className="text-xl text-base text-gray-900 font-semibold text-center">Payment Done!</h3>
            <p className="sm:text-2xs text-gray-600 my-2">Thank you for completing your secure online payment.</p>
            <p> Have a great day!  </p>
            <div className="py-10 text-center">
                <Link to="/" className="px-12 bg-brandbg2 hover:bg-brandbg2Hover text-white font-semibold py-3" >
                GO BACK
                </Link>
            </div>
        </div>
    </div>
    </div>
  )
}

export default PaymentSuccess;