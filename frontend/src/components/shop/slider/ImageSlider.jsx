import React,{useState} from 'react'
import {ArrowDownCircle,DotIcon} from 'lucide-react'

const ImageSlider = ({slides,className}) => {

  const [currentIndex,setCurrentIndex] = useState(0)


  const gotoPrevious = ()=>{
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide? slides.length-1 : currentIndex-1;
    setCurrentIndex(newIndex)
  }

  const gotoNext = ()=>{
    const isLastSlide = currentIndex === slides.length-1;
    const newIndex = isLastSlide? 0 : currentIndex+1;
    setCurrentIndex(newIndex)
  }

  const goToSlide = (slideIndex)=>{
    setCurrentIndex(slideIndex)
  }

  return (
    <div className={`flex ${className} justify-center items-center py-6`}>
    <div className='w-[95%] h-[280px] mx-0 my-auto'>
    <div className='relative h-full'>
      <div className='absolute top-1/2 left-8 z-10 cursor-pointer rotate-90 -translate-y-1/2' onClick={gotoPrevious}><ArrowDownCircle/></div>
      <div className='absolute top-1/2 right-8 z-10 cursor-pointer -rotate-90 -translate-y-1/2' onClick={gotoNext}><ArrowDownCircle/></div>
      <div className='h-full w-full rounded-md bg-center bg-cover border' style={{backgroundImage:`url(${slides[currentIndex].url})`}}></div>
      <div className='flex justify-center'>
        {slides.map((slide,slideIndex)=>(
          <div key={slideIndex} className='mx-0 my-3 cursor-pointer font-extrabold text-black' onClick={()=> goToSlide(slideIndex)}><DotIcon /> </div>
        ))}
      </div>
    </div>
    </div>
    </div>
  )
}

export default ImageSlider
