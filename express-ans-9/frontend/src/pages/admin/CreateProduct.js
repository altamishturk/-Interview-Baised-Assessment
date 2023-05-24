import React,{useState,useEffect} from 'react';
import {createProduct,updateProduct} from "../../store/ActionCreators/product.ts";
import {useDispatch, useSelector} from "react-redux";
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';




function CreateProduct() {
    const params = useParams();
    const dispatch = useDispatch();
    const [categorys] = useState(["one","two"]);
    const [product, setProduct] = useState({
        name: "",
        price: "",
        quantity: "",
        category: "",
        description: "",
        images: "",
        __v: "",
        _id: ""
    });
    const products = useSelector(state => state.products);
    const [imageUrls, setImageUrls] = useState(null);
    
    useEffect(() => {
        const _id = params._id;
        const p = products?.find(p => p._id === _id);

        if(p){
            setProduct(prev => {
                return {...prev,...p,images: ""}
            });
        }
    }, [params,products]);
   

    const handleChange = (e) =>{

        if(e.target.name === "images"){
            const files = e.target.files;
            for (let i = 0; i < files.length; i++) {
                const size = files[i].size;
                if(size > 250000){
                    toast.error("File Size Should not be grater the 250kb")
                }
                const reader = new FileReader();
                reader.onload = () => {
                    setImageUrls(prev => {
                        if(!prev){
                            return [reader.result];
                        }
                        return [...prev,reader.result];
                    });
                };
                reader.readAsDataURL(files[i]);
            }
        }
        
        setProduct(prev =>{
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        });
    }


    const handleSubmit = async(e)=>{
        e.preventDefault();
        let temp = {
            ...product,
            images: imageUrls
        }
      
        if(params._id){
            dispatch(updateProduct(temp));
        }
        else {
            delete temp._id;
            delete temp.__v;
            dispatch(createProduct(temp));
        }
    }

  return (
    <>
    {/* <!-- component --> */}
    <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800 mt-20">
        <h1 className="text-xl mb-5 font-bold text-brandtext1 text-center capitalize dark:text-white">{params._id? "Update":"Create"} Product</h1>
        <form className='border-t border-brandtext2'>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                <div>
                    <label className="text-brandtext1 dark:text-gray-200" htmlFor="name">Name</label>
                    <input value={product.name} onChange={handleChange} id="name"  name='name' type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
                </div>

                <div>
                    <label className="text-brandtext1 dark:text-gray-200" htmlFor="price">Price In INR</label>
                    <input value={product.price} onChange={handleChange} id="price" type="number" name='price' className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
                </div>

                <div>
                    <label className="text-brandtext1 dark:text-gray-200" htmlFor="quantity">Quantity</label>
                    <input value={product.quantity} onChange={handleChange} id="quantity" type="number" name='quantity' className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
                </div>

                <div>
                    <label className="text-brandtext1 dark:text-gray-200" htmlFor="passwordConfirmation">Select Category</label>
                    <select value={product.category} onChange={handleChange} name="category" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                       {
                        categorys.map(c => <option key={c}>{c}</option>)
                       }
                    </select>
                </div>
                <div>
                    <label className="text-brandtext1 dark:text-gray-200" htmlFor="description">Description</label>
                    <textarea value={product.description} onChange={handleChange} id="description" type="textarea" name='description' className="block w-full h-[130px] px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"></textarea>
                </div>
                <div>
                    <label className="block text-sm font-medium text-white">
                    Image
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                    <svg className="mx-auto h-12 w-12 text-white" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                        <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                        <span className="">Upload a file</span>
                        <input value={product.images} onChange={handleChange} id="file-upload"  multiple name="images" type="file" className="sr-only"/>
                        </label>
                        <p className="pl-1 text-white">or drag and drop</p>
                    </div>
                    <p className="text-xs text-white">
                        PNG, JPG, GIF up to 10MB
                    </p>
                    </div>
                </div>
                </div>
            </div>

            <div className="flex justify-end mt-6">
                <button onClick={handleSubmit} className="w-full px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-brandbg2 rounded-md hover:bg-brandbg2Hover focus:outline-none focus:bg-gray-600">{params._id? "Update":"Create"}</button>
            </div>
        </form>
    </section>

    </>
  )
}

export default CreateProduct