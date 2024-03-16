'use client'
import React, { useState } from "react";
import UserContext, { ProductContext } from "./UseContext";

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState('');
    const [withdrawls, setWithdrawls] = useState([]);
    const [sentCoins, setSentCoins] = useState([]);
    const [receivedCoins, setReceivedCoins] = useState([]);


    return (
        <UserContext.Provider value={{ user, setUser,
         withdrawls, sentCoins, receivedCoins, 
         setReceivedCoins, setSentCoins, setWithdrawls  }}>
            {children}
        </UserContext.Provider>
    )
}

export const ProductContextProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [orders, setOrders] = useState([]);
    return (
        <ProductContext.Provider value={{ cart, setCart, orders, setOrders }}>
            {children}
        </ProductContext.Provider>
    )
}


export default UserContextProvider;