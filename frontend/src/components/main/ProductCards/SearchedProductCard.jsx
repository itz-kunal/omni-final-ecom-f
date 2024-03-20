'use client'
import Image from 'next/image'
import Link from 'next/link'

function SearchedProductCard({ name, id, price, image }) {
    return (
        <>
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
        </>
    )
}

export default SearchedProductCard