'use client'
import React, { useEffect, useState } from 'react'
import { PhoneIcon, CopyIcon, CopyCheckIcon, UserCircle, ShoppingCartIcon, Trash2, Edit2, Search } from 'lucide-react'
import { Textarea } from "@/components/ui/textarea"
import BottomHeader from '@/components/shop/header/BottomHeader'
import Footer from '@/components/shop/footer/Footer'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { FaPen } from 'react-icons/fa'
import { Input } from '@/components/ui/input'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from '@/components/ui/use-toast'
import axios from 'axios'
import { EDIT_PRODUCT, SELLER_SHOP_DATA } from '@/utils/apiroutes'
import { useRouter } from 'next/navigation'
import { checkLogin } from '@/utils/generalFunctions'




const Shop = () => {
    const router = useRouter()
    const [isCopy, setIsCopy] = useState(false);
    const [shop, setShop] = useState({});

    const handleCopy = () => {
        setIsCopy(true)
    }

    useEffect(() => {
        checkLogin(router)
    }, [router])
    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get(SELLER_SHOP_DATA, { withCredentials: true })

                console.log(res.data)

                setShop(res.data)
            } catch (err) {
                console.error('my-shop err', err);
                toast({
                    title: err.message
                })
            }
        }

        fetchData()
    }, [])

    return (
        <>
            <div className='w-full min-h-screen'>
                <div className='bg-white py-4 text-xl font-semibold sticky top-0 flex items-center px-6 border-b justify-between z-10'>
                    Manage Your Shop
                </div>

                <div className='p-2 bg-sky-300'>
                    <div className='flex items-center'>
                        <div className='size-20 rounded-md flex justify-center items-center bg-slate-400'>
                            <Image src={'/omilogo.png'} width={100} height={100} alt='omni-logo' />
                        </div>

                        <div className='ml-4 h-full'>
                            <b className='mb-4 text-lg'>{shop.name || 'Shop Name'}</b>
                            <div className='pt-2'>
                                <span className=' cursor-pointer border-b-2 border-dashed border-black text-sm font-medium'>EDIT SHOP</span>
                                <Link href={'sxy'} className=' border-b-2 border-dashed border-black ml-5 text-sm font-medium'>CUSTOMER VIEW</Link>
                            </div>

                        </div>
                    </div>
                    <p className='mt-2'>
                        {shop.description || 'Shop description'}
                    </p>
                </div>
                <div className='p-2 bg-slate-200 pt-6'>
                    <div className='mb-2 flex justify-between'>
                        <Button className='w-[48%]'>Pending Orders</Button>
                        <Button className='w-[48%]'>Completed Orders</Button>
                    </div>
                    <Input placeholder='Search in Shop' className='bg-white' />
                </div>
                <div className='p-2 bg-slate-200'>
                    <div className='flex justify-between py-2'>
                        <h2 className='font-medium text-lg'>Your Products</h2>
                        <span className='text-sm font-mono font-semibold'>Filter</span>
                    </div>

                    <div className='flex flex-wrap justify-around'>
                        <ProductCard onClick={() => alert('hello')} />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />

                    </div>
                </div>

                <div className='flex flex-col items-center'>
                    <p>Share Shop With Your Friends</p>
                    <button className='flex items-center my-2 rounded-md bg-green-600 pr-2 text-white'><div className=' rounded p-2 text-white border-r-2 mr-2'><PhoneIcon /></div>Whatsapp</button>
                </div>

                <div className='flex items-center px-6 justify-center'>
                    <hr className='w-[45%] h-1 bg-black' />
                    <div className='p-1 border-2 rounded-full'>OR</div>
                    <hr className='w-[45%] h-1 bg-black' />
                </div>

                <div className='flex w-[90%] md:w-[60%] mx-auto mt-4 mb-12 border-2 items-center pr-2'>
                    <Textarea placeholder={'Link'} disabled />
                    <div onClick={handleCopy}>
                        {isCopy ? <CopyCheckIcon /> : <CopyIcon />}
                    </div>
                </div>
                <Footer className='hidden md:flex' />
                <BottomHeader />



            </div>
        </>
    )
}

const ProductCard = ({ productId, image, name }) => {
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');

    async function postDelete() {
        try {

            const res = await axios.post(DELETE_PRODUCT, { productId }, { withCredentials: true })

            toast({
                title: res.data
            })

        } catch (err) {
            console.error('my-shop err', err);
            toast({
                title: err.message
            })
        }
    }

    async function handleSubmit() {
        try {

            const res = await axios.post(EDIT_PRODUCT, { productId, price, quantity }, { withCredentials: true })

            toast({
                title: res.data
            })

        } catch (err) {
            console.error('my-shop err', err);
            toast({
                title: err.message
            })
        }
    }

    return (
        <div className='bg-white p-2 m-1 rounded-sm w-[175px] leading-4 relative'>

            <div className='size-36 mx-auto  flex justify-center items-center border-b-[1px] border-gray-300 pb-1 mb-1'>
                <Image src={image} width={100} height={100} alt='groceyr-img' className='h-full' />
            </div>

            <div>
                <AlertDialog>

                    <AlertDialogTrigger>
                        <Trash2 className='absolute text-red-600 top-3 right-2 p-1 size-8 hover:bg-gray-400' />

                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete this
                                product and remove your data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={postDelete}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

                <Dialog>
                    <DialogTrigger>
                        <FaPen className='absolute right-1 size-6 mr-8 mt-2 p-1 hover:bg-gray-400' />
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit You Product :</DialogTitle>
                            <DialogDescription>
                                <form>
                                    <div>
                                        <label htmlFor="firstName" className='float-left'>Price:</label>
                                        <Input
                                            type="number"
                                            name="price"
                                            placeholder="Enter Price"
                                            value={price}
                                            onChange={e => setPrice(e.target.value)}
                                        />
                                    </div>
                                    <div className='mt-3'>
                                        <label htmlFor="quantity" className='float-left'>Quantity:</label>
                                        <Input
                                            type='number'
                                            name='quantity'
                                            placeholder='Enter Quantity'
                                            value={quantity}
                                            onChange={e => setQuantity(e.target.value)}
                                        />
                                    </div>
                                    <Button className='mt-2' type="submit" onClick={handleSubmit}>Save</Button>
                                </form>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>

                {/* <Edit2 /> */}
                <p className='text-sm font-medium from-accent-foreground'>Price - <span>₹{price}</span></p>
                <p className='text-sm font-medium from-accent-foreground -mt-1'>Quantity - <span>{quantity}</span></p>
                <div className='w-full mt-1h-9 overflow-ellipsis mt-2 opacity-90'>
                    <p class="line-clamp-2">
                        {name || 'Product Name'}
                    </p>
                </div>
            </div>

            <div className='w-full p-2 text-center rounded-sm mt-2 border-2 border-green-400'>
                View Product
            </div>
        </div>
    )
}

export default Shop
