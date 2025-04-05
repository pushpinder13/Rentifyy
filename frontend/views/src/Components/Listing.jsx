import React from 'react'
import { categories } from '../assets/data'

const Listing = () => {
  return (
    <section id='listing' className='mx-auto max-w-[1440px] px-6 lg:px-12'  py-12>
         <div className='text-center pb-16'>
            <h6 className='capitalize'>From concept to reality</h6>
            <h2 className='text-[33px] leading-tight md:text-[41px] md:leading-[1.3] mb-4 font-bold capitalize'>Discover our newest listings</h2>
        </div>
        <div className=' custom-scrollbar flex gap-x-1 bg-white ring-1 ring-slate-400/5 shadow-sm rounded-full px-2 py-3 overflow-x-auto mb-16'>
            {categories.map((category)=>(
                <div key={category.label} className='flex items-center justify-center flex-col gap-2 p-2 roundel-xl cursor-pointer min-w-24 xl:min-w-32' style={{flexShrink:0}}>
                    <div className='text-#7a62fe rounded-full h-10 w-10 p-2 flex items-center justify-center text-lg' style={{backgroundColor: `${category.color}`}}>{category.icon}</div>
                    <p className='text-[14px] font-[500]'>{category.label}</p>

                </div>
            ))}

        </div>
    </section>
  )
}

export default Listing