import React, { useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { MdUpload } from 'react-icons/md' 
import { useState } from 'react'

const Register = () => {

    const navigate = useNavigate();

    const[passwordMatch,setPasswordMatch]=useState(true)

    const [formData,setFormData]=useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:"",
        profileImage:null,

    })
    const handlechange=(e)=>{
        const{name,value,files}=e.target
        setFormData({
            ...formData,    
            [name]:value,
            [name]:name==="profileImage"?files[0]:value
        })
    }
    const handleSubmit=async(e)=>{
        e.preventDefaukt();
        try{
            const register_form = new FormData()

            for(var key in formData){
                register_form.append(key,formData[key])
            }
            const response = await fetch("https://localhost:3000/authRoutes/register",{
                method:"POST",
                body:register_form,
            });
            if(response.ok){
                navigate("/login")
            }

        }catch(err){
            console.log("Registration failed",err.message)

        }
    }

    useEffect(()=>{
        setPasswordMatch(
            formData.password===formData.confirmPassword ||
            formData.confirmPassword === ""

        );
    },[formData.password,formData.confirmPassword])
  return (
    <div className='absolute h-full w-full bg-black/40 z-50 flex justify-center items-center'>
        <div>
            <form onSubmit={handleSubmit} className='flex flex-col gap-y-2.5 bg-white w-[366px] p-7 rounded-xl shadow-md text-[14px]'>
              
                    <h3 className='text-[26px] my-4 leading-tight md:text-[29px] md:leading-[1.3] mb-4 font-bold'>Sign Up</h3>
                
                <input onChange={handlechange} value={formData.firstName} type="text" name='firstName' placeholder='First Name' required  className='bg-[#f9f9f9] border-none p-2 pl-4 rounded-md outline-none' />
                <input onChange={handlechange} value={formData.lastName} type="text" name='lastName' placeholder='Last Name' required  className='bg-[#f9f9f9] border-none p-2 pl-4 rounded-md outline-none' />
                <input onChange={handlechange} value={formData.email} type="email" name='email' placeholder='Email Address' required  className='bg-[#f9f9f9] border-none p-2 pl-4 rounded-md outline-none' />
                <input onChange={handlechange} value={formData.password} type="password" name='password' placeholder='Password' required  className='bg-[#f9f9f9] border-none p-2 pl-4 rounded-md outline-none' />
                <input onChange={handlechange} value={formData.confirmPassword} type="password" name='confirmPassword' placeholder='Confirm Password' required  className='bg-[#f9f9f9] border-none p-2 pl-4 rounded-md outline-none' />
                {!passwordMatch && <p>password do not match</p> }
                <input onChange={handlechange}  type="file" id='image' name='profileImage' accept='image/*' hidden required />
                <label htmlFor="image">
                    <div className='flex justify-center items-center ring-1 ring-slate-900/10 p-1 h-16 w-16 rounded'>
                    {formData.profileImage?(
                        <img src={URL.createObjectURL(formData.profileImage)} alt="profileImg" className='p-1 h-16 object-contain aspect-square' />
                    ):(
                        <MdUpload className="text-[#404040] text-2xl" />

                    )}
                        
                    </div>
                </label>
                <button type='submit' className=' medium-14 bg-[#7a62fe] px-7 py-2.5 text-white transition-all rounded mt-2'> Register</button>
                <div className='text-gray-300'>
                    Already have an account?
                    <Link to={"/login"} className='text-[#7a62fe] cursor-pointer'>Login</Link>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Register