import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineDashboard, AiOutlineHome} from "react-icons/ai";
import {RiProductHuntLine, RiShoppingBagLine} from "react-icons/ri";   
import {FiUsers} from "react-icons/fi"; 
import {useSelector} from "react-redux";


const navItems = [
	{
		text: "Home",
		path: "/",
		icon: <AiOutlineHome size={28} fill="white"/>,
	},
	{
		text: "Dashboard",
		path: "/admin/dashboard",
		icon: <AiOutlineDashboard size={28} fill="white"/>,
	},
	{
		text: "Products",
		path: "/admin/dashboard/products",
		icon: <RiProductHuntLine size={28} fill="white"/>,
	},
	{
		text: "Users",
		path: "/admin/dashboard/users",
		icon: <FiUsers size={28} fill="white"/>,
	},
	{
		text: "Orders",
		path: "/admin/dashboard/orders",
		icon: <RiShoppingBagLine size={28} fill="white"/>,
	},
]


function SideBar({show}) {
	const loggedInUser = useSelector(state=> state.loggedInUser);
	

  return (
    <>
	  {/* <aside className={`ml-[${show?"0%":"-100%"}] ${show? "":"hidden"} fixed z-10 top-0 left-[${show?"0":"-100%"}] pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0  lg:w-[25%] xl:w-[20%] 2xl:w-[15%]`}> */}
	  <aside className={`w-[300px] ${show? "block":"hidden"} bg-brandbg2 text-white`}>
		<div>
			<div className="-mx-6 px-6 py-4">
				<h2 className='text-center'>E-Comm</h2>
			</div>

			<div className="mt-8 text-center">
				<img src={loggedInUser?.profilePic?.url} alt="profile" className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"/>
				<h5 className="hidden mt-4 text-xl font-semibold text-white lg:block">{loggedInUser.name}</h5>
				<span className="hidden text-gray-800 lg:block">{loggedInUser.role}</span>
			</div>

			<ul className="space-y-2 tracking-wide mt-8">
				{
					navItems.map(item => <NavLink key={item.text} text={item.text} icon={item.icon} path={item.path}/>)
				}	
			</ul>
		</div>

		<div className="px-6 -mx-6 pt-4 flex justify-between items-center">
			<button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
				<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="white" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
				</svg>
				<span className="group-hover:text-gray-900 text-white">Logout</span>
			</button>
		</div>
      </aside>
    </>
  )
}

export default SideBar;



function NavLink({text,path,icon}){

	return (
		        <li>
					<Link to={path} className='px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group'>
					    {icon}
						<span className="group-hover:text-gray-900 text-white">{text}</span>
					</Link>
				</li>
	)
}

// source https://tailwindcomponents.com/component/dashboard-12