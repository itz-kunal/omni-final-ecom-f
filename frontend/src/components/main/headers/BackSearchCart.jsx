'use client'
import { Input } from '../../ui/input'
import { ArrowLeftIcon, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { IoCartOutline } from 'react-icons/io5'

function BackSearchCartHeader({ title }) {
    const router = useRouter()
    const [searchedKey, setSearchedKey] = useState('')

    return (
        <div className='flex p-3 shadow-md shadow-gray-100 justify-between fixed w-full bg-white z-30'>

            {/* back button  */}
            <div className='flex items-center'>
                <div className='cursor-pointer' onClick={() => router.back()}><ArrowLeftIcon className='size-5' /></div>
                <div className='ml-2 font-semibold text-[1em]'>{title || ' '}</div>
            </div>

            <div className='flex'>

                {/* search box */}
                <div className='flex h-8 ml-2'>
                    <Input placeholder='Search Products or Shops' className='size-full rounded-r-none'
                        value={searchedKey} onChange={e => setSearchedKey(e.target.value)} />

                    <span onClick={()=>router.push(`/productview?searchedKey=${searchedKey}`)} 
                    className='h-full w-14 rounded-r-md text-white flex justify-center items-center bg-blue-500'>

                        <Search className='font-bold'/>
                    </span>

                </div>

                {/* cart box */}
                <div className='relative ml-4'>
                    <b className='border-[2px] bg-red-600 rounded-full absolute size-5 text-sm flex justify-center items-center text-white right-[-4px] top-[-4px] border-black'>{4}</b>
                    <IoCartOutline className='size-8 mr-1' />
                </div>

            </div>
            
        </div>
    )
}

export default BackSearchCartHeader