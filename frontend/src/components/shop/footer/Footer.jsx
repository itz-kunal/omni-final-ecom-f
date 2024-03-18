import React from 'react'
import {FacebookIcon,TwitterIcon,YoutubeIcon} from 'lucide-react'

const Footer = ({className}) => {
  return (
    <>
    <div className={`w-full ${className} py-6 mt-6 bg-slate-800 flex`}>
      <div className='w-[65%] md:h-[200px] grid md:grid-cols-3 grid-rows-3 mt-6 md:px-12 '>
          <div className='border-b-2 md:h-full md:border-none px-4 '>
            <h2 className='font-bold text-white/50'>About</h2>
            <ul className='text-white mt-4'>
              <li>Contact Us</li>
              <li>About Us</li>
              <li>Careers</li>
            </ul>
          </div>
          <div className='border-b-2 md:h-full md:border-none px-4 py-2 '>
            <h2 className='font-bold text-white/50'>Help</h2>
            <ul className='text-white mt-4'>
              <li>Payments</li>
              <li>Shipping</li>
              <li>Cancellation & Return</li>
              <li>FAQs</li>
            </ul>
          </div>
          <div className='py-2 md:h-full px-4'>
            <h2 className='font-bold text-white/50'>Consumer Policy</h2>
            <ul className='text-white mt-4'>
              <li>Cancellation & Return</li>
              <li>Terms & Conditions</li>
              <li>Privacy & Security</li>
            </ul>
          </div>

         
          
      </div>
      
      <div className='w-[50%] grid md:grid-cols-2 grid-rows-2 mt-6 md:px-12 border-l md:border-none px-2 md:h-[200px]'>
        <div className='mr-6 py-2'>
        <h2 className='font-bold text-white/50'>Mail Us</h2>
        <p className='mt-4 text-white'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse enim possimus est, perferendis aliquam qui dicta nemo illum sunt voluptatum?</p>
        </div>

        <div className='py-2 '>
        <h2 className='font-bold text-white/50'>Office Address</h2>
        <p className='mt-4 text-white'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse enim possimus est, perferendis aliquam qui dicta nemo illum sunt voluptatum?</p>
        </div>
      </div>
      
    </div>
    <div className={`w-full md:flex md:flex-col pt-6 border-t-2 bg-slate-800 ${className}  text-white`}>
      <div className='flex cursor-pointer justify-center gap-10 '>
      <FacebookIcon />
      <TwitterIcon />
      <YoutubeIcon />
      </div>
      <span className='flex mt-4 justify-center'>&copy; 2024 Something.com</span>
    </div>
    
    </>
  )
}

export default Footer
