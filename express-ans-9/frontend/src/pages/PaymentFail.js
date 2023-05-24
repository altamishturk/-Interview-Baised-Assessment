import React from 'react';
import {Link } from "react-router-dom";
import {ImCross} from "react-icons/im"


function PaymentSuccess() {
  return (
    <div className="bg-gray-100 h-screen flex justify-center items-center">
      <div className="bg-white p-6  md:mx-auto mx-4">
        <ImCross size={48} fill="#fff" className='bg-red-400 mx-auto my-6 p-2 rounded-full'/>
        <div className="text-center">
            <h3 className="text-xl text-base text-gray-900 font-semibold text-center">Payment Failed!</h3>
            <p className="sm:text-2xs text-gray-600 my-2">Unfortunately, the transaction was unsuccessful. <br/> The payment did not go through and the funds have not been transferred.</p>
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