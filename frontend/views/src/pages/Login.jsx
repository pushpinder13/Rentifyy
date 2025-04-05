import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'



const Login = () => {
  const [formData, setFormData] = useState({

    email: "",
    password: "",


  })
  const handlechange = (e) => {
    const { name, value, files } = e.target
    setFormData({
      ...formData,
      [name]: value,
      [name]: name === "profileImage" ? files[0] : value
    })
  }
  return (
    <div className='absolute h-full w-full bg-black/40 z-50 flex justify-center items-center'>
      <div>
        <form action="" className='flex flex-col gap-y-2.5 bg-white w-[366px] p-7 rounded-xl shadow-md text-[14px]'>

          <h3 className='text-[26px] my-4 leading-tight md:text-[29px] md:leading-[1.3] mb-4 font-bold'>Sign In</h3>


          <input onChange={handlechange} value={formData.email} type="email" name='email' placeholder='Email Address' required className='bg-[#f9f9f9] border-none p-2 pl-4 rounded-md outline-none' />
          <input onChange={handlechange} value={formData.password} type="password" name='password' placeholder='Password' required className='bg-[#f9f9f9] border-none p-2 pl-4 rounded-md outline-none' />


          <button type='submit' className=' medium-14 bg-[#7a62fe] px-7 py-2.5 text-white transition-all rounded mt-2'>Sign In</button>
          <div className='text-gray-300'>
            Don't have any account?
            <Link to={"/register"} className='text-[#7a62fe] cursor-pointer'>Register</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login