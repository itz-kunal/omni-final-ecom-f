'use client'
import React, { useEffect, useState } from 'react'
import { HomeIcon, ShoppingCart, UserCircle, ShoppingBagIcon, TextSearchIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

const BottomHeader = ({ className }) => {

  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false)
  const [isShop, setIsShop] = useState(false);

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user'));
    if(!user) return;
    if(user){
      setIsLogin(true)
    }
    if(user.role == 'seller'){
      setIsShop(true)
    }
  }, [])


  return (
    <>
      <div className={`w-full h-[60px] border-t-2 sticky ${className} bottom-0 flex justify-between px-8 items-center md:hidden bg-white`}>
        <div className='flex flex-col items-center' onClick={()=>router.push('/')}><HomeIcon /><span className='text-sm'>Home</span></div>

        <div className='flex flex-col items-center'><TextSearchIcon /><span className='text-sm'>Categories</span></div>
        <div className='flex flex-col items-center'><ShoppingBagIcon /><span className='text-sm'>Shop</span></div>

        {isLogin && <div className='flex flex-col items-center' onClick={()=>router.push('/user/account')}><UserCircle /><span className='text-sm'>Account</span></div>
        }

        <div className='flex flex-col items-center'><ShoppingCart /><span className='text-sm'>Cart</span></div>

      </div>
    </>
  )
}

export default BottomHeader
