'use client'
// import { BuyScratchCard } from '@/components/main/scratch'
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { IoCartOutline } from "react-icons/io5";
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import axios from 'axios';
import { ACTIVE_COUPONS, BUY_COUPON } from '@/utils/apiroutes';
import Loader from '@/components/common/Loader';

function Page() {
    const router = useRouter()
    const [coupons, setCoupons] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        axios.get(ACTIVE_COUPONS).then(res=>{
            setCoupons(res.data.coupons)
            setLoading(false)
        }).catch(err=>{
            console.log(err)
        })
    },[])
    return (
        <>
            <div className='flex p-3 shadow-md shadow-gray-100 justify-between fixed w-full bg-sky-500 z-30'>
                <div className='flex items-center'>
                    <div className='cursor-pointer' onClick={() => router.back()}><ArrowLeftIcon className='size-5' /></div>
                    <div className='ml-4 font-semibold text-[1em]'>Coupons</div>
                </div>
                <div className='flex'>
                    <div className='py-[2px] px-4 rounded-2xl border-2 border-slate-500 text-xl font-medium' onClick={()=>router.push('/my-coupons')}>
                        History
                    </div>
                </div>
            </div>

            <div className="flex flex-col pt-14 p-2 bg-slate-100 min-h-[100vh]">

                 <CouponCard bgColor={'bg-green-200'} type='60day' pAmount={1000} />
                
                {
                    loading ? <Loader size='medium' title={'Loading...'}/> : (
                        coupons.map(coupon=>{
                            const initalTime = (coupon.period*60*1000) - (Date.now()- new Date(coupon.createdAt).getTime());
                            console.log('ilo', Date.now() - new Date(coupon.createdAt).getTime() )
                            return (
                            <CouponCard type='time' key={coupon._id} couponId={coupon._id} pAmount={coupon.amount} initialTime={parseInt(initalTime/1000)} />
                        )}
                        )
                    )
                }
                {/* <CouponCard initialTime={20} />
                <CouponCard bgColor={'bg-blue-200'} pAmount={200} initialTime={20} />
                <CouponCard bgColor={'bg-green-200'} initialTime={300} />
                <CouponCard bgColor={'bg-sky-200'} initialTime={40} /> */}

            </div>
        </>
    )
}

const CouponCard = ({ couponId, bgColor, pAmount = 20, initialTime , type}) => {
    // console.log('initini',initialTime)
    const router = useRouter()
    const { toast } = useToast()

    
    const [timeLeft, setTimeLeft] = useState(initialTime);

    useEffect(() => {
      const timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime == 0 ? initialTime : prevTime - 1);
      }, 1000);
  
      // Clean up the timer when the component unmounts
      return () => clearInterval(timer);
    }, []);
  
    // Format the time left for display
    const formatTime = (time) => {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };


    const buyCoupon = async (couponRefrence) => {
        try {
            axios.post(BUY_COUPON, {couponRefrence, amount:pAmount, type },{withCredentials:true}).then(res=>{
                toast({
                    title:res.data.msg
                })
            }).catch(err=>{
                toast({
                    title:err.response.data.msg ||err.message
                })
            })

        } catch (err) {
            console.error('error at buying coupon', err);
            toast({
                title: 'umm something went wrong ! try again'
            });
        }
    };

    return (
        <Card className={`flex justify-between p-3 ml-4 mt-4 ${bgColor || 'bg-red-200'} h-fit`}>
            <div className=' size-28 bg-slate-400 flex justify-center items-center -ml-7 rounded-xl'>
                <Image src="/omilogo.png" width={100} height={100} alt="" className='w-full' />
            </div>

            <div className='flex flex-col w-[65%]'>

                <div className='flex justify-between'>
                    <div>
                        <p>Win up to</p>
                        <b className=' text-xl'>₹ {pAmount == 20 && '5,000}{pAmount == 100 && '25,000}{pAmount == 500 && '40,000}{pAmount == 1000 && '1,00,000}</b>
                    </div>
                    <div>
                        <p>{type == 'time' ? Time Left : 'Get Upto'}</p>
                        <b className=' text-xl float-right'>{type == 'time' ? formatTime(timeLeft) : '40 Coupons'}</b>
                    </div>
                </div>
                <br />
                <div className='flex justify-between px-3'>
                    <Button className='bg-gray-200 text-black border-2 hover:bg-slate-300'>Info</Button>
                    <Button className='bg-green-600' onClick={()=>buyCoupon(couponId)}>₹ {pAmount}</Button>
                </div>
            </div>
        </Card>
    );
};

export default Page
