'use client'
import React, { useEffect, useState } from 'react'
import Header from '@/components/shop/header/Header'
import ImageSlider from '@/components/shop/slider/ImageSlider'
import CategoryBar from '@/components/shop/homeCategory/CategoryBar'
import CategoryTitle from '@/components/shop/homeCategory/CategoryTitle'
import ProductContainer from '@/components/shop/productContainer/ProductContainer'
import Footer from '@/components/shop/footer/Footer'
import Card from '@/components/shop/card/Card'
import ProductCard from '@/components/shop/productContainer/ProductCard'
import { SearchIcon } from 'lucide-react'
import { Input } from "@/components/ui/input"
import CardComp from '@/components/shop/container/CardComp'
import BottomHeader from '@/components/shop/header/BottomHeader'
import axios from 'axios'
import { GET_PRODUCTS, SEARCH_BY_CATEGORY } from '@/utils/apiroutes'
import { useRouter } from 'next/navigation'

const Home = () => {
   const router = useRouter();
   const [products, setProducts] = useState([]);
   const [electronics, setElectronics] = useState([]);
   const [fmcg, setFmcg] = useState([]);
   const [loading, setLoading] = useState(true)

   const [searchedKey, setSearchedKey] = useState('')


   useEffect(() => {
      function fetchData() {
         axios.get(`${GET_PRODUCTS}?size=10`, { withCredentials: true }).then(res => {
            setProducts(res.data)
         }).catch(err=>{
            console.log(err)
         })
         axios.post(SEARCH_BY_CATEGORY, { productType: 'general', category: 'electronics', size: 4 }, { withCredentials: true }).then(res => setElectronics(res.data))
         .catch(err=>{
            console.log(err)
         })
         axios.post(SEARCH_BY_CATEGORY, { productType: 'general', category: 'fmcg', size: 4 }, { withCredentials: true }).then(res => setFmcg(res.data))
         .catch(err=>{
            console.log(err)
         })
      }
      fetchData()
   }, [])

   useEffect(() => {
      console.log(products, electronics, fmcg)

   }, [products, fmcg, electronics])

   const slides = [
      { url: "/discount.jpg", title: "Discount" },
      { url: "/vegetables.jpg", title: "Discount" },
      { url: "/discount.jpg", title: "Discount" },
      { url: "/vegetables.jpg", title: "Discount" },
   ]

   return (
      <>
         <Header />
         <div className='md:hidden flex justify-center items-center w-[80%] border border-input rounded-md mx-auto mt-2'>
            <Input placeholder='Search For Products, Shops and More' value={searchedKey} onChange={e=>setSearchedKey(e.target.value)} className='rounded-r-none' />

            <div onClick={()=>router.push(`/productview?searchedKey=${searchedKey}`)} className='bg-blue-500 h-9 w-16 flex justify-center items-center rounded-r-md text-white'>
            <SearchIcon />
            </div>
         </div>
         <ImageSlider slides={slides} className='md:hidden' />
         <CategoryBar />
         <ImageSlider slides={slides} className='hidden md:flex' />
         
         <div className='md:hidden flex justify-around w-full px-1 sm:gap-2'>{products.length > 0 &&<>
            <Card name={products[0]?.name} price={products[0]?.price} image={products[0]?.image.url } />
            <Card  name={products[1]?.name} price={products[1]?.price} image={products[1]?.image.url } />
            <Card  name={products[2]?.name} price={products[2]?.price} image={products[2]?.image.url }/>
            </>}
         </div>

         <div className='md:hidden flex flex-wrap gap-2 mt-6 py-3 bg-pink-400'>
            <h1 className='text-xl font-semibold mx-6'>Sponsered</h1>
            <div className='flex flex-wrap justify-center gap-2'>{products.length > 0&&<>
               <Card bg={true}  name={products[3]?.name} price={products[3]?.price} image={products[3]?.image.url } />
               <Card bg={true}  name={products[4]?.name} price={products[4]?.price} image={products[4]?.image.url } />
               <Card bg={true}  name={products[5]?.name} price={products[5]?.price} image={products[4]?.image.url } />
               <Card bg={true}  name={products[6]?.name} price={products[6]?.price} image={products[6]?.image.url } />
            </>}
            </div>
         </div>

         <div className='w-full flex justify-center items-center mt-6'>
            <div className='border-2 w-[95%] rounded'>
               <CategoryTitle title="TOP DEALS" />
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

         <div className='md:hidden flex flex-wrap gap-2 mt-6 py-3 bg-blue-400'>
            <h1 className='text-xl font-semibold mx-6'>Sponsered</h1>
            <div className='flex flex-wrap justify-center gap-2'>
               <CardComp />
               <CardComp />
               <CardComp />
               <CardComp />
            </div>
         </div>

         <div className='flex gap-1 w-[95%] mt-6 justify-between mx-auto'>
            <Card />
            <Card />
            <Card />
         </div>

         <div className='md:hidden flex flex-wrap gap-2 mt-6 py-3 bg-pink-400'>
            <h1 className='text-xl font-semibold mx-6'>Sponsered</h1>
            <div className='flex flex-wrap justify-center gap-2'>
               <CardComp />
               <CardComp />
               <CardComp />
               <CardComp />
            </div>
         </div>


         <div className='w-full flex justify-center items-center mt-6'>
            <div className='border-2 w-[95%] rounded'>
               <CategoryTitle title='Recommended For You' />
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

         <div className='flex gap-1 w-[95%] mt-6 mx-auto justify-between'>
            <Card />
            <Card />
            <Card />
         </div>

         <div className='w-full flex justify-center items-center mt-6'>
            <div className='border-2 w-[95%] rounded'>
               <CategoryTitle />
               <ProductContainer>
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


         <div className='md:hidden flex flex-wrap gap-2 mt-6 py-3 bg-pink-400'>
            <h1 className='text-xl font-semibold mx-6'>Sponsered</h1>
            <div className='flex flex-wrap justify-center gap-2'>
               <CardComp />
               <CardComp />
               <CardComp />
               <CardComp />
            </div>
         </div>


         {/* <div className='w-full flex justify-center items-center mt-6'>
            <div className='border-2 w-[95%] rounded'>
               <CategoryTitle title="New Arrived" />
               <ProductContainer>
                  <ProductCard imgSrc='./grocery1.jpg' />
                  <ProductCard imgSrc='./vegetables.jpg' />
                  <ProductCard imgSrc='./discount.jpg' />
                  <ProductCard imgSrc='./grocery.jpg' />
                  <ProductCard imgSrc='./grocery1.jpg' />
                  <ProductCard imgSrc='./vegetables.jpg' />
               </ProductContainer>
            </div>
         </div>

         <div className='w-full flex justify-center items-center mt-6'>
            <div className='border-2 w-[95%] rounded'>
               <CategoryTitle title="New Arrived" />
               <ProductContainer>
                  <ProductCard imgSrc='./grocery1.jpg' />
                  <ProductCard imgSrc='./vegetables.jpg' />
                  <ProductCard imgSrc='./discount.jpg' />
                  <ProductCard imgSrc='./grocery.jpg' />
                  <ProductCard imgSrc='./grocery1.jpg' />
                  <ProductCard imgSrc='./vegetables.jpg' />
               </ProductContainer>
            </div>
         </div>

         <div className='w-full flex justify-center items-center mt-6'>
            <div className='border-2 w-[95%] rounded'>
               <CategoryTitle title="New Arrived" />
               <ProductContainer>
                  <ProductCard imgSrc='./grocery1.jpg' />
                  <ProductCard imgSrc='./vegetables.jpg' />
                  <ProductCard imgSrc='./discount.jpg' />
                  <ProductCard imgSrc='./grocery.jpg' />
                  <ProductCard imgSrc='./grocery1.jpg' />
                  <ProductCard imgSrc='./vegetables.jpg' />
               </ProductContainer>
            </div>
         </div> */}


         <Footer className='hidden md:flex' />
         <BottomHeader />
      </>
   )
}

export default Home

