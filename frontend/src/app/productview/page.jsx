'use-client'
import { SEARCH_BY_CATEGORY, SEARCH_PRODUCTS } from '@/utils/apiroutes';
import { ArrowLeftIcon } from '@radix-ui/react-icons'
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { IoCartOutline } from "react-icons/io5";

function Page() {
    const {searchedKay, category} = req.query ;
    const [data, setData] = useState([]);

    useEffect(()=>{
        async function fetchData(){
             let res;
             if(searchedKay){ 
                res = await axios.post(SEARCH_PRODUCTS, {searchedKay}, {withCredentials:true})
             }else if(category){
                res = await axios.post(SEARCH_BY_CATEGORY, {category}, {withCredentials:true})
             }

             setData(res.data)
        }
        fetchData()
    },[])
    return (
        <>
            <div className='flex p-3 shadow-md shadow-gray-100 justify-between fixed w-full bg-white z-30'>
                <div className='flex items-center'>
                    <div><ArrowLeftIcon className='size-5'/></div>
                    <div className='ml-4 font-semibold text-[1em]'>My Wallet</div>
                </div>
                <div className='flex'>
                    <div>Search</div>
                    <div className='relative ml-4'>
                        <b className='border-[2px] bg-red-600 rounded-full absolute size-5 text-sm flex justify-center items-center text-white right-[-4px] top-[-4px] border-black'>{4}</b>
                        <IoCartOutline className='size-8 mr-1'/></div>
                </div>
            </div>

            <div className='p-2 flex flex-wrap justify-around pt-16'>
                {
                    data.forEach(product=>{
                        <ProductCard key={product._id} id={product._id} price={product.price}
                         name={product.name} image={product.image[0]} />
                    })
                }
            </div>


        </>
    )
}

function ProductCard({id, price, image, name}) {
    return (
        <Link href={`/productdetail/${id}`} className='w-[150px] p-[5.5px] m-[2px] border-[1px] border-gray-200 rounded-sm'>
            <div className='bg-green-300 size-[8.7rem] flex justify-center items-center'>
                <Image src={image} width={100} height={100} className='h-full' alt={'img'}/>
            </div>

            <div className='flex flex-col justify-center items-center'>
                <p className='truncate overflow-ellipsis w-full text-medium'>
                    {name || 'Product Name'}
                </p>

                <b >₹{price}</b>
                <p className='text-sm'>
                    <del className=' opacity-40'>{1234}</del>
                     <span className='text-green-600'>{54}% off</span>
                </p>
            </div>
        </Link>
        )
}

export default Page
