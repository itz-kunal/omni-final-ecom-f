import React from 'react'

const CategoryImage = ({imageLink,children}) => {
  return (
    <div className='md:w-[100px] w-[80px] h-full flex flex-col items-center justify-center'>
      <div className='h-[80%] overflow-hidden rounded-full'><img src={imageLink || './discount.jpg'} className='object-fill h-full w-full' alt="Image" /></div>
      <div className='flex w-[150px] justify-center items-center cursor-pointer'>{children}</div>
    </div>
  )
}

export default CategoryImage
