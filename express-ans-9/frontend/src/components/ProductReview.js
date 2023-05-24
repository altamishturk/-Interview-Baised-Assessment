import React from "react";
import {FaUser} from "react-icons/fa";
import {MdAddCircle} from "react-icons/md";
import  timeSince from "../utils/timeSince";
import ReactTooltip from "./Tooltip";

export default function ProductReview({reviews,setRatingModal}) {
    // console.log(reviews);
    return (
        <>
          <div className="py-12 px-4 md:px-6 2xl:px-0 2xl:container 2xl:mx-auto flex justify-center items-center">
                <div className="flex flex-col justify-start items-start w-full space-y-8">
                    <div className="flex justify-between items-center w-full">
                        <p className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">Reviews</p>
                        <MdAddCircle onClick={()=>setRatingModal(true)} id="share-review" size={38} fill={`rgb(21,94,117)`} className="hover:cursor-pointer"/>
                    </div>
                    <div className="w-full flex justify-start items-start flex-col bg-gray-50 p-8">
                        
                    {
                        reviews && reviews.map((review,i)=>{
                            return <Review key={i} divder={reviews.length === i?true:false} review={review}/>
                        })
                    }
                    </div>
                </div>
          </div>
          <ReactTooltip
          anchorId="share-review"
          place="top"
          variant="info"
          content="Share Review"
          />
        </>
    );
};



function Review({divder,review}) {
  

 
    return (
        <>
         <div className="md:block block pb-5">
                        <p className="mt-3 text-base leading-normal text-gray-600 w-full md:w-9/12 xl:w-5/6">{review.comment}</p>
                        <div className="hidden md:flex mt-6 flex-row justify-start items-start space-x-4">
                            {
                                review.images && review.images.map((img,i) =>{
                                    return <div key={i} className="w-20">
                                                <img src={img.url} alt="review" />
                                            </div>
                                })
                            }
                            
                        </div>
                        <div className="md:hidden carousel pt-8 cursor-none" data-flickity='{ "wrapAround": true,"pageDots": false }'>
                           {
                                review.images && review.images.map((img,i) =>{
                                    return <div className="carousel-cell" key={i}>
                                                <div className="md:w-full h-full relative">
                                                    <img src={img.url} alt="bag" className="w-full h-full object-fit object-cover" />
                                                </div>
                                            </div>
                                })
                            }
                            
                        
                            <div className="carousel-cell"></div>
                        </div>
                        <div className="mt-6 flex justify-start items-center flex-row space-x-2.5">
                            <div>
                                {
                                    review?.user.profilePic? (<img src={review.user.profilePic.url} className="w-16 h-16 rounded-full" alt="girl-avatar" />):<FaUser/> 
                                }
                                
                            </div>
                            <div className="flex flex-col justify-start items-start space-y-2">
                                <p className="text-base font-medium leading-none text-gray-800">{review?.user?.name}</p>
                                <p className="text-sm leading-none text-gray-600">{timeSince(new Date(review.createdAt))} ago</p>
                            </div>
                        </div>
         </div>
         <div className={`w-full h-[1px] ${divder?"bg-gray-200":""}`}></div>
        </>
    )
}


