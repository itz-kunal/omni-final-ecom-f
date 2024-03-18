'use client'
import Header from '@/components/shop/Header';
import ProductCard from '@/components/shop/product';
import '@/styles/shopStyle.css'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Footer from '@/components/shop/Footer';
import { useToast } from '@/components/ui/use-toast';
import Home from './home/page';

const smartphones = [
  {
    name: "Product 1",
    brand: 'Puma',
    image: "/images/prod/f1.jpg",
    oldPrice: 30999,
    currentPrice: 2699,
  },
  {
    name: "Product 2",
    brand: 'prod',
    image: "/images/prod/f2.jpg",
    oldPrice: 30999,
    currentPrice: 2799,
  },
  {
    name: "Product 3",
    brand: 'prod',
    image: "/images/prod/f3.jpg",
    oldPrice: 30999,
    currentPrice: 2699,
  },
  {
    name: "Product 4",
    brand: 'adiddas',
    image: "/images/prod/f4.jpg",
    oldPrice: 30999,
    currentPrice: 2699
  },
  {
    name: "Product 5",
    brand: 'file',
    image: "/images/prod/f5.jpg",
    oldPrice: 30999,
    currentPrice: 2699
  },
  {
    name: "collection 1",
    brand: 'sparkey',
    image: "/images/prod/f6.jpg",
    oldPrice: 30999,
    currentPrice: 2699
  },
  {
    name: "Product 3",
    brand: 'prod',
    image: "/images/prod/f3.jpg",
    oldPrice: 30999,
    currentPrice: 2699
  },
  {
    name: "Product 3",
    brand: 'prod',
    image: "/images/prod/f3.jpg",
    oldPrice: 30999,
    currentPrice: 2699
  },
  {
    name: "collection 1",
    brand: 'sparkey',
    image: "/images/prod/f6.jpg",
    oldPrice: 30999,
    currentPrice: 2699
  },
  {
    name: "Product 3",
    brand: 'prod',
    image: "/images/prod/f3.jpg",
    oldPrice: 30999,
    currentPrice: 2699
  },
  {
    name: "Product 3",
    brand: 'prod',
    image: "/images/prod/f3.jpg",
    oldPrice: 30999,
    currentPrice: 2699
  },

];

const Page = () => {
 
  return (
    <Home />
  );
};

export default Page;