"use client";
import React, {
    useState,
    useEffect
} from 'react';
import Link from "next/link";
import axios from 'axios';
import {
    REGISTER_SHOP,
    SIGN_UP
} from '@/utils/apiroutes';
import {
    useToast
} from '../ui/use-toast';
import { ifLoggedIn } from '../../utils/generalFunctions';
import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/router';



const RegisterShop = () => {
    const {
        toast
    } = useToast()

    const router = useRouter()

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [GST, setGST] = useState('');
    const [uniqueName, setUniqueName] = useState('');
    const [address, setAddress] = useState('');
    

    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(true);

    // useEffect(() => {
    //     ifLoggedIn(router)
    // }, [router])
    const validateForm = () => {
        let errors = {};

        if (!name) {
            errors.name = 'Name is required.';
        }

        if (!phone) {
            errors.phone = 'Phone number is required.';
        } else if (!(phone.match('[0-9]{10}'))) {
            errors.phone = 'Phone number is invalid.';
        }

        if (GST.length < 18) {
            errors.gst = 'Password is required.';
        } 
        setErrors(errors);
        setIsFormValid(Object.keys(errors).length === 0);
        setIsSubmitting(!(Object.keys(errors).length === 0));
    };

    useEffect(() => {
        validateForm();
    }, [name, email, phone, GST]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid) {
            axios.post(REGISTER_SHOP, {
                uniqueName,
                address,
                name,
                phone,
                email,
                GST
            }, {
                withCredentials: true
            })
                .then(res => {

                    if (res.data.status == true) {
                        console.log()
                        toast({
                            title: res.data.msg,
                        })
                        localStorage.setItem('user', res.data.user)
                        window.location.href = `/`;
                    }
                }).catch(err => {
                    console.log('error in RegisterShop', err);
                    toast({
                        title: err.response.data,
                    })
                })

        } else {
            console.log('Form has errors. Please correct them.');
        }
    };

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-lavender">
            <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-bold text-center text-gray-700">OMITRK</h1>
                <form className="mt-6" onSubmit={handleSubmit}>

                <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-800">Shop Id:</label>
                        <input
                            type="name"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            placeholder='Please enter your name'
                            value={uniqueName}
                            onChange={(e) => setUniqueName(e.target.value)}
                        />
                        {/* {errors.name && <p className='text-red-700 text-sm'>{errors.name}</p>} */}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-800">Name</label>
                        <input
                            type="name"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            placeholder='Please enter your name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {errors.name && <p className='text-red-700 text-sm'>{errors.name}</p>}
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            placeholder='Please enter your email (optional)'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && <p className='text-black-700 text-sm'>{errors.email}</p>}
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="phone"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Phone
                        </label>
                        <input
                            type="tel"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            placeholder='Please enter your phone number'
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        {errors.phone && <p className='text-red-700 text-sm'>{errors.phone}</p>}
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            GST No.
                        </label>
                        <input
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            placeholder='Please enter password'
                            value={GST}
                            onChange={(e) => setGST(e.target.value)}
                        />
                        {errors.gst && <p className='text-red-700 text-sm'>{errors.gst}</p>}

                    </div>

                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-800">Address:</label>
                        <input
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            placeholder='Please enter your name'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                      
                    </div>

                    <div className="mt-2">
                        <button
                            type='submit'
                            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                            style={{ opacity: !isSubmitting ? 1 : 0.5 }}
                            disabled={isSubmitting}
                        >

                            Register
                        </button>
                    </div>
                </form>


                <p className="mt-4 text-sm text-center text-gray-700">
                    Already have an account?{" "}
                    <Link
                        href="/auth/login"
                        className="font-medium text-blue-600 hover:underline"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default RegisterShop