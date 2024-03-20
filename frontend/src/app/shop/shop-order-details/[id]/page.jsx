'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { ORDER_DETAILS, UPDATE_ORDER } from '@/utils/apiroutes'
import { ArrowLeftIcon } from '@radix-ui/react-icons'
import { toast } from '@/components/ui/use-toast'
import LoadingLayout from '@/components/common/LoadingLayout'

function Page({params}) {
    const router = useRouter()

    const [order, setOrder] = useState({
        _id:'183989djffokod',
        totalPrice:980,
        payableAmount:740,
        userPhone:9122874046,
        productName:'black boat earpode | carbonblack ',
        status:'delivered'

    })
    const [loading, setLoading] = useState(true)


    useEffect(()=>{

            axios.post(ORDER_DETAILS, {orderId:params.id}, {withCredentials:true}).then(res=>{
                setOrder(res.data.product);
                setLoading(false)
            }).catch(err=>{
                console.log(err)
            })

    },[params.id])

    function changeStat(status){
        axios.post(UPDATE_ORDER, {updator:'seller', orderId:params.id, status}).then(res=>{
            console.log(res)
            toast({
                title:res.data.msg
            })
        }).catch(err=>{
            console.log(err)
            toast({
                title:err.response.data.msg || err.message
            })
        })
    }

    if(loading){
        return(
            <LoadingLayout/>
        )
    }


    return (
        <>
            <div className='flex items-center'>
                <div className='cursor-pointer' onClick={() => router.back()}><ArrowLeftIcon className='size-5' /></div>
                <div className='ml-4 font-semibold text-[1em]'>Order Summary</div>
            </div>

            <div className='flex flex-wrap shadow-md pb-6'>

                <div className='w-full lg:w-[45vw] overflow-hidden'>
                    <div className='border-b-[1px] border-gray-200 p-2 font-mono text-sm text-gray-500'>
                        Order ID - {order._id}
                    </div>

                    <div className='p-2 shadow-sm mt-2'>
                        <h2>Actions:</h2>
                        <div className=' flex justify-between mt-2'>
                            <Button className='bg-blue-500 w-[30%]' onClick={()=>changeStat('shipped')}>Shipped</Button>
                            <Button className='bg-green-500 w-[30%]' onClick={()=>changeStat('delivered')}>Delivered</Button>
                            <Button className='bg-red-500 w-[30%]' onClick={()=>changeStat('cancelled')}>Cancel</Button>
                        </div>
                    </div>

                    <div className='p-2 flex justify-between items-center border-b-[1px] border-gray-200'>
                        <div>
                            <p className='truncate overflow-ellipsis w-[60vw] lg:w-[35vw] text-[18px]'>
                                {order.productName || 'Product Name'}
                            </p>
                            <p className=' text-gray-500 text-[14px]'>Seller : {'seller name'}</p>
                            {/* <b>₹{order.payableAmount}</b> */}
                        </div>

                        <div className='bg-green-200 flex justify-center items-center text-center p-1 size-24'>Img here</div>

                    </div>

                    <div className='bg-gray-100 p-2 relative pl-6'>
                        {/* <div className='bg-red-400 w-[5px] h-48 absolute left-[21.5px] top-6'></div> */}

                        <div className={`border-l-2 h-10 ${order.status!=='ordered'?'border-green-500':'border-gray-400'} pl-4 relative`}>
                            <b className='rounded-full size-3 bg-green-400 absolute top-0 -left-[6.5px]'></b>
                            <p className='absolute top-[-8px]'>Ordered on (20 nov 2023)</p>
                        </div>
                        <div className={`border-l-2 h-28 ${order.status =='delivered'?'border-green-500':'border-gray-400'} pl-4 relative`}>
                            <b className={`rounded-full size-3 ${order.status != 'ordered'?'bg-green-400':'bg-gray-400'} absolute top-0 -left-[6.5px]`}></b>
                            <p className='absolute top-[-8px]'>Shipped on (27 nov 2023)</p>
                        </div>
                        <div className='h-10 pl-4 relative'>
                            <b className={`rounded-full size-3 ${order.status == 'delivered'?'bg-green-400':'bg-gray-400'} absolute top-0 -left-[5px]`}></b>
                            <p className='absolute top-[-8px]'>Delivered on (29 nov 2023)</p>
                        </div>

                        {/* <div className='border-l-2 h-10 border-green-500 pl-4 relative'>
                            <b className='rounded-full size-3 bg-green-400 absolute bottom-0 -left-[6.5px]'></b>
                            <p className='absolute bottom-[-3px]'>ordered now</p>
                        </div> */}


                    </div>
                </div>

                <div className='w-full lg:w-[50vw] lg:ml-4'>
                    <div className='p-2'>
                        <h2 className='text-sm text-gray-500 border-b-[1px] p-2'>Shipping Details</h2>
                        <div className='p-2'>
                            <p className=' font-semibold text-[18px]'>{'Prince'}</p>
                            <p>{'sursand dumra'}</p>
                            <p>{'bihar'} - {5666}</p>
                            <p>Phone number - {order.userPhone}</p>
                        </div>
                    </div>

                    <div className='p-2'>
                        <h2 className='text-sm text-gray-500 border-b-[1px] p-2'>Price Details</h2>
                        <div className='p-2'>
                            <p className='w-full flex justify-between p-[2px] border-b-[1px] mb-4'>List price - <span>₹{order.totalPrice}</span></p>
                            <p className='w-full flex justify-between p-[2px]'>Selling price - <span>+ ₹{order.totalPrice}</span></p>
                            <p className='w-full flex justify-between p-[2px]'>Discount - <span className=' text-green-700'>- ₹{5}</span></p>
                            <p className='w-full flex justify-between p-[2px]'>Shipping fee - <span>+ ₹{10}</span></p>

                            <p className='w-full flex justify-between p-[4px] mt-4 border-t-[1px] rounded-md'>Total Amount - <span>₹{order.payableAmount}</span></p>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}


export default Page