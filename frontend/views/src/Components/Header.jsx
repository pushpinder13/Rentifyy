import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {FaSearch,FaUser} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const Header = () => {

    // const[menuOpened,setmenuOpened]=useState(false);
    // const[dropdownMenu,setDropdownMenu]=useState(false);
    // const navigate=useNavigate()

    // const toggleMenu = ()=>{
    //    setMenuOpened(!menuOpened) 
    // }
    
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
        <div>
        <Link to={"/register"} className='text-[24px] font-[700] Leading-[120%]' >
            <div><FaUser/> </div>
            </Link>
        </div>
    </header>
  )
}

export default Header