import React from 'react'
import { Link } from 'react-router-dom'
import circle from "../assets/circle.png"
import client1 from "../assets/person-1.jpg"
import client2 from "../assets/person-2.jpg"
import sideImg from "../assets/sideImg.png"
import sideImg1 from "../assets/sideImg1.png"
import sideImg2 from "../assets/sideImg2.png"

const Hero = () => {
    return (
        <section className='mx-auto max-w-[1440px] px-6 md:px-12 mt-16 xl:mt-10'>
            <div className='flex flex-col sm:flex-row gap-16'>
                <div className='flex justify-center flex-1 flex-col gap-y-8 xl:max-w-[555px] relative'>
                    <h1 className='text-[41px] leading-tight md:text-[63px] md:leading-[1.3] mb-4 font-bold'>Invest in <span className='text-[#7a62fe]'>Your Future</span> with confidence </h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum doloribus dolorem accusantium, ducimus obcaecati illum voluptatum incidunt ipsum perspiciatis. Culpa facilis quidem, in placeat laborum dolor earum recusandae ducimus fuga totam qui architecto laudantium deleniti aspernatur accusantium quas id incidunt eum nisi sint inventore? Dolore facilis ratione culpa amet, mollitia ducimus saepe quam temporibus provident.</p>
                    <div className='flex gap-3'>
                        <a href="#listing" className='text-[14px] font-[500] bg-[#404040] px-7 py-2.5 text-white flex items-center justify-center rounded-full'>Explore Properties</a>
                        <Link to={""} className='text-[14px] font-[500] bg-[#7a62fe] px-7 py-2.5 text-white transition-all flex items-center justify-center rounded-full ' ><span className='text-[20px] font-[500] pr-1'>+</span>Add Property </Link>
                    </div>
                    <div className='flex relative '>
                        <img src={circle} alt="" className='rounded-full h-[99px] z-30' />
                        <img src={client1} alt="" className='rounded-full h-[80px] shadow-sm absolute left-16 z-20' />
                        <img src={client2} alt="" className='rounded-full h-[80px] shadow-sm absolute left-32 z-10' />


                    </div>
                </div>

                <div className='flex flex-1 flex-col gap-4'>
                    <div className='rounded-2xl h-[266px] overflow-hidden'>

                        <img src={sideImg} alt="" className='rounded-xl object-cover' />

                    </div>
                    <div className='flex items-center justify-between gap-4'>
                        <div className='flex flex-1 rounded-xl'><img src={sideImg1} alt="" className='rounded-xl object-cover aspect-square' /></div>
                        <div className='flex flex-1 rounded-xl'><img src={sideImg2} alt="" className='rounded-xl object-cover aspect-square' /></div>

                    </div>
                </div>
            </div>


        </section>
    )
}

export default Hero