'use client'
import { Button } from "@/components/ui/button"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    // CarouselApi,
} from "@/components/ui/carousel.jsx"
import { ArrowDownIcon, ArrowLeftIcon } from "@radix-ui/react-icons"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Link from "next/link"
import ProductContainer from "@/components/shop/productContainer/ProductContainer"
import ProductCard from '@/components/shop/productContainer/ProductCard'
import CategoryTitle from "@/components/shop/homeCategory/CategoryTitle"
import CardComp from "@/components/shop/container/CardComp"
import { IoCaretBackCircleOutline, IoCartOutline } from "react-icons/io5"
import Autoplay from "embla-carousel-autoplay"
import { useContext, useEffect, useState } from "react"
import { toast } from "@/components/ui/use-toast"
import axios from "axios"
import { GET_PRODUCT_DETAILS, GET_USER } from "@/utils/apiroutes"
import UserContext from "@/app/context/UseContext"


function Page({ params }) {
    const router = useRouter();
    const [api, setApi] = useState(0);
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);

    const { user, setUser } = useContext(UserContext);

    const [product, setProduct] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!api) {
            return
        }

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })

    }, [count, current, api])

    useEffect(() => {
        const {productType, shopId} = req.querry ;
        
        async function fetchData() {
            try {

                axios.post(`${GET_PRODUCT_DETAILS}/${params.id}`, { productType, shopId }, { withCredentials: true })
                    .then(res => {
                        setProduct(res.data);
                        setLoading(false)
                    });

                if (!user) {
                    axios.get(GET_USER, { withCredentials:true }).then(res => setUser(res.data))
                }

            } catch (err) {
                console.error('error in product detail', err);
                toast({
                    title: err.message
                })
            }
        }
        fetchData()
    }, [params.id, user, setUser])

    if (loading) {
        return (
            <>
                Loading...
            </>
        )
    }


    return (
        <>

            <div className='flex p-3 shadow-md shadow-gray-100 justify-between fixed w-full bg-sky-500 z-30'>
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


            <div className=" bg-gray-200 shadow-md mb-4 pt-16">

                <div className="p-2 flex bg-white border-b-[1px] border-gray-300">
                    <div className="mt-1 size-16 bg-slate-300 flex justify-center items-center">
                        <Image width={100} height={100} alt="img" className="h-full" />
                    </div>

                    <div className="ml-3">
                        <h2 className="font-medium text-lg">Brand</h2>
                        <p className="-mt-1 truncate overflow-ellipsis w-[60vw] text-sm font-medium opacity-80">Product namr goes here </p>
                        <b className="flex items-center">
                            <span className="flex items-center text-green-700"><ArrowDownIcon />45</span>
                            <del className="mx-3 opacity-60">499</del> ₹299</b>
                    </div>
                </div>

                <div className="flex bg-white flex-wrap">
                    <div className="md:flex flex-col p-2 pt-1 hidden">
                        <div className="size-24 flex justify-center items-center bg-slate-100 mt-1">
                            <Image width={100} height={100} alt="img" className="h-full" />
                        </div>
                        <div className="size-24 flex justify-center items-center bg-slate-100 mt-1">
                            <Image width={100} height={100} alt="img" className="h-full" />
                        </div>

                        <div className="size-24 flex justify-center items-center bg-slate-100 mt-1">
                            <Image width={100} height={100} alt="img" className="h-full" />
                        </div>
                        <div className="size-24 flex justify-center items-center bg-slate-100 mt-1">
                            <Image width={100} height={100} alt="img" className="h-full" />
                        </div>
                        <div className="size-24 flex justify-center items-center bg-slate-100 mt-1">
                            <Image width={100} height={100} alt="img" className="h-full" />
                        </div>

                    </div>

                    <Carousel setApi={setApi} className='w-full bg-white max-w-[700px] mt-2'
                        plugins={[
                            Autoplay({
                                delay: 4000,
                            }),
                        ]}>
                        <CarouselContent>
                            {
                                product.images.map(img => {
                                    <CarouselItem>
                                        <div className="size-full h-[60vh] flex justify-center items-center">
                                            <img src={img.src} alt="" className="w-full" />
                                        </div>
                                    </CarouselItem>
                                })
                            }
                            {/* <CarouselItem>
                                <div className="size-full h-[60vh] flex justify-center items-center">
                                    <img src="/omilogo.png" alt="" className="w-full" />
                                </div>
                            </CarouselItem>
                            <CarouselItem>its lorem</CarouselItem>
                            <CarouselItem>...</CarouselItem> */}
                        </CarouselContent>
                        <div className="flex w-full justify-center p-1">
                            <p className={`size-[10px] border-[1px] border-slate-700 rounded-full m-1 ${current == 1 ? 'bg-gray-500' : ''}`}></p>
                            <p className={`size-[10px] border-[1px] border-slate-700 rounded-full m-1 ${current == 2 ? 'bg-gray-500' : ''}`}></p>
                            <p className={`size-[10px] border-[1px] border-slate-700 rounded-full m-1 ${current == 3 ? 'bg-gray-500' : ''}`}></p>
                            <p className={`size-[10px] border-[1px] border-slate-700 rounded-full m-1 ${current == 4 ? 'bg-gray-500' : ''}`}></p>
                            <p className={`size-[10px] border-[1px] border-slate-700 rounded-full m-1 ${current == 5 ? 'bg-gray-500' : ''}`}></p>
                        </div>
                    </Carousel>

                    <div className="relative lg:ml-4 lg:shadow-md lg:p-4 lg:w-[45vw]">
                        <p className="px-2 text-lg bg-white">
                            {product.name}
                        </p>

                        <p className="p-2 pt-4 text-3xl font-mono font-bold bg-white w-full">
                            <del className="mr-4 text-gray-500 opacity-80 font-thin font-serif">{product.deletePrice}</del>
                            ₹{product.price}
                            <span className="text-green-500 text-2xl mb-2 font-medium"> -₹{discount}</span>
                        </p>


                        <div className="p-2 bg-white mt-1 pb-6">
                            <h2 className=" text-lg font-bold mb-2">Offers & Coupons <Link href={'/left'} className="float-right mr-2 underline text-blue-600 font-medium font-mono px-3">info</Link></h2>

                            <RadioGroup defaultValue="none" className='ml-3'>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="balance2" />
                                    <Label htmlFor="balance2" className='opacity-70'>Use 2% Wallet(₹230)</Label>
                                </div>
                                <div className="flex items-center space-x-2 text-2xl">
                                    <RadioGroupItem value="balance50" />
                                    <Label htmlFor="balance50" className='opacity-70'>Use 50% Wallet(₹359)</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="earning" />
                                    <Label htmlFor="earning" className='opacity-70'>Use Earnings(₹450)</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="none" />
                                    <Label htmlFor="none" className='opacity-70'>None</Label>
                                </div>
                            </RadioGroup>

                        </div>

                        <div className="p-2 fixed md:relative lg:mt-32 bottom-0 right-0 w-full flex justify-between border-t-[1px] border-gray-300 bg-white">
                            <Button className='w-[48%] bg-transparent text-black text-lg h-12 hover:bg-green-300'>Add to cart</Button>
                            <Button className='w-[48%] bg-blue-800 text-lg h-12'>Buy</Button>
                        </div>



                    </div>
                </div>
            </div>

            <div className="bg-white py-2 mt-[4px] ">
                <div className='w-full flex justify-center items-center bg-white'>
                    <div className='border-2 w-[95%] rounded'>
                        <CategoryTitle title="SIMILAR PRODUCTS" />
                        <ProductContainer>
                            <ProductCard imgSrc='./discount.jpg' />
                            <ProductCard imgSrc='./grocery.jpg' />
                            <ProductCard imgSrc='./grocery1.jpg' />
                            <ProductCard imgSrc='./vegetables.jpg' />
                            <ProductCard imgSrc='./discount.jpg' />
                            <ProductCard imgSrc='./grocery.jpg' />
                            <ProductCard imgSrc='./grocery1.jpg' />
                            <ProductCard imgSrc='./vegetables.jpg' />
                        </ProductContainer>
                    </div>
                </div>
            </div>

            <div className='md:hidden flex flex-wrap gap-2 mt-6 py-3 bg-green-200 '>
                <h1 className='text-xl font-semibold mx-6'>Sponsered</h1>
                <div className='flex flex-wrap justify-center gap-2'>
                    <CardComp />
                    <CardComp />
                    <CardComp />
                    <CardComp />
                </div>
            </div>
            <div className="bg-white py-2 mt-[4px] pb-24">
                <div className='w-full flex justify-center items-center bg-white'>
                    <div className='border-2 w-[95%] rounded'>
                        <CategoryTitle title="SIMILAR PRODUCTS" />
                        <ProductContainer>
                            <ProductCard imgSrc='./discount.jpg' />
                            <ProductCard imgSrc='./grocery.jpg' />
                            <ProductCard imgSrc='./grocery1.jpg' />
                            <ProductCard imgSrc='./vegetables.jpg' />
                            <ProductCard imgSrc='./discount.jpg' />
                            <ProductCard imgSrc='./grocery.jpg' />
                            <ProductCard imgSrc='./grocery1.jpg' />
                            <ProductCard imgSrc='./vegetables.jpg' />
                        </ProductContainer>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Page