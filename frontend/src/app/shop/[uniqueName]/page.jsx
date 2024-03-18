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


const Home = ({params}) => {
   const [products, setProducts] = useState([]);
   const [electronics, setElectronics] = useState([]);
   const [fmcg, setFmcg] = useState([]);
   const [loading, setLoading] = useState(true)


   useEffect(() => {
      function fetchData() {
        axios.get(`${GET_SHOP}/${params.uniqueName}?size=10`, {withCredentials:true}).then(res=>{
            setProducts(res.data.products);
        })
      }
      fetchData()
   }, [])


   const slides = [
      { url: "/discount.jpg", title: "Discount" },
      { url: "/vegetables.jpg", title: "Discount" },
      { url: "/discount.jpg", title: "Discount" },
      { url: "/vegetables.jpg", title: "Discount" },
   ]

   return (
      <>
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

         <div className='md:hidden flex flex-wrap gap-2 mt-6 py-3'>
            <h1 className='text-xl font-semibold mx-6'>Sponsered</h1>
            <div className='flex flex-wrap justify-center gap-2'>
               <Card bg={true} />
               <Card bg={true} />
               <Card bg={true} />
               <Card bg={true} />
               <Card bg={true} />
               <Card bg={true} />
               <Card bg={true} />
            </div>
         </div>

         <Footer className='hidden md:flex' />
         <BottomHeader />
      </>
   )
}

export default Home

