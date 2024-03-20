import React from 'react'

const ProductCard = ({imgTitle,imgSrc}) => {
  return (
    <>
    <div className='flex flex-col items-center gap-1  rounded-lg w-[150px]'>
     <div className='w-[150px] h-[150px] py-2 pb-0 rounded-lg'>
          <img src= {imgSrc ||"./vegetables.jpg"} className='w-full h-full object-fill' alt="" />
        </div>

        <h2 className='text-[16px] w-full text-center overflow-ellipsis mt-2 opacity-90 px-2 py-1'>
            <p className={`line-clamp-2 leading-5 pb-[2.5px]`}>
             {imgTitle || 'not set yet'}
            </p>
          </h2>
       
    </div>
    </>
  )
}

export default ProductCard
