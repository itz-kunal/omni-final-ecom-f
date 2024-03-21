'use client'
import React, { useState } from "react";
import UserContext, { ShopContext } from "./UseContext";

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState('');
    const [withdrawls, setWithdrawls] = useState('');
    const [sentCoins, setSentCoins] = useState('');
    const [receivedCoins, setReceivedCoins] = useState('');

    const [coupons, setCoupons] = useState('');
    const [orders, setOrders] = useState('');
    const [cart, setCart] = useState('');


    return (
        <UserContext.Provider value={{
            user, setUser,
            withdrawls, sentCoins, receivedCoins,
            setReceivedCoins, setSentCoins, setWithdrawls,
            coupons, setCoupons, orders,
            setOrders, cart, setCart
        }}>
            {children}
        </UserContext.Provider>
    )
}

export const ShopContextProvider = ({ children }) => {
    const [orders, setOrders] = useState('');
    const [shop, setShop] = useState('');
    return (
        <ShopContext.Provider value={{ orders, setOrders, shop, setShop }}>
            {children}
        </ShopContext.Provider>
    )
}


export default UserContextProvider;