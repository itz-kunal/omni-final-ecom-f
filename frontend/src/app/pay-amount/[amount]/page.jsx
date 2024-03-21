"use client";
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { useToast } from '@/components/ui/use-toast';
import { BUY_COUPON, TOP_UP } from '@/utils/apiroutes';
import axios from 'axios';

const Payment = ({ params }) => {
    const paramsData = params.amount.split('_');
    const { toast } = useToast();
    const [amount, setAmount] = useState(paramsData[1] || 0);
    const [upi, setUpi] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if(paramsData[0] == 'topup'){
            axios.post(TOP_UP,{upi, amount}, {withCredentials:true}).then(res=>{
                toast({
                    title:res.data
                })
            }).catch(err=>{
                toast({
                    title:err.response.data
                })
            })
        }
        
    };

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-lavender">
            <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-bold text-center text-gray-700">OMITREK</h1>
                <form className="mt-6" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="phone"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            UPI ID
                        </label>
                        <input
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"

                            placeholder='Please enter your UPI'
                            value={upi}
                            onChange={(e) => setUpi(e.target.value)}
                        />
                        {/* {errors.email && <p className='text-red-700 text-sm'>{errors.email}</p>} */}
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Amount
                        </label>
                        <input
                            type="number"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            placeholder='Please enter amount'
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>
                    <div className="mt-2">
                        <button
                            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                            style={{ opacity: !isSubmitting ? 1 : 0.5 }}
                            disabled={isSubmitting}
                        >
                            Pay
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Payment ;