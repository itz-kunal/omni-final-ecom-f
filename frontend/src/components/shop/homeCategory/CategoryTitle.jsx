import React from 'react'

const CategoryTitle = ({title,viewAllLink}) => {
  return (
    <>
      <div className='w-full px-10 py-2 flex justify-between'>
         <h1 className='text-lg font-bold'>{title || "Grocery & Kitchen"}</h1>
         <a href={viewAllLink} className='font-semibold text-blue-500 cursor-pointer px-1'>View All</a>
      </div>
    </>
  )
}

export default CategoryTitle
