"use client";
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { useToast } from '../ui/use-toast';
import { LOGIN } from '@/utils/apiroutes';
import axios from 'axios';
import { ifLoggedIn } from '../../utils/generalFunctions';
import { useRouter } from 'next/navigation';

const Login = () => {
    const router = useRouter();
    const { toast } = useToast();
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // useEffect(()=>{
    //     ifLoggedIn(router)
    // },[router])

    useEffect(() => {

        const validateForm = () => {
            let errors = {};

            if (!phone) {
                errors.phone = 'Phone no. is required.';
            } else if (!(phone.match('[0-9]{10}'))) {
                errors.phone = 'Phone number is invalid.';
            }

            if (!password) {
                errors.password = 'Password is required.';
            } else if (password.length < 6) {
                errors.password = 'Password must be at least 6 characters.';
            }

            setErrors(errors);
            setIsFormValid(Object.keys(errors).length === 0);
            setIsSubmitting(!(Object.keys(errors).length === 0));
        };

        validateForm()
    }, [phone, password]);


    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true)
        if (isFormValid) {

            axios.post(LOGIN, {
                phone,
                password
            }, {
                withCredentials: true
            })
                .then(res => {
                    toast({
                        description: res.data.msg,
                    })

                    if (res.data.status == true) {
                        window.location.href = '/';
                        localStorage.setItem('user', JSON.stringify(res.data.user));
                    }

                }).catch(err => {
                    setIsSubmitting(false)
                    console.log('error in login', err);
                    return (
                        toast({
                            // title: "Uh oh! Something went wrong.",
                            description: err.response.data.error || res.data,
                            variant: "destructive"
                        })
                    )
                })
        } else {
            console.log('Form has errors. Please correct them.');
        }
    };

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-lavender">
            <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-bold text-center text-gray-700">OMITREK {phone}</h1>
                <form className="mt-6" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="phone"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Phone
                        </label>
                        <input
                            type="number"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"

                            placeholder='Please enter your email'
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        {errors.email && <p className='text-red-700 text-sm'>{errors.email}</p>}
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            placeholder='Please enter password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && <p className='text-red-700 text-sm'>{errors.password}</p>}
                    </div>
                    <Link
                        href="/auth/forget"
                        className="text-xs text-blue-600 hover:underline"
                    >
                        Forget Password?
                    </Link>
                    <div className="mt-2">
                        <button
                            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                            style={{ opacity: !isSubmitting ? 1 : 0.5 }}
                            disabled={isSubmitting}
                        >
                            Sign In
                        </button>
                    </div>
                </form>

                <div className="relative flex items-center justify-center w-full mt-6 border border-t">
                    <div className="absolute px-5 bg-white">Or</div>
                </div>
                {/* <div className="flex mt-4 gap-x-2">
                    <button
                        type="button"
                        className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-violet-600"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 48 48">
                            <path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                        </svg>
                        <p className='font-bold text-gray-800'>&emsp; Continue With Google</p>
                    </button>

                </div> */}

                <p className="mt-4 text-sm text-center text-gray-700">
                    Donot have an account?{" "}
                    <Link
                        href="/auth/signup"
                        className="font-medium text-blue-600 hover:underline"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Login