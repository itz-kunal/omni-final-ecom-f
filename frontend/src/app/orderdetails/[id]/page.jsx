'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { checkLogin } from '../../../utils/generalFunctions'

function Page() {
    const router = useRouter()

    // useEffect(()=>{
    //     checkLogin(router)
    // },[router])
    return (
        <>
            <div className='flex p-3 shadow-md shadow-gray-100'>
                <div>Back</div>
                <div className='ml-4 font-semibold text-[1em]'>My Wallet</div>
            </div>

            <div className='flex flex-wrap shadow-md pb-6'>

                <div className='w-full lg:w-[45vw] overflow-hidden'>
                    <div className='border-b-[1px] border-gray-200 p-2 font-mono text-sm text-gray-500'>
                        Order ID - {9090450850348508}
                    </div>

                    <div className='p-2 flex justify-between items-center border-b-[1px] border-gray-200'>
                        <div>
                            <p className='truncate overflow-ellipsis w-[60vw] lg:w-[35vw] text-[18px]'>{'product name lorem epsum dolar sit go to england for buying xyz'}</p>
                            <p className=' text-gray-500 text-[14px]'>Seller : {'seller name'}</p>
                            <b>₹{450}</b>
                        </div>

                        <div className='bg-green-200 flex justify-center items-center text-center p-1 size-24'>Img here</div>

                    </div>

                    <div className='bg-gray-100 p-2 relative pl-6'>
                        {/* <div className='bg-red-400 w-[5px] h-48 absolute left-[21.5px] top-6'></div> */}

                        <div className='border-l-2 h-10 border-green-500 pl-4 relative'>
                            <b className='rounded-full size-3 bg-green-400 absolute top-0 -left-[6.5px]'></b>
                            <p className='absolute top-[-8px]'>ordered now</p>
                        </div>
                        <div className='border-l-2 h-10 border-green-500 pl-4 relative'>
                            <b className='rounded-full size-3 bg-green-400 absolute top-0 -left-[6.5px]'></b>
                            <p className='absolute top-[-8px]'>ordered now</p>
                        </div>
                        <div className='border-l-2 h-10 border-green-500 pl-4 relative'>
                            <b className='rounded-full size-3 bg-green-400 absolute top-0 -left-[6.5px]'></b>
                            <p className='absolute top-[-8px]'>ordered now</p>
                        </div>

                        <div className='border-l-2 h-10 border-green-500 pl-4 relative'>
                            <b className='rounded-full size-3 bg-green-400 absolute bottom-0 -left-[6.5px]'></b>
                            <p className='absolute bottom-[-3px]'>ordered now</p>
                        </div>


                    </div>
                </div>

                <div className='w-full lg:w-[50vw] lg:ml-4'>
                    <div className='p-2'>
                        <h2 className='text-sm text-gray-500 border-b-[1px] p-2'>Shipping Details</h2>
                        <div className='p-2'>
                            <p className=' font-semibold text-[18px]'>{'Prince'}</p>
                            <p>{'sursand dumra'}</p>
                            <p>{'bihar'} - {5666}</p>
                            <p>Phone number - {87644774}</p>
                        </div>
                    </div>

                    <div className='p-2'>
                        <h2 className='text-sm text-gray-500 border-b-[1px] p-2'>Price Details</h2>
                        <div className='p-2'>
                            <p className='w-full flex justify-between p-[2px]'>List price - <span>₹{40}</span></p>
                            <p className='w-full flex justify-between p-[2px]'>Selling price - <span>+ ₹{35}</span></p>
                            <p className='w-full flex justify-between p-[2px]'>Discount - <span className=' text-green-700'>- ₹{5}</span></p>
                            <p className='w-full flex justify-between p-[2px]'>Shipping fee - <span>+ ₹{10}</span></p>

                            <p className='w-full flex justify-between p-[4px] mt-4 border-t-[1px] rounded-md'>Total Amount - <span>₹{100}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page