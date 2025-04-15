import React, { useState } from 'react'
import { categories, facilities, types } from '../assets/data'
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
import { BiTrash } from 'react-icons/bi'
import { IoIosImages } from "react-icons/io"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaMinus, FaPlus } from 'react-icons/fa6'
import Header from '../Components/Header'

const CreateListing = () => {
    const [category, setCategory] = useState("")
    const [type, setType] = useState("")
    const [amenities, setAmenities] = useState([])
    const [photos, setPhotos] = useState([])

    const [formLocation,setFormLocation] = useState({
        streetAddress: "",
        city: "",
        aptSuite:"",
        province:"",
        country:"",

    })

    const handleChangeLocation=(e)=>{
        const{name,value}=e.target
        setFormLocation({
            ...formLocation,
            [name]:value,
        })
    }

    const [guestCount, setGuestCount] = useState(1)
    const [bedroomCount, setBedroomCount] = useState(1)
    const [bedCount, setBedCount] = useState(1)
    const [bathroomCount, setBathroomCount] = useState(1)

    const handleSelectAmenities=(facility)=>{
        if(amenities.includes(facility)){
            setAmenities((prevAmenities)=>prevAmenities.filter((option)=>option !== facility))
        }else{
            setAmenities((prev)=>[...prev, facility])
        }
    }

    const handleUploadPhotos = (e) => {
        const newPhotos = e.target.files
        setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos])
    }

    const handleDragPhoto = (result) => {
        if (!result.destination) return
        const items = Array.from(photos)
        const [reorderedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reorderedItem)

        setPhotos(items);
    };

    const handleRemovePhoto = (indexToRemove) => {
        setPhotos((prevPhotos) =>
            prevPhotos.filter((_, index) => index !== indexToRemove))
    }

    const [formDescription,setFormDescription]=useState({
        description:"",
        title:"",
        price:0,
    })
    const handleChangeDescription=(e)=>{
        const{name,value}=e.target;
        setFormDescription({
            ...formDescription,
            [name]:value,})
    }

    const handlePost = async (e) => {
        e.preventDefault()

    }
    return (
        <>
            <Header />
            <section className='mx-auto max-w-[1440px] px-6 lg:px-12 py-10'>
                <h3 className='text-[26px] leading-tight md:text-[29px] md:leading-[1.3] mb-4 font-bold'>Add a Property</h3>
                <form onSubmit={handlePost}>
                    <h4 className='text-[18px] md:text-[21px] mb-2 font-bold my-4' >Describe your property</h4>

                    <div className=' custom-scrollbar flex gap-x-1 bg-white ring-1 ring-slate-400/5 shadow-sm rounded-full px-2 py-3 overflow-x-auto mb-8'>
                        {categories.map((item) => (
                            <div key={item.label} onClick={() => setCategory(item.label)} className='flex items-center justify-center flex-col gap-2 p-2 roundel-xl cursor-pointer min-w-24 xl:min-w-32' style={{ flexShrink: 0 }}>
                                <div className='text-#7a62fe rounded-full h-10 w-10 p-2 flex items-center justify-center text-lg' style={{ backgroundColor: `${item.color}` }}>{item.icon}</div>
                                <p className={`${category === item.label ? "text-[#7a62fe]" : ""}text-[14px] font-[500]`}>{item.label}</p>

                            </div>
                        ))}

                    </div>
                    <div className='flex flex-col xl:flex-row gap-x-16'>
                        <div className='flex-1'>
                            <h4 className='text-[18px] md:text-[21px] mb-2 font-bold my-4'>What is the type of your place</h4>
                            <div className='flex flex-col gap-y-3 mb-6'>
                                {types.map((item) => (
                                    <div key={item.name} onClick={()=>setType(item.name)} className={`${type === item.name ? "ring-1 ring-slate-900/50" : "ring-1 ring-slate-900/5"} flex items-center justify-between max-w-[777px] rounded-xl px-4 py-1 `}>
                                        <div>
                                            <h5 className='text-[16px] mb-1 font-[500]'>{item.name}</h5>
                                            <p>{item.description}</p>
                                        </div>
                                        <div className='text-2xl'>{item.icon}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='flex-1 mb-4'>
                            <h4 className='text-[18px] md:text-[21px] mb-2 font-bold my-4'>What's the address of your place?</h4>
                            <div>
                                <div>
                                    <h5 className='text-[16px] mb-1 font-[500]'>Street Address</h5>
                                    <input onChange={handleChangeLocation} value={formLocation.streetAddress} type="text" name='Street Address' placeholder='Street' required className='bg-white p-2 ring-1 ring-slate-900/5 text-sm outline-none border-none mb-2 rounded' />
                                </div>
                            </div>
                            <div className='flex gap-6'>
                                <div className='w-1/2'>
                                    <h5 className='text-[16px] mb-1 font-[500]'>Apartment, Suite (opt):</h5>
                                    <input onChange={handleChangeLocation} value={formLocation.aptSuite} type="text" name='aptSuite' placeholder='Apt,Suite(opt)' required className='bg-white p-2 ring-1 ring-slate-900/5 text-sm outline-none border-none mb-2 rounded' />
                                </div>
                                <div className='w-1/2'>
                                    <h5 className='text-[16px] mb-1 font-[500]'>City:</h5>
                                    <input onChange={handleChangeLocation} value={formLocation.city} type="text" name='city' placeholder='City' required className='bg-white p-2 ring-1 ring-slate-900/5 text-sm outline-none border-none mb-2 rounded' />
                                </div>
                            </div>
                            <div className='flex gap-6'>
                                <div className='w-1/2'>
                                    <h5 className='text-[16px] mb-1 font-[500]'>Province:</h5>
                                    <input onChange={handleChangeLocation} value={formLocation.province} type="text" name='province' placeholder='Province' required className='bg-white p-2 ring-1 ring-slate-900/5 text-sm outline-none border-none mb-2 rounded' />
                                </div>
                                <div className='w-1/2'>
                                    <h5 className='text-[16px] mb-1 font-[500]'>Country:</h5>
                                    <input onChange={handleChangeLocation} value={formLocation.country} type="text" name='country' placeholder='Country' required className='bg-white p-2 ring-1 ring-slate-900/5 text-sm outline-none border-none mb-2 rounded' />
                                </div>
                            </div>

                        </div>
                    </div>
                    <h4 className='text-[18px] md:text-[21px] mb-2 font-bold my-4'>Provide some essential details about your place?</h4>
                    <div className='flex flex-wrap gap-4 mb-6'>
                        <div className='flex items-center justify-center gap-x-4 ring-1 ring-slate-900/5 p-2 rounded'>
                            <h5>Guests</h5>
                            <div className='flex items-center justify-center gap-x-2 bg-white'>
                                <FaMinus onClick={() => {
                                    guestCount > 1 && setGuestCount(guestCount - 1)
                                }}
                                    className='h-6 w-6 text-xl p-1 rounded cursor-pointer' />
                                <p>{guestCount}</p>
                                <FaPlus onClick={() => {
                                    setGuestCount(guestCount + 1)
                                }}
                                    className='h-6 w-6 text-xl bg-[#7a62fe] text-white p-1 rounded cursor-pointer' />
                            </div>
                        </div>
                        <div className='flex items-center justify-center gap-x-4 ring-1 ring-slate-900/5 p-2 rounded'>
                            <h5>Bedrooms</h5>
                            <div className='flex items-center justify-center gap-x-2 bg-white'>
                                <FaMinus onClick={() => {
                                    bedroomCount > 1 && setBedroomCount(guestCount - 1)
                                }}
                                    className='h-6 w-6 text-xl p-1 rounded cursor-pointer' />
                                <p>{bedroomCount}</p>
                                <FaPlus onClick={() => {
                                    setBedroomCount(guestCount + 1)
                                }}
                                    className='h-6 w-6 text-xl bg-[#7a62fe] text-white p-1 rounded cursor-pointer' />
                            </div>
                        </div>
                        <div className='flex items-center justify-center gap-x-4 ring-1 ring-slate-900/5 p-2 rounded'>
                            <h5>Beds</h5>
                            <div className='flex items-center justify-center gap-x-2 bg-white'>
                                <FaMinus onClick={() => {
                                    bedCount > 1 && setBedCount(guestCount - 1)
                                }}
                                    className='h-6 w-6 text-xl p-1 rounded cursor-pointer' />
                                <p>{bedCount}</p>
                                <FaPlus onClick={() => {
                                    setBedCount(guestCount + 1)
                                }}
                                    className='h-6 w-6 text-xl bg-[#7a62fe] text-white p-1 rounded cursor-pointer' />
                            </div>
                        </div>
                        <div className='flex items-center justify-center gap-x-4 ring-1 ring-slate-900/5 p-2 rounded'>
                            <h5>Bathrooms</h5>
                            <div className='flex items-center justify-center gap-x-2 bg-white'>
                                <FaMinus onClick={() => {
                                    bathroomCount > 1 && setBathroomCount(guestCount - 1)
                                }}
                                    className='h-6 w-6 text-xl p-1 rounded cursor-pointer' />
                                <p>{bathroomCount}</p>
                                <FaPlus onClick={() => {
                                    setBathroomCount(guestCount + 1)
                                }}
                                    className='h-6 w-6 text-xl bg-[#7a62fe] text-white p-1 rounded cursor-pointer' />
                            </div>
                        </div>
                    </div>
                    <div className='my-10'>
                        <h4 className='text-[18px] md:text-[21px] mb-2 font-bold my-4'>Describe about the feature of your locations?</h4>
                        <ul className='flex items-center flex-wrap gap-3 mb-10'>
                            {facilities.map((card) => (
                                <li key={card.name}
                                    onClick={() =>handleSelectAmenities(card.name)}
                                    className={`${amenities.includes(card.name)?"ring-1 ring-slate-900/5": "ring-1 ring-slate-900/5 "}flex items-center gap-3 bg-white p-4 rounded cursor-default`}>
                                    <div>{card.icon}</div>
                                    <p>{card.name}</p>
                                </li>
                            ))}
                        </ul>
                        <h4 className='text-[18px] md:text-[21px] mb-2 font-bold my-6'>Include images showcasing your property?</h4>
                        <DragDropContext onDragEnd={handleDragPhoto}>
                            <Droppable droppableId='photos' direction='horizontal'>
                                {(provided) => (
                                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-4 bg-gray-500 rounded-lg shadow-lg'
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}>
                                        {photos.length < 1 && (
                                            <>
                                                <input type='file' name='image' accept='image/' onChange={handleUploadPhotos} multiple id='imageUpload' className='hidden' />
                                                <label htmlFor="imageUpload" className='group flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 hover:bg-gray-100 transition-colors cursor-pointer'>
                                                    <div className='h-52 w-full flex items-center justify-center'>
                                                        <IoIosImages className='text-6xl text-gray-400 group-hover:text-gray-600 transition-colors' />

                                                    </div>
                                                    <p className='text-gray-500 group-hover:text-gray-700'>
                                                        Upload from your device
                                                    </p>
                                                </label>
                                            </>
                                        )}
                                        {photos.length >= 1 && (
                                            <>
                                                {photos.map((photo, index) => {
                                                    return (
                                                        <Draggable key={index} draggableId={index.toString()} index={index}>
                                                            {(provided) => (
                                                                <div ref={provided.innerRef}
                                                                    {...provided.dragHandleProps}
                                                                    {...provided.draggableProps}
                                                                    className='relative group' >
                                                                    <img src={URL.createObjectURL(photo)} alt="property" className='aspect-square object-cover h-52 w-full rounded-lg shadow-md' />
                                                                    <button type='button' className='absolute top-2 right-2 bg-white p-1 rounded-full shadow-md hover:bg-gray-200'
                                                                        onClick={() => handleRemovePhoto(index)}>
                                                                        <BiTrash className='text-red-600' />
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </Draggable>
                                                    )
                                                })}
                                                <input type="file" id='imageUpload' accept='image/' onChange={handleUploadPhotos} multiple className='hidden' />
                                                <label htmlFor="imageUpload" className='group flex justify-center items-center flex-col border-2 border-dashed border-gray-300 rounded-lg p-6 hover:bg-gray-100 transition-colors cursor-pointer'>
                                                    <div className='h-52 w-full flex items-center justify-center'>
                                                        <IoIosImages className='text-6xl text-gray-400 group-hover:text-gray-600 transition-colors' />

                                                    </div>
                                                    <p className='text-gray-500 group-hover:text-gray-700'>
                                                        Upload more photos
                                                    </p>
                                                </label>
                                            </>
                                        )}
                                        {provided.placeholder}


                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                        <h4 className=' text-[18px] md:text-[21px] mb-2 font-bold my-4' >How would you characterize the charm and excitement of your property </h4>
                        <div className=''>
                            <h5 className='text-[16px] mb-1 font-[500]'>Title</h5>
                            <input value={formDescription.title} onChange={handleChangeDescription} type="text" name='title' placeholder='Title' required className='bg-white p-2 text-sm outline-none border-none mb-2 rounded ring-1 ring-slate-900/5 w-full ' />
                            <h5 className='text-[16px] mb-1 font-[500]'>Description:</h5>
                            <textarea value={formDescription.description} onChange={handleChangeDescription} name="description" rows={10} placeholder='Description' required className='bg-white p-2 text-sm outline-none border-none mb-2 rounded ring-1 ring-slate-900/5 w-full  resize-none'/>
                            <input value={formDescription.price} onChange={handleChangeDescription} type="number" name='price' placeholder='100' required className='bg-white p-2 text-sm outline-none border-none mb-2 rounded ring-1 ring-slate-900/5  ' />
                        </div>
                        <button type='submit' className='medium-14 bg-[#7a62fe] px-7 py-2.5 text-white transition-all rounded-full'>
                            Create Property
                        </button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default CreateListing