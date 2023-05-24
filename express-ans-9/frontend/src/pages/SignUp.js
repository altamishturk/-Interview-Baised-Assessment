import React,{useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {createUser} from "../store/ActionCreators/user.ts";

function SignUp() {
    const dispatch =  useDispatch();
    const [user, setUser] = useState({firstName: "",lastName:"",email: "",password: ""});
    const [image, setImage] = useState("");
    const [imageUrl, setImageUrl] = useState(null);
    const loggedInUser = useSelector(state => state.loggedInUser);
    const navigator = useNavigate();

    const handleChnange = (e)=>{
        setUser(prev =>{
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleImageChange = (e)=>{
                const file = e.target.files[0];
                setImage(e.target.value);
    
                const reader = new FileReader();
                reader.onload = () => {
                    setImageUrl(reader.result);
                };
                reader.readAsDataURL(file);
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        const temp = {
            ...user,
            name: `${user.firstName} ${user.lastName}`,
            profilePic: imageUrl
        }
        // console.log(temp);
        dispatch(createUser(temp));
    }

    useEffect(() => {
        if(loggedInUser){
            navigator("/")
        }
    }, [loggedInUser,navigator]);

  return (
    <div className="mx-auto container py-16 xl:px-20 lg:px-12 sm:px-6 px-4 ">
            <div className="w-full max-w-md mx-auto my-10 p-4 rounded-md shadow sm:p-8 bg-gray-100 text-gray-900">
                    <h2 className="mb-3 text-3xl font-semibold text-center">Create Accout</h2>
                    <p className="text-sm text-center text-gray-400">Already have account?
                        <Link to="/login" className='focus:underline hover:underline'>
                           Login here
                        </Link>
                    </p>
                   
                    <form noValidate="" action="" className="space-y-8 ng-untouched ng-pristine ng-valid my-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="firstName" className="block text-sm">First Name</label>
                                <input value={user.firstName} onChange={handleChnange} type="text" name="firstName" id="firstName" placeholder="Raj..." className="w-full px-3 py-2 border rounded-md border-brandbg2 bg-brandbg1 text-brandtext1 focus:border-brandbg2" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="lastName" className="block text-sm">Last Name</label>
                                <input value={user.lastName} onChange={handleChnange} type="text" name="lastName" id="lastName" placeholder="Singh..." className="w-full px-3 py-2 border rounded-md border-brandbg2 bg-brandbg1 text-brandtext1 focus:border-brandbg2" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-sm">Email address</label>
                                <input value={user.email} onChange={handleChnange} type="email" name="email" id="email" placeholder="leroy@jenkins.com" className="w-full px-3 py-2 border rounded-md border-brandbg2 bg-brandbg1 text-brandtext1 focus:border-brandbg2" />
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <label htmlFor="password" className="text-sm">Password</label>
                                </div>
                                <input value={user.password} onChange={handleChnange} type="password" name="password" id="password" placeholder="*****" className="w-full px-3 py-2 border rounded-md border-brandbg2 bg-brandbg1 text-brandtext1 focus:border-brandbg2" />
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <label htmlFor="profileImg" className="text-sm">Profile Photo</label>
                                </div>
                                <input value={image} onChange={handleImageChange} type="file" name="profileImg" id="profileImg" className="w-full px-3 py-2 border rounded-md border-brandbg2 bg-brandbg1 text-brandtext1 focus:border-brandbg2" />
                            </div>
                        </div>
                        <button onClick={handleSubmit} type="button" className="w-full px-8 py-3 font-semibold rounded-md bg-brandbg2 text-gray-100">Sign Up</button>
                    </form>
                </div>
        </div>
  )
}

export default SignUp