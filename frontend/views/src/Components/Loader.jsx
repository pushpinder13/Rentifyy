import React from 'react'

const Loader = () => {
  return (
    <div className='flex justify-center items-center h-screen w-full'>
        <div className='h-24 w-24 border-4 border-t-transparent border-blue-500 rounded-full animate-spin'/>
    </div>
  )
}

export default Loader