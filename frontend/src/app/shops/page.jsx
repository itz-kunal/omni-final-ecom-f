'use client'
import LoadingLayout from '@/components/common/LoadingLayout'
import { Input } from '@/components/ui/input'
import { GET_SHOPS, NEARBY_SHOPS, SEARCH_SHOP } from '@/utils/apiroutes'
import { ArrowLeftIcon } from '@radix-ui/react-icons'
import axios from 'axios'
import { Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { IoCartOutline } from 'react-icons/io5'

function Shops() {
    const router = useRouter()
    const [shops, setShops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchedKey, setSearchedKey] = useState('');

    const getLocation = () => {
        navigator.geolocation.getCurrentPosition(function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            const coordinates = { latitude, longitude }
            localStorage.setItem('location', coordinates)
            console.log("Latitude:", latitude);
            console.log("Longitude:", longitude);

            return { status: true, coordinates }

        }, function (error) {
            // Handle errors
            console.error("Error getting geolocation:", error);
            return { status: false, error }
        });
    }

    useEffect(() => {
        let location = localStorage.getItem('location')

        if (!location) {
            let locationRes = getLocation()
            if (locationRes.status) {
                location = locationRes.coordinates
            }
        }

        if (location) {
            axios.post(NEARBY_SHOPS, { location, size:8 }).then(res=>{
                setShops(res.data.shops)
                setLoading(false)
            }).catch(err=>{
                console.log(err)
            })
        } else {
            axios.post(GET_SHOPS, { size: 8 }).then(res=>{
                setShops(res.data.shops)
                setLoading(false)
            }).catch(err=>{
                console.log(err)
            })
        }
    }, [])

    const handleSearch = () => {
        axios.post(SEARCH_SHOP, { searchedKey }, { withCredentials: true }).then(res => {
            setShops(res.data.shops)
            console.log(res.data)
        }).catch(err => {
            console.log(err.response.data)
        })
    }

    if(loading){
        return(
            <LoadingLayout/>
        )
    }
    return (
        <>
            <div className='flex p-3 shadow-md shadow-gray-100 justify-between fixed w-full bg-white z-30'>
                <div className='flex items-center'>
                    <div className='cursor-pointer' onClick={() => router.back()}><ArrowLeftIcon className='size-5' /></div>
                    <div className='ml-2 font-semibold text-[1em]'>Shops</div>
                </div>
                <div className='flex'>

                    <div className='flex h-8 ml-2'>
                        <Input placeholder='Search Shop' className='size-full'
                            value={searchedKey} onChange={e => setSearchedKey(e.target.value)} />
                        <span onClick={handleSearch} className='h-full w-14 rounded-r-md text-white flex justify-center items-center bg-blue-500'><Search className='font-bold' /></span>
                    </div>

                    <div className='relative ml-4'>
                        <b className='border-[2px] bg-red-600 rounded-full absolute size-5 text-sm flex justify-center items-center text-white right-[-4px] top-[-4px] border-black'>{4}</b>
                        <IoCartOutline className='size-8 mr-1' /></div>
                </div>
            </div>

            <div className='pt-16 p-2 flex flex-wrap justify-around'>
                
                {shops.length > 0 ? (
                    shops.map(shop => (
                        <ShopCard key={shop._id} uniqueName={shop.uniqueName} name={shop.uniqueName} description={shop.description} image={shop.shopImage} />
                    ))) : (
                        <div className='h-full w-full flex justify-center items-center'>
                            Now Shop to Display
                        </div>
                    )
                }

            </div>

        </>
    )
}

function ShopCard({ uniqueName, image, name, description }) {
    return (
        <div className='p-1 m-1 my-2 border-2 w-[150px]'>
            <Link href={`/v/${uniqueName}`}>
            <div className='bg-green-300 size-[8.7rem] flex justify-center items-center'>
                <Image src={image} width={100} height={100} className='h-full' alt={'img'} />
            </div>

            <div className='flex flex-col justify-center items-center'>
                <p className='truncate overflow-ellipsis w-full text-medium font-medium'>
                    {name || 'Shop Name helllo come to dubai its a great city '}
                </p>
                {/* <div className=''> */}
                <p className='line-clamp-3 leading-4 text-center text-md mt-1 text-gray-700 mb-1'>
                    {description || 'No description set'}
                </p>
                {/* </div> */}
            </div>
            </Link>
        </div>
    )
}

export default Shops