'use client'
import React, { useEffect, useState } from 'react'
import { Link } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { SearchIcon, UserCircle, ShoppingCart, ShoppingBag, MenuIcon } from 'lucide-react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Button } from '@/components/ui/button'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import Menu from "@/components/shop/header/Menu"
import { useRouter } from 'next/navigation'
import { NavigationMenuTrigger } from '@radix-ui/react-navigation-menu'



const Header = ({ title, logo }) => {
  const router = useRouter();
  const [userName, setUserName] = useState('')

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (!user) return
    const pUser = JSON.parse(user)
    setUserName(pUser.name)
  },[])


  return (
    <>
      <header className='w-full flex h-[75px] border sticky top-0 z-30 md:px-20 px-5 items-center justify-between bg-white'>
        <div className='flex items-center gap-2'>
          <img className='w-20' src={logo || '/omilogo.png'} alt="logo" />
          {title || ''}
        </div>

        <div className='hidden md:flex justify-center items-center w-[40%] border border-input rounded-md'>
          <Input placeholder='Search For Products, Shops and More' className='rounded-r-none' />
          <div className='bg-blue-500 hover:bg-blue-400 cursor-pointer h-9 rounded-r-md flex justify-center items-center w-16 text-white'>
            <SearchIcon />
          </div>
        </div>

        <div className='hover:bg-accent hidden sm:flex rounded-md px-4 py-2 font-semibold'>
          <HoverCard>
            <HoverCardTrigger>🎊 Refer & Earn 🎊</HoverCardTrigger>
            <HoverCardContent>
              <a href="#">
                <div>
                  <img src="./discount.jpg" alt="" />
                </div>
                <p>You can refer your friend and earn discount Coupens</p>
              </a>
            </HoverCardContent>
          </HoverCard>
        </div>

        <div className='hidden md:flex'>
          <NavigationMenu>
            <NavigationMenuList>
              {userName ? <div className='flex gap-2' onClick={() => router.push('/user/account')}><UserCircle />{userName}</div> : (
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    <div className='flex gap-2' onClick={() => router.push('/auth/login')}><UserCircle />login</div>
                  </NavigationMenuTrigger>

                  <NavigationMenuContent>
                    <NavigationMenuLink className='px-2 py-1 w-[250px] flex justify-between items-center gap-2'>New Customer? <Button onClick={() => router.push('/auth/signup')}> Signup</Button></NavigationMenuLink>
                    <NavigationMenuLink className='px-2 py-1 w-[250px] flex justify-between items-center gap-2'>Have Account? <Button onClick={() => router.push('/auth/login')}> Login</Button></NavigationMenuLink>

                    <NavigationMenuLink className='px-2 py-1 w-[250px] flex justify-between items-center gap-2 underline' onClick={() => router.push('/auth/register-shop')}>Create Shop</NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              )}

              <div className='hidden md:flex items-center gap-2 mx-2 hover:bg-accent rounded-md bg-background px-4 py-2'>
                <ShoppingCart />
                Cart
              </div>
              <div className='hidden md:flex w-[180px] justify-between items-center gap-2 mx-2 hover:bg-accent rounded-md px-4 py-2'>
                <ShoppingBag />
                <div >
                  Open Your Shop
                </div>
              </div>
            </NavigationMenuList>
          </NavigationMenu>


        </div>


        <div className='md:hidden flex gap-2'>
          <div className='flex items-center gap-3'>
            {userName ? <button onClick={() => router.push('/user/account')} className='px-2 py-1 rounded hover:bg-accent flex gap-2'><UserCircle />{userName}</button> :
              <button onClick={() => router.push('/auth/login')} className='px-2 py-1 rounded hover:bg-accent flex gap-2'><UserCircle /> Login</button>}

            <ShoppingCart />
          </div>
          <Menu />
        </div>
      </header>

    </>
  )
}

export default Header
