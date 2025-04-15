import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {FaSearch,FaUser} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
// import {useDispatch,useSelector} from "react-redux"

const Header = () => {

    const[menuOpened,setmenuOpened]=useState(false);
    const[dropdownMenu,setDropdownMenu]=useState(false);
    // const user=useSelector((state)=>state.user)
    const navigate=useNavigate()
    // const dispatch = useDispatch()

    const toggleMenu = ()=>{
       setMenuOpened(!menuOpened) 
    }
    
  return (
    <header className="mx-auto max-w-[1440px] px-6 Lg:px-12  flex items-center justify-between rounded-xl py-4 ">
        <Link to={"/"} className='text-[24px] font-[700] Leading-[120%]' >
        <div>Lease <span className='text-[#7a62fe]'>lodge</span> </div>
        </Link>
        <div className='bg-white ring-1 ring-slate-900/5  rounded-full p-2 px-4 w-60 sm:w96 flex items-center justify-between gap-x-2 relative '>
            <input type="text" placeholder='search here..' 
            className='outline-none w-32 border-none bg-white'/>
            <button className='absolute right-0 h-full w-10 rounded-full bg-[#7a62fe] text-white flex items-center
             justify-center cursor-pointer'> <FaSearch/> </button>
        </div>
        <div className='flex items-center justify-between gap-x-10'>
       
            <div onClick={()=>setDropdownMenu(!dropdownMenu)} className='cursor-pointer relative'>  <FaUser/> </div>
           
        </div>
        {dropdownMenu &&(
          <div className='absolute top-16 right-0 w-40 rounded-2xl bg-white text-gray-30 text-[12px] font-[400] flex flex-col gap-y-2 p-2 shadow-sm z-50'> 
            <Link to={"/login"}>Login</Link>
            <Link to={"/register"}>Register</Link>
          </div>
        )}
    </header>
  )
}

export default Header