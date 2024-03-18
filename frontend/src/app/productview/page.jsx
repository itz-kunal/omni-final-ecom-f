'use client'
import { Input } from '@/components/ui/input';
import { SEARCH_BY_CATEGORY, SEARCH_PRODUCTS } from '@/utils/apiroutes';
import { ArrowLeftIcon } from '@radix-ui/react-icons'
import axios from 'axios';
import { Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IoCartOutline } from "react-icons/io5";

function Page({ searchParams }) {
    const router = useRouter()
    const { category, productType } = searchParams;
    const [searchedKey, setSearchedKey] = useState(searchParams?.searchedKey || '')

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true)

    async function fetchData() {
        let res;
        if (searchedKey) {
            res = await axios.post(SEARCH_PRODUCTS, { searchedKey }, { withCredentials: true })
        } else if (category) {
            res = await axios.post(SEARCH_BY_CATEGORY, { category, productType }, { withCredentials: true })
        } else {
            res = { data: [] }
        }

        setData(res.data)
        setLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [])

    if (loading) {
        return (
            <>
                Loading...
            </>
        )
    }
    return (
        <>
            <div className='flex p-3 shadow-md shadow-gray-100 justify-between fixed w-full bg-white z-30'>
                <div className='flex items-center'>
                    <div className='cursor-pointer' onClick={() => router.back()}><ArrowLeftIcon className='size-5' /></div>
                    <div className='ml-2 font-semibold text-[1em]'>Products</div>
                </div>
                <div className='flex'>

                    <div className='flex h-8 ml-2'>
                        <Input placeholder='Search Shop' className='size-full rounded-r-none'
                            value={searchedKey} onChange={e => setSearchedKey(e.target.value)} />
                        <span onClick={fetchData} className='h-full w-14 rounded-r-md text-white flex justify-center items-center bg-blue-500'><Search className='font-bold' /></span>
                    </div>

                    <div className='relative ml-4'>
                        <b className='border-[2px] bg-red-600 rounded-full absolute size-5 text-sm flex justify-center items-center text-white right-[-4px] top-[-4px] border-black'>{4}</b>
                        <IoCartOutline className='size-8 mr-1' /></div>
                </div>
            </div>


            <div className='p-2 flex flex-wrap justify-around pt-16'>
                {
                    data.map(product => {
                        <ProductCard key={product._id} id={product._id} price={product.price}
                            name={product.name} image={product.image[0]} />
                    })
                }

                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
            </div>


        </>
    )
}

function ProductCard({ id, price, image, name }) {
    return (
        <Link href={`/productdetail/${id}`} className='w-[150px] p-[5.5px] m-[2px] border-[1px] border-gray-200 rounded-sm'>
            <div className='bg-green-300 size-[8.7rem] flex justify-center items-center'>
                <Image src={image} width={100} height={100} className='h-full' alt={'img'} />
            </div>

            <div className='flex flex-col justify-center items-center'>
                <p className='truncate overflow-ellipsis w-full text-medium'>
                    {name || 'Product Name'}
                </p>

                <b >₹{price || 1200}</b>
                <p className='text-sm'>
                    <del className=' opacity-40'>{1234}</del>
                    <span className='text-green-600 ml-2'>{54}% off</span>
                </p>
            </div>
        </Link>
    )
}

export default Page