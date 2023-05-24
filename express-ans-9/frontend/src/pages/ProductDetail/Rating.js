import React from 'react';
import {AiFillStar,AiOutlineStar} from "react-icons/ai";

const Rating = ({ rating, setRating }) => {
  
  const handleClick = (r)=>{
    setRating(prev =>{
      return {
        ...prev,
        rating: r
      }
    })
  }
  
  return <div className="flex">
    {
        new Array(5).fill("").map((s,i) =>{
            return rating>i? <AiFillStar
                                key={i}
                                onClick={() => handleClick(i+1)}
                                size={28}
                                fill="#facc15"
                            />:
                            <AiOutlineStar
                                key={i}
                                onClick={() => handleClick(i+1)}
                                size={28}
                            />
        })
    }
  </div>;
};

export default Rating;
