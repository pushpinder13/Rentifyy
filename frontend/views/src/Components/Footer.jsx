import React from 'react'
import { BsFacebook, BsInstagram, BsLinkedin, BsTelephoneFill, BsTwitterX } from 'react-icons/bs'
import { BsEnvelopeFill } from 'react-icons/bs'
import { BsGeoAltFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className='mx-auto max-w-[1440px] px-6 lg:px-12' >
            <div className='mx-auto max-w-[1440px] px-6 lg:px-12 bg-black text-white py-10 rounded-3xl'>
                <div className='container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8'>
                    <Link to={"/"}  >
                        <div className='text-[24px] font-[700] Leading-[120%] mb-4'>Lease <span className='text-[#7a62fe]'>lodge</span> </div>
                        <p className='text-white/70'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis, fugiat.</p>
                        <p className='mt-4 text-white/70'>Copyright 2024 LeaseLodge. All rights reserved.</p>
                    </Link>
                    <div className=''>
                        <h4 className='text-[18px] md:text-[21px] mb-4 font-bold'>Quick Links</h4>
                        <ul className='space-y-2 text-[15px] font-[400]'>
                            <li className='text-gray-10'>
                                <a href="/about">About Us</a>
                            </li>
                            <li className='text-gray-10'>
                                <a href="/properties">Properties</a>
                            </li>
                            <li className='text-gray-10'>
                                <a href="/services">Services</a>
                            </li>
                            <li className='text-gray-10'>
                                <a href="/contact">Contact</a>
                            </li>
                            <li className='text-gray-10'>
                                <a href="/privacy-policy">Privacy Policy</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className='text-[18px] md:text-[21px]  font-bold mb-4'>Contact Us</h4>
                        <p className='text-gray-10 mb-2'>
                            <BsTelephoneFill className='inline-block mr-2 ' />+91 93066-21131
                        </p>
                        <p className='text-gray-10 mb-2'>
                            <BsEnvelopeFill className='inline-block mr-2 ' />{" "}support@leaselodge.com
                        </p>
                        <p className='text-gray-10 mb-2'>
                            <BsGeoAltFill className='inline-block mr-2 ' /> Rajpura , Punjab
                        </p>
                    </div>
                    <div>
                        <h4 className='text-[18px] md:text-[21px] mb-4 font-bold'>Follow Us</h4>
                        <div className='flex space-x-4 text-gray-100'>
                            <a href="#" className='hover:text-blue-500'>
                            <BsFacebook/>
                            </a>
                            <a href="#" className='hover:text-blue-400'>
                            <BsTwitterX/>
                            </a>
                            <a href="#" className='hover:text-red-500'>
                            <BsInstagram/>
                            </a>
                            <a href="#" className='hover:text-blue-600'>
                            <BsLinkedin/>
                            </a>
                        </div>
                    </div>
                </div>
                <div className='mt-10 text-center text-gray-100'>
                    <p>
                        Powered by <a href="#" >Leaselodge Team</a>
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer