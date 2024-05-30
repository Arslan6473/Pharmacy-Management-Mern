import React from 'react'

function Loader() {
  return (
    <>
    <div className='flex justify-center items-center'>
    <div className="loader border-t-4 rounded-full border-blue-600 bg-blue-300 animate-spin aspect-square w-12 flex justify-center items-center text-yellow-700"></div>
    </div>
    </>
  )
}

export default Loader