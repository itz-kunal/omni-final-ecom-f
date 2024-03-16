import React from 'react'

const CardComp = ({name, price}) => {
  return (
    <>
    <div className='flex flex-col border-2 md:w-[32%] w-[45%] rounded-lg'>
     <div className=' md:h-[200px] h-[120px] rounded-lg bg-cover bg-center' style={{backgroundImage: 'url(./discount.jpg)'}}>  
     </div> 
     <div className='flex flex-col items-center bg-white'>
        <h3 className='text-center'>{name || 'not set yet'}</h3>
        <h2 className='font-semibold'>From {price}</h2>
     </div>
     </div>
    </>
  )
}

export default CardComp
