import React from 'react'
import ProductCard from './ProductCard'

const ProductContainer = ({children}) => {
  return (
    <>
     <div className='w-full flex justify-center'>
        <div className='w-full bg-accent flex gap-4 rounded-lg md:px-10 overflow-scroll no-scrollbar justify-between px-3
        '>
       {children}
        </div>
     </div> 
    </>
  )
}

export default ProductContainer
