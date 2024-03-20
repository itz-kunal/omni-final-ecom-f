'use client'
import { useContext, useEffect } from "react";
import UserContext from "../context/UseContext";
import axios from "axios";
import { GET_COUPONS, GET_TRANSACTIONS, GET_USER, GET_USER_ORDERS, WITHDRAWLS } from "../../utils/apiroutes";


export default function RootLayout({ children }) {
    const { user, setUser,
        withdrawls, sentCoins, receivedCoins,
        setReceivedCoins, setSentCoins, setWithdrawls,
        coupons, setCoupons, orders,
        setOrders, cart, setCart } = useContext(UserContext);

    useEffect(() => {
        if (!user) {
            axios.get(GET_USER, { withCredentials: true }).then(res => {
                setUser(res.data.user)
            }).catch(err => {
                console.error(err)
            })
        }

        if (!withdrawls) {
            axios.get(WITHDRAWLS, { withCredentials: true }).then(res => {
                setWithdrawls(res.data.withdrawls)
            }).catch(err => {
                console.error(err)
            })
        }

        if (!sentCoins || !receivedCoins) {
            axios.get(GET_TRANSACTIONS, { withCredentials: true }).then(res => {
                setReceivedCoins(res.data.receivedCoins)
                setSentCoins(res.data.sentCoins)
            }).catch(err => {
                console.error(err)
            })
        }

        if(!orders){
            axios.get(GET_USER_ORDERS, {withCredentials:true}).then(res=>{
                setOrders(res.data.orders)
            }).catch(err => {
                console.error(err)
            })
        }

        if(!coupons){
            axios.get(GET_COUPONS, {withCredentials:true}).then(res=>{
                setCoupons(res.data.coupons)
            }).catch(err => {
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