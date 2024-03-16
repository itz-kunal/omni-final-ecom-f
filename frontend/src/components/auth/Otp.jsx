"use client";
import { React, useState } from 'react';
import Link from "next/link";
import { useToast } from '../ui/use-toast';
import axios from 'axios';
import { useRouter } from 'next/router';

// import { VERIFY_OTP } from '@/utils/apiroutes';
const Otp = ({ phone }) => {
    const {
        toast
    } = useToast()

    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [error, setError] = useState('');

    const handleChange = (index, value) => {
        if (value.match(/^[0-9]$/) && value.length <= 1) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            setError('');
            if (index < 5 && value !== '') {
                document.getElementById(`otp_${index + 1}`).focus();
            }
        }
    };

    const handleKeyDown = (event, index) => {
        if (event.key === 'Backspace' && index > 0 && otp[index] === '') {
            document.getElementById(`otp_${index - 1}`).focus();
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const otpValue = otp.join('');
        if (otpValue.length === 6) {
            console.log('OTP :', otpValue);
            // setOtp(['', '', '', '', '', '']);

            axios.post('VERIFY_OTP', {
                otpValue,
                phone,
            }, {
                withCredentials: true
            })
                .then(res => {
                    window.location.href = '/user/chat';
                    toast({
                        description: "OTP Verified successfully !",
                    })
                }).catch(err => {
                    console.log(err);
                    toast({
                        title: "Uh oh! Something went wrong.",
                        description: err.response.data,
                        variant: "destructive"
                    })
                })

        } else {
            setError('Please enter a valid OTP.');
        }
    };

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-lavender">
            <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-bold text-center text-gray-700">TREKOMI</h1>

                <form onSubmit={handleSubmit}>
                    <div className="flex items-center justify-center mt-4">
                        {otp.map((digit, index) => (
                            <div key={index} className="flex items-center justify-center">
                                <input
                                    id={`otp_${index}`}
                                    className="w-12 h-12 text-2xl text-center border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    placeholder={index}
                                    type="text"
                                    maxLength="1"
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                />
                                {index < 5 && <span className="mx-1 text-gray-500">-</span>} {/* Divider */}
                            </div>

                        ))}
                    </div>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                    <button
                        className="w-full px-5 mt-5 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"

                    >Verify</button>
                </form>
                <div className="relative flex items-center justify-center w-full mt-6 border border-t">
                    <div className="absolute px-5 bg-white">Or</div>
                </div>


                <p className="mt-4 text-sm text-center text-gray-700">
                    Back to {" "}
                    <Link
                        href="/auth/signup"
                        className="font-medium text-blue-600 hover:underline"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};
export async function getServerSideProps(context) {
    const { query } = context;
    const phone = query.phone || null;

    return {
        props: {
            phone
        }
    };
}
export default Otp;
