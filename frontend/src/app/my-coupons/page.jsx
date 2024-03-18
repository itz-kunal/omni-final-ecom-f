'use client'
import { IoCartOutline } from "react-icons/io5";
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from "react";
import { GET_COUPONS, OPEN_SCRATCH } from "@/utils/apiroutes";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { formattedDateTime } from "@/utils/time";
import { checkLogin } from "@/utils/generalFunctions";

function Page() {
    const router = useRouter();
    const [coupons, setCoupons] = useState([]);

    useEffect(()=>{
        checkLogin(router)
    },[router])
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const couponsRes = await axios.get(GET_COUPONS, { withCredentials: true })
                setCoupons(couponsRes.data)

            } catch (err) {
                console.log('err in coupons', err)
                toast({
                    title: err.message
                })
            }
        }
        fetchData()
    }, [])
    return (
        <>
            <div className='flex p-3 shadow-md shadow-gray-100 justify-between fixed w-full bg-white z-30'>
                <div className='flex items-center'>
                    <div className="cursor-pointer" onClick={() => router.back()}><ArrowLeftIcon className='size-5' /></div>
                    <div className='ml-4 font-semibold text-[1em]'>My Coupons</div>
                </div>
                <div className='flex'>
                    {/* <div>Search</div> */}
                    <div className='relative ml-4 bg-green-500 px-4 p-1 rounded-2xl shadow-md cursor-pointer' onClick={() => router.push('/shop/coupons')}>
                        Buy Scratch
                    </div>
                </div>
            </div>

            <div className=" p-2 pt-16 flex flex-col w-[100vw] bg-slate-100 min-h-[100vh]">
                {coupons.map((coupon) => {
                    return <CouponCard key={coupon._id} amount={coupon.win} date={formattedDateTime(parseFloat(coupon.createdAt)).date} />
                })}
            </div>
        </>
    )
}


const CouponCard = ({ amount, date }) => {

    // const [prizeValue, setPrizeValue] = useState(prize || 0);
    // const [isScratched, setScratched] = useState(scratched);


    // const openScratch = async (id) => {
    //     try {
    //         const res = await axios.post(OPEN_SCRATCH, { cardId: id }, { withCredentials: true });
    //         setPrizeValue(res.data.win)
    //         setScratched(true);
    //     } catch (err) {
    //         console.error('error in opening scratch ', err)
    //         toast({
    //             title: 'error in opening card'
    //         })
    //     }
    // }

    return (
        <>
            <Card className={`mt-3 p-2 flex items-center ${amount >= 100 ? 'bg-orange-50' : ''}`}>
                <div className=" size-14 flex justify-center items-center rounded-md bg-slate-300">
                    <Image src={'/omilogo.png'} width={100} height={100} alt="omni-logo" className="w-full" />
                </div>

                <div className="ml-2 w-[calc(100vw-7rem)]">
                    <p className="text-[18px]">You win <span className="text-green-600 font-medium text-lg float-right">+ ₹{amount || 0}</span></p>
                    <p className="text-gray-500 text-[15px] mt-1">Received on <span className="float-right text-red-500 font-mono">{date || 'NaN Pending'}</span></p>
                </div>
            </Card>
        </>
    );

};

export default Page