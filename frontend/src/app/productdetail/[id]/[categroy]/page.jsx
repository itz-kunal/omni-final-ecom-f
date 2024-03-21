"use client";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  // CarouselApi,
} from "@/components/ui/carousel.jsx";
import { IoMdAdd } from "react-icons/io";
import { FiMinus } from "react-icons/fi";
import { ArrowDownIcon, ArrowLeftIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import ProductContainer from "@/components/shop/productContainer/ProductContainer";
import ProductCard from "@/components/shop/productContainer/ProductCard";
import CategoryTitle from "@/components/shop/homeCategory/CategoryTitle";
import CardComp from "@/components/shop/container/CardComp";
import { IoCartOutline } from "react-icons/io5";
import Autoplay from "embla-carousel-autoplay";
import { useContext, useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { BUY_PRODUCT, GET_PRODUCT_DETAILS, GET_USER } from "@/utils/apiroutes";
import UserContext from "@/app/context/UseContext";
import PayNow from "@/components/common/PayNow";

function Page({ params }) {
  const router = useRouter();
  const [api, setApi] = useState(0);
  const [current, setCurrent] = useState(0);
  const [coupon, setcoupon] = useState("none");
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  const [count, setCount] = useState(0);
  const [product, setProduct] = useState(undefined);
  const [payNow, setPayNow] = useState({});
  const [loading, setLoading] = useState(true);

  const buyNow = async () => {
    try {
      if (product) {
        setPayNow({
          shopId:product.addedBy,  
          productType: params.categroy,
          productId: product._id,
          quantity: quantity,
          size,
          discount50: coupon === "balance50",
          discount10: coupon === "balance2",
          balance: coupon === "earning",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addtocart = async () => {
    try {
      console.log(coupon);
    } catch (err) {
      console.log(err);
    }
  };

  //for automatic scrolling caresol
  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [count, current, api]);

  useEffect(() => {
    const call = async () => {
      setLoading(true);
      const { data } = await axios.post(
        `${GET_PRODUCT_DETAILS}/${params.id}`,
        { productType: params.categroy},
        { withCredentials: true }
      );
      setProduct(data);
      setLoading(false);
    };
    call();
  }, [params]);

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <>
      <div className="flex p-3 shadow-md shadow-gray-100 justify-between fixed w-full bg-sky-500 z-30">
        {payNow && <PayNow payNow={payNow} setPayNow={setPayNow}/>}
        <div className="flex items-center">
          <div className="cursor-pointer" onClick={() => router.back()}>
            <ArrowLeftIcon className="size-5" />
          </div>
          <div className="ml-4 font-semibold text-[1em]">Product Detail</div>
        </div>
        <div className="flex">
          <div>Search</div>
          <div className="relative ml-4">
            <b className="border-[2px] bg-red-600 rounded-full absolute size-5 text-sm flex justify-center items-center text-white right-[-4px] top-[-4px] border-black">
              {4}
            </b>
            <IoCartOutline className="size-8 mr-1" />
          </div>
        </div>
      </div>

      <div className=" bg-gray-200 shadow-md mb-4 pt-16">
        {/* top advertisement branding section */}
        <div className="p-2 flex bg-white border-b-[1px] border-gray-300">
          <div className="mt-1 size-16 bg-slate-300 flex justify-center items-center">
            <Image width={100} height={100} alt="img" className="h-full" />
          </div>

          <div className="ml-3">
            <h2 className="font-medium text-lg">Brand</h2>
            <p className="-mt-1 truncate overflow-ellipsis w-[60vw] text-sm font-medium opacity-80">
              Product namr goes here{" "}
            </p>
            <b className="flex items-center">
              <span className="flex items-center text-green-700">
                <ArrowDownIcon />
                45
              </span>
              <del className="mx-3 opacity-60">499</del> ₹299
            </b>
          </div>
        </div>

        <div className="flex bg-white flex-wrap">
          <div className="md:flex flex-col p-2 pt-1 hidden">
            {product &&
              product.images.map((img, i) => (
                <div
                  key={i}
                  className="size-24 flex justify-center items-center bg-slate-100 mt-1"
                >
                  <Image
                    src={img.src}
                    width={100}
                    height={100}
                    alt="img"
                    className="w-full"
                  />
                </div>
              ))}
          </div>

          <Carousel
            setApi={setApi}
            className="w-full bg-white max-w-[650px] mt-2"
            plugins={[
              Autoplay({
                delay: 4000,
              }),
            ]}
          >
            <CarouselContent>
              {product.images.map((img, i) => (
                <CarouselItem key={i}>
                  <div className="size-full h-[60vh] flex justify-center items-center bg-black">
                    hello
                    <img src={img.src} alt="" className="w-full" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex w-full justify-center p-1">
              {product.images.map((img, i) => (
                <p
                  key={i}
                  className={`size-[10px] border-[1px] border-slate-700 rounded-full m-1 ${
                    current == i + 1 ? "bg-gray-500" : ""
                  }`}
                ></p>
              ))}
            </div>
          </Carousel>

          <div className="relative lg:ml-4 lg:shadow-md lg:p-4 lg:w-[45vw]">
            <p className="px-2 text-lg bg-white">{product.name}</p>

            <p className="p-2 pt-4 text-3xl font-mono font-bold bg-white w-full">
              <del className="mr-4 text-gray-500 opacity-80 font-thin font-serif">
                {product.deletePrice}
              </del>
              ₹{product.price}
              <span className="text-green-500 text-2xl mb-2 font-medium">
                {" "}
                -₹{product.discount}
              </span>
            </p>

            <div className="p-2 bg-white mt-1 pb-6">
              <h2 className=" text-lg font-bold mb-2">
                Offers & Coupons{" "}
                <Link
                  href={"/user/wallet"}
                  className="float-right mr-2 underline text-blue-600 font-medium font-mono px-3"
                >
                  info
                </Link>
              </h2>

              <RadioGroup
                defaultValue="none"
                className="ml-3"
                setcoupons={setcoupon}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="balance2" />
                  <Label htmlFor="balance2" className="opacity-70">
                    Use 2% Wallet(₹230)
                  </Label>
                </div>
                <div className="flex items-center space-x-2 text-2xl">
                  <RadioGroupItem value="balance50" />
                  <Label htmlFor="balance50" className="opacity-70">
                    Use 50% Wallet(₹359)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="earning" />
                  <Label htmlFor="earning" className="opacity-70">
                    Use Earnings(₹450)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="none" />
                  <Label htmlFor="none" className="opacity-70">
                    None
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <span className="ml-5 font-bold">Quantity</span>
            <div className=" select-none flex items-center justify-start p-2">
              <FiMinus
                onClick={() =>
                  setQuantity((prevQuantity) => Math.max(1, prevQuantity - 1))
                }
                className="text-2xl hover:text-blue-500 cursor-pointer mr-5"
              />
              {quantity}
              <IoMdAdd
                onClick={() => setQuantity(quantity + 1)}
                className="text-2xl hover:text-blue-500 cursor-pointer ml-5"
              />
            </div>

            <div className="p-2 fixed md:relative lg:mt-32 bottom-0 right-0 w-full flex justify-between border-t-[1px] border-gray-300 bg-white">
              <Button
                onClick={addtocart}
                className="w-[48%] bg-transparent text-black text-lg h-12 hover:bg-green-300"
              >
                Add to cart
              </Button>
              <Button
                onClick={buyNow}
                className="w-[48%] bg-blue-800 text-lg h-12"
              >
                Buy
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white py-2 mt-[4px] ">
        <div className="w-full flex justify-center items-center bg-white">
          <div className="border-2 w-[95%] rounded">
            <CategoryTitle title="SIMILAR PRODUCTS" />
            <ProductContainer>
              <ProductCard imgSrc="./discount.jpg" />
              <ProductCard imgSrc="./grocery.jpg" />
              <ProductCard imgSrc="./grocery1.jpg" />
              <ProductCard imgSrc="./vegetables.jpg" />
              <ProductCard imgSrc="./discount.jpg" />
              <ProductCard imgSrc="./grocery.jpg" />
              <ProductCard imgSrc="./grocery1.jpg" />
              <ProductCard imgSrc="./vegetables.jpg" />
            </ProductContainer>
          </div>
        </div>
      </div>

      <div className="md:hidden flex flex-wrap gap-2 mt-6 py-3 bg-green-200 ">
        <h1 className="text-xl font-semibold mx-6">Sponsered</h1>
        <div className="flex flex-wrap justify-center gap-2">
          <CardComp />
          <CardComp />
          <CardComp />
          <CardComp />
        </div>
      </div>
      <div className="bg-white py-2 mt-[4px] pb-24">
        <div className="w-full flex justify-center items-center bg-white">
          <div className="border-2 w-[95%] rounded">
            <CategoryTitle title="SIMILAR PRODUCTS" />
            <ProductContainer>
              <ProductCard imgSrc="./discount.jpg" />
              <ProductCard imgSrc="./grocery.jpg" />
              <ProductCard imgSrc="./grocery1.jpg" />
              <ProductCard imgSrc="./vegetables.jpg" />
              <ProductCard imgSrc="./discount.jpg" />
              <ProductCard imgSrc="./grocery.jpg" />
              <ProductCard imgSrc="./grocery1.jpg" />
              <ProductCard imgSrc="./vegetables.jpg" />
            </ProductContainer>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
