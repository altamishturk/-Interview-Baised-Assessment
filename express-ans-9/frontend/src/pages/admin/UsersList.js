import React,{useEffect,useState} from 'react';
import {getAllUsers} from "../../store/ActionCreators/user.ts";
import {useDispatch,useSelector} from "react-redux";
import { BiUserCircle } from 'react-icons/bi';
import Button from '../../components/Button';
import { AiOutlineEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { CiEdit } from 'react-icons/ci';
import { RiDeleteBin7Line } from 'react-icons/ri';
import ReactTooltip from "../../components/Tooltip"; 

function UsersList() {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users);
    const [tableHeaders] = useState(["Name","Email","Role","Address","Phone","No Orders","Actions"]);


    const handleDelete = () =>{

    }

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

  return (
    <>
            <div className="w-full bg-white shadow-lg rounded-sm border border-gray-200 mt-10">
                <header className="px-5 py-4 border-b border-gray-100">
                    <h2 className="font-semibold text-gray-800">Customers</h2>
                </header>
                <div className="p-3">
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full">
                            <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                <tr>
                                    {
                                        tableHeaders.map(item =>{
                                            return <th className="p-2 whitespace-nowrap" key={item}>
                                                        <div className="font-semibold text-left">{item}</div>
                                                    </th>
                                        })
                                    }
                                </tr>
                            </thead>
                            <tbody className="text-sm divide-y divide-gray-100">
                                {
                                    users && (
                                        users?.map((user,i) => {
                                            return <User key={i} user={user} handleDelete={handleDelete}/>
                                        })
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
    </>
  )
}

export default UsersList;



function User({user,handleDelete}){

    return (
        <tr>
                                <td className="p-2 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3 flex items-center">
                                            {user.profilePic? <img className="rounded-full w-10 h-10" src={user.profilePic.url} width="40" height="40" alt="Alex Shatov"/>:<BiUserCircle size={28}/>}
                                        </div>
                                        <div className="font-medium text-gray-800">{user.name}</div>
                                    </div>
                                </td>
                                <td className="p-2 whitespace-nowrap">
                                    <div className="text-left">{user.email}</div>
                                </td>
                                <td className="p-2 whitespace-nowrap">
                                    <div className="text-left font-medium text-green-500">{user.role}</div>
                                </td>
                                <td className="p-2 whitespace-nowrap">
                                    <div className="text-lg text-left">{user.address}</div>
                                </td>
                                <td className="p-2 whitespace-nowrap">
                                    <div className="text-lg text-left">{user.phone}</div>
                                </td>
                                <td className="p-2 whitespace-nowrap">
                                    <div className="text-lg text-left">{user.orders.length}</div>
                                </td>
                                <td className="py-3 px-6 text-center">
                                <div className="flex item-center justify-start">
                    <div  id="view-user" className="hover:cursor-pointer w-7 h-7 mr-2 transform hover:text-purple-500 hover:scale-110">
                       <Button
                        icon={<AiOutlineEye/>}
                        color="brandbg2"
                       />
                    </div>
                    <Link to={`/admin/dashboard/products/update/${user._id}`}>
                        <div id="edit-user" className="hover:cursor-pointer w-7 h-7 mr-2 transform hover:text-purple-500 hover:scale-110">
                            <Button
                            icon={<CiEdit/>}
                            color="brandbg2"
                            />
                        </div>
                    </Link>
                    <div onClick={()=>handleDelete(user._id)} id="delete-user" className="hover:cursor-pointer w-7 h-7 mr-2 transform hover:text-purple-500 hover:scale-110">
                           <Button
                            icon={<RiDeleteBin7Line/>}
                            color="red-500"
                            />
                    </div>
                </div>
                <ReactTooltip
                    anchorId="view-user"
                    content="View User"
                />
                <ReactTooltip
                    anchorId="edit-user"
                    content="Edit User"
                />
                <ReactTooltip
                    anchorId="delete-user"
                    place="top"
                    variant="warning"
                    content="Delete User"
                />
                                </td>
                            </tr>
    )
}