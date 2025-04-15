import React,{useEffect, useState} from 'react'
import { categories } from '../assets/data'
import { useDispatch,useSelector } from 'react-redux'
import ListingCard from './ListingCard'
// import {setListings} from ".."

const Listing = () => {

  // const dispatch = useDispatch();

  // const [loading,setLoading]=useState(true)
  const[selectedCategory,setSelectedCategory]=useState("All")
  // const listings=useSelector((state)=>state.listings)

  // const getQueryListings=async()=>{
  //   try{
  //     const response = await fetch(
  //     selectedCategory!=="All"? `http://localhost:3000//api/listings?category=${selectedCategory}`:"http://localhost:3000/listing",{
  //       method: 'GET',
  //     })
  //     const data = await response.json()
  //     dispatch(setListings({listings:data}))
  //     setLoading(false)

  //   }catch(err){
  //     console.log("Fetch Listings failed",err.message)

  //   }
  // }
  // useEffect(()=>{
  //   getQueryListings()
  // },[selectedCategory])

  
  return (
    <section id='listing' className='mx-auto max-w-[1440px] px-6 lg:px-12'  py-12>
         <div className='text-center pb-16'>
            <h6 className='capitalize'>From concept to reality</h6>
            <h2 className='text-[33px] leading-tight md:text-[41px] md:leading-[1.3] mb-4 font-bold capitalize'>Discover our newest listings</h2>
        </div>
        <div className=' custom-scrollbar flex gap-x-1 bg-white ring-1 ring-slate-400/5 shadow-sm rounded-full px-2 py-3 overflow-x-auto mb-16'>
            {categories.map((category)=>(
                <div key={category.label} onClick={()=>setSelectedCategory(category.label)} className='flex items-center justify-center flex-col gap-2 p-2 roundel-xl cursor-pointer min-w-24 xl:min-w-32' style={{flexShrink:0}}>
                    <div className='text-#7a62fe rounded-full h-10 w-10 p-2 flex items-center justify-center text-lg' style={{backgroundColor: `${category.color}`}}>{category.icon}</div>
                    <p className= {`${category.label===selectedCategory?"text-[#7a62fe]":""} text-[14px] font-[500]`}>{category.label}</p>

                </div>
            ))}

        </div>
        {/* {loading?(<Loader/>):(
          <div>
            {listings.map(({_id,creator,listingPhotoPaths,city,province,country,category,type,price,title,description})=>(
              <ListingCard/>)
            )}

          </div>
        )} */}
    </section>
  )
}

export default Listing