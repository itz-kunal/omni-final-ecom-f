'use client'
import { useContext, useEffect } from "react";
import { ShopContext } from "../context/UseContext";
import axios from "axios";
import { SELLER_SHOP_DATA, SHOP_ORDERS, SHOP_PRODUCTS } from "@/utils/apiroutes";

export default function RootLayout({ children }) {
    const {orders, setOrders, shop, setShop, products, setProducts} = useContext(ShopContext)

    useEffect(()=>{
        if(!orders){
            axios.post(SHOP_ORDERS, {orderType:'pending'}, {withCredentials:true}).then(res=>{
                setOrders(res.data.orders)
            }).catch(err=>{
                console.error(err)
            })
        }

        if(!shop){
            axios.get(SELLER_SHOP_DATA, {withCredentials:true}).then(res=>{
                setShop(res.data.shop)
            }).catch(err=>{
                console.error(err)
            })
        }

        if(!products){
            axios.get(SHOP_PRODUCTS, {withCredentials:true}).then(res=>{
                setProducts(res.data.products)
            }).catch(err=>{
                console.error(err)
            })
        }
    }, [])


    return (
        <>
        { children }
        </>
    );
}