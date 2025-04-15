import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import {useDispatch} from "react-redux"



const Login = () => {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  // const navigate = useNavigate()
  // const dispatch = useDispatch()

  const handleSubmit  = async(e)=>{
    e.preventDefault()
    // try{
    //   const response = await fetch("http://localhost:3000/api/auth/login",{
    //     method: "POST",
    //     headers:{
    //       "Content-Type":"application/json",
    //     },
    //     body:JSON.stringify({email,password})

    //   })
    //   const loggedIn = await response.json()

    //   if(loggedIn){
    //     dispatch(
    //       setLogin({
    //         user:loggedIn.user,
    //         token:loggedIn.token
    //       })
    //     )
    //     navigate("/")
    //   }



    // }catch(err){
    //   console.log("Login Failed",err.message)

    // }
  }

  return (
    <div className='absolute h-full w-full bg-black/40 z-50 flex justify-center items-center'>
      <div>
        <form onSubmit={handleSubmit} action="" className='flex flex-col gap-y-2.5 bg-white w-[366px] p-7 rounded-xl shadow-md text-[14px]'>

          <h3 className='text-[26px] my-4 leading-tight md:text-[29px] md:leading-[1.3] mb-4 font-bold'>Sign In</h3>


          <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" name='email' placeholder='Email Address' required className='bg-[#f9f9f9] border-none p-2 pl-4 rounded-md outline-none' />
          <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" name='password' placeholder='Password' required className='bg-[#f9f9f9] border-none p-2 pl-4 rounded-md outline-none' />


          <button type='submit' className=' medium-14 bg-[#7a62fe] px-7 py-2.5 text-white transition-all rounded mt-2'>Sign In</button>
          <div className='text-gray-300'>
            Don't have an account?
            <Link to={"/register"} className='text-[#7a62fe] cursor-pointer'>Register</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login