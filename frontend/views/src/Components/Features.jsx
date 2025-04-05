import React from 'react'
import {MdOutlineQuestionAnswer} from "react-icons/md"
import {BiSelectMultiple} from "react-icons/bi"
import {GrCertificate} from "react-icons/gr"

const Features = () => {
  return (
    <section className='mx-auto max-w-[1440px] px-6 lg:px-12 py-16 xl:py-32'>
        <div className='text-center pb-16'>
            <h6 className='capitalize'>Few Steps to your new home</h6>
            <h2 className='text-[33px] leading-tight md:text-[41px] md:leading-[1.3] mb-4 font-bold capitalize'>This is how easy it can be</h2>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12'>
            <div className='bg-white p-4 rounded-3xl'>
                <MdOutlineQuestionAnswer className='text-[32px] font-[700] leading-[120%] mb-3 text-[#7a62fe]'/>
                <h4 className='text-[18px] md:text-[21px] mb-2 font-bold'>Answer Question</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, corporis pariatur eveniet voluptatibus dolor natus.</p>


            </div>
            <div className='bg-white p-4 rounded-3xl'>
                <BiSelectMultiple className='text-[32px] font-[700] leading-[120%] mb-3 text-yellow-500'/>
                <h4 className='text-[18px] md:text-[21px] mb-2 font-bold'>Select Property</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, corporis pariatur eveniet voluptatibus dolor natus.</p>

                
            </div>
            <div className='bg-white p-4 rounded-3xl'>
                <GrCertificate className='text-[32px] font-[700] leading-[120%] mb-3 text-red-500'/>
                <h4 className='text-[18px] md:text-[21px] mb-2 font-bold'>Enjoy Living</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, corporis pariatur eveniet voluptatibus dolor natus.</p>

                
            </div>
        </div>
    </section>
  )
}

export default Features