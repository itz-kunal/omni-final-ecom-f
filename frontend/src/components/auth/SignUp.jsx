"use client";
import React, {
    useState,
    useEffect
} from 'react';
import Link from "next/link";
import axios from 'axios';
import {
    SIGN_UP
} from '@/utils/apiroutes';
import {
    useToast
} from '../ui/use-toast';
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ifLoggedIn } from '../../utils/generalFunctions';
import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/router';



const SignUp = ({refCode}) => {
    const {
        toast
    } = useToast()

    const router = useRouter()

    const [referralCode, setReferralCode] = useState(refCode || '');
    const [position, setPosition] = useState('left');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(true);

   useEffect(()=>{
    ifLoggedIn(router)
   },[router])
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

        if (!password) {
            errors.password = 'Password is required.';
        } else if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters.';
        }

        setErrors(errors);
        setIsFormValid(Object.keys(errors).length === 0);
        setIsSubmitting(!(Object.keys(errors).length === 0));
    };

    useEffect(() => {
        validateForm();
    }, [name, email, phone, password]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid) {
            axios.post(SIGN_UP, {
                name,
                referredBy:referralCode,
                position:referralCode !== '' ? position : '',
                phone,
                email,
                password
            }, {
                withCredentials: true
            })
                .then(res => {

                    if(res.data.status == true){
                        toast({
                            description: res.data.msg,
                        })
                        localStorage.setItem('user', JSON.stringify(res.data.user))
                        window.location.href = `/`;
                    }
                }).catch(err => {
                    console.log('error in signup', err);
                    toast({
                        title: "Uh oh! Something went wrong.",
                        description: err.response.data,
                        variant: "destructive"
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
                        <label htmlFor="referralCode" className="block text-sm font-semibold text-gray-800">Referral code</label>
                        <input
                            type="name"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            placeholder='Enter referral code (optional)'
                            value={referralCode}
                            onChange={(e) => setReferralCode(e.target.value)}
                        />
                        {/* {errors.name && <p className='text-red-700 text-sm'>{errors.name}</p>} */}
                    </div>
                    {referralCode != '' && (
                        <div className="mb-4">
                            <Label>Position</Label>
                        <RadioGroup defaultValue="option-one" className='flex'>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="left" onChange={(e) => setPosition(e.target.value)} id="option-one" />
                                <Label htmlFor="option-one">Left</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem onClick={() => setPosition('right')} id="option-two" />
                                <Label htmlFor="option-two">Right</Label>
                            </div>
                        </RadioGroup>
                        </div>
                    )}
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

                    <div className="mt-2">
                        <button
                            type='submit'
                            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                            style={{ opacity:  !isSubmitting  ? 1 : 0.5 }}
                            disabled={isSubmitting}
                        >

                            Sign Up
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

export default SignUp