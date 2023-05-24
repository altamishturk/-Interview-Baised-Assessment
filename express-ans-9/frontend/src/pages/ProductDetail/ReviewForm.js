import React from 'react';
import Rating from "./Rating";

const ReviewForm = ({ reviewData,setReviewData }) => {
  

  const handleChange = (e)=>{

    if(e.target.name === "images"){
      const images = [];

      for (let i = 0; i < e.target.files.length; i++) {
        const reader = new FileReader();
        reader.onload = ()=>{
          images.push(reader.result)
        }
        reader.readAsDataURL(e.target.files[i]);
      }
      

      setReviewData(prev => {
        return {
          ...prev,
          images: images
        }
      })

      return;
    }

    setReviewData(prev =>{
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }


  return (
    <form >

      <div className="mb-6">
        <label htmlFor="ratings" 
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Ratings</label>
        <Rating rating={reviewData.rating} id="ratings" setRating={setReviewData} />
      </div>

      <div className="mb-6">
          <label 
            htmlFor="comment" 
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
            <textarea 
            id="comment" 
            rows="4" 
            value={reviewData.comment}
            onChange={handleChange} 
            name="comment"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="Leave a comment..."
          >
          </textarea>
      </div>
      
      <div className="mb-6">
        <div className="flex items-center justify-center w-full">
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                </div>
                <input onChange={handleChange} id="dropzone-file" type="file" name='images' className="hidden" />
            </label>
        </div> 
      </div>
      

    </form>
  );
};

export default ReviewForm;
