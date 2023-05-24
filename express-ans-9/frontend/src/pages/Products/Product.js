import React from "react";
import ReactTooltip from "../../components/Tooltip";
import {useNavigate} from "react-router-dom";
import currencyFormeter from "../../utils/formetCurrency";
  
export default function Product({product}) {
    const navigator = useNavigate();
    

    return (
         <>
          <div 
          id={`view-product-1-${product._id}`}
          className="hover:cursor-pointer group relative" onClick={()=>navigator(`/product/${product._id}`)}>
            <div  className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
              <img
                src={`${product?.images? product?.images[1]?.url:""}`}
                alt="product"
                className=" h-full w-full object-cover object-center lg:h-full lg:w-full"
              />
            
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700">
                  {/* <a href={product.href}> */}
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product?.name}
                  {/* </a> */}
                </h3>
                {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
              </div>
              <p className="text-sm font-medium text-gray-900">{currencyFormeter(product?.price)}</p>
            </div>
          </div>  
          <ReactTooltip
          anchorId={`view-product-1-${product._id}`}
          content="View Product"
          />
      </> 
    )
  }
  