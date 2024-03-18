'use client'
import { GET_USER_ORDERS } from '@/utils/apiroutes'
import { formattedDateTime } from '@/utils/time'
import { ArrowLeftIcon } from '@radix-ui/react-icons'
import axios from 'axios'
import Image from 'next/image'
import { Link } from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { IoCartOutline } from 'react-icons/io5'
import { checkLogin } from '../../utils/generalFunctions'

function Page() {
    const router = useRouter()
    const [orders,setOrders] = useState([])

    // useEffect(()=>{
    //     checkLogin(router)
    // },[router])

    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const res = await axios.get(GET_USER_ORDERS, {withCredentials:true})

                setOrders(res.data)
            }catch(err){
                console.error('orders err', err)
            }
        }

        fetchData()
    },[])

    return (
        <>
            <div className='flex p-3 shadow-md shadow-gray-100 justify-between fixed w-full bg-white z-30'>
                <div className='flex items-center'>
                    <div className='cursor-pointer' onClick={() => router.back()}><ArrowLeftIcon className='size-5' /></div>
                    <div className='ml-4 font-semibold text-[1em]'>Coupons</div>
                </div>
                <div className='flex'>
                    <div>Search</div>
                    <div className='relative ml-4'>
                        <b className='border-[2px] bg-red-600 rounded-full absolute size-5 text-sm flex justify-center items-center text-white right-[-4px] top-[-4px] border-black'>{4}</b>
                        <IoCartOutline className='size-8 mr-1' /></div>
                </div>
            </div>

            <div className='pt-16'>
                {
                    orders.map((order)=>{
                        <OrderCard key={order._id} id={order._id} name={order.productName} status={order.status} date={order.returnedAt || order.cancelledAt || order.deliveredAt || order.shippedAt || order.createdAt} image={order.prodImage}/>
                    })
                }

                <div className='flex border-b-[1px] border-gray-300 p-2 items-center mb-4'>
                    <div className='bg-green-200 flex justify-center items-center text-center p-1 size-20'>
                        <Image src={'/omilogo.png'} width={100} height={100} alt='img' className=' h-full'/>
                    </div>

                    <div className='ml-4'>
                        <h3>Delivered on {'oct 26, 2023'}</h3>
                        <p className='truncate overflow-ellipsis w-[75vw] text-sm text-gray-500'>{'product name lorem epsum dolar sit go to england for buying xyz'}</p>
                    </div>
                </div>

                <div className='flex border-b-[1px] border-gray-300 p-2 items-center mb-4'>
                    <div className='bg-green-200 flex justify-center items-center text-center p-1 size-20'>Img here</div>

                    <div className='ml-4'>
                        <h3>Delivered on {'oct 26, 2023'}</h3>
                        <p className='truncate overflow-ellipsis w-[75vw] text-sm text-gray-500'>{'product name lorem epsum dolar sit go to england for buying xyz'}</p>
                    </div>
                </div>


            </div>

        </>
    )
}

const OrderCard = ({id, name, date, image, status}) => {
    return (
        <Link href={`/orderdetails/${id}`} className='flex border-b-[1px] border-gray-300 p-2 items-center mb-4'>
            <div className='bg-green-200 flex justify-center items-center text-center p-1 size-20'>
                <Image src={image} width={100} height={100} alt='img' className='h-full'/>
            </div>

            <div className='ml-4'>
                <h3>
                    {status=='returned'&&'Returned on'}
                    {status == 'cancelled'&&'Cancelled on'}
                    {status == 'delivered'&&'Delivered on'}
                    {status == 'shipped' ? 'Shipped on' : 'Ordered on'}
                    {formattedDateTime(date).date}
                </h3>

                <p className='truncate overflow-ellipsis w-[75vw] text-sm text-gray-500'>
                    {name || 'product name'}
                </p>
            </div>
        </Link>
    )
}

export default Page