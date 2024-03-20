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
import { GET_PRODUCTS, GET_SHOP, SEARCH_BY_CATEGORY } from '@/utils/apiroutes'
import LoadingLayout from '@/components/common/LoadingLayout'
import TakeLocation from '@/components/common/TakeLocation'


const Home = ({ params }) => {
   const [shop, setShop] = useState('')
   const [products, setProducts] = useState([]);
   const [electronics, setElectronics] = useState([]);
   const [fmcg, setFmcg] = useState([]);
   const [loading, setLoading] = useState(true)


   useEffect(() => {

      axios.get(`${GET_SHOP}/${params.uniqueName}?size=10`, { withCredentials: true }).then(res => {
         setShop(res.data.shop);
         setLoading(false)
         setProducts(res.data.products);
      }).catch(err=>{
         console.error(err)
      })

   }, [])


   const slides = [
      { url: "/discount.jpg", title: "Discount" },
      { url: "/vegetables.jpg", title: "Discount" },
      { url: "/discount.jpg", title: "Discount" },
      { url: "/vegetables.jpg", title: "Discount" },
   ]

   // if(loading){
   //    return(
   //       <LoadingLayout/>
   //    )
   // }

   return (
      <>
      <TakeLocation/>
         <Header />
         <div className='md:hidden flex justify-center items-center gap-4 w-[80%] border border-input pr-4 rounded-md mx-auto mt-2'>
            <Input placeholder='Search For Products' />
            <SearchIcon />
         </div>
         <ImageSlider slides={slides} className='md:hidden' />
         {/* <CategoryBar /> */}
         <ImageSlider slides={slides} className='hidden md:flex' />



         <div className='w-full flex justify-center items-center mt-6'>
            <div className='border-2 w-[95%] rounded'>
               <CategoryTitle title="TOP PRODUCTS" />
               <ProductContainer>
                  
                  {
                     products.length > 0 ? (
                        products.map(product=>(
                           <ProductCard key={product._id} imgTitle={product.name} imgSrc={product.image}/>
                        ))
                     )  : (
                        <div className='flex h-full w-full justify-center items-center'>
                           No Product Added Yet
                        </div>
                     )
                  }

               </ProductContainer>
            </div>
         </div>

         <div className='md:hidden flex flex-wrap gap-2 mt-6 py-3'>
            <h1 className='text-xl font-semibold mx-6'>Products</h1>
            <div className='flex flex-wrap justify-center gap-2'>
               {
                   products.length > 0 ? (
                     products.map(product=>(
                        <Card key={product._id} bg={true} name={product.name} price={product.price} image={product.image}/>
                     ))
                  )  : (
                     <div className='flex h-full w-full justify-center items-center'>
                        No Product Added Yet
                     </div>
                  )
               }
               {/* <Card bg={true} />
               <Card bg={true} />
               <Card bg={true} />
               <Card bg={true} />
               <Card bg={true} />
               <Card bg={true} />
               <Card bg={true} /> */}
            </div>
         </div>

         <Footer className='hidden md:flex' />
         <BottomHeader />
      </>
   )
} 

export default Home

