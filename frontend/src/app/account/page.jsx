'use client'
import { Button } from '@/components/ui/button'
import React, { use, useContext, useEffect, useState } from 'react'
import {
    Card,
} from "@/components/ui/card"
import { useRouter } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import axios from 'axios'
import { GET_USER, UPDATE_PASSWORD, UPDATE_PROFILE } from '@/utils/apiroutes'
import { toast, useToast } from '@/components/ui/use-toast'
import UserContext from '@/app/context/UseContext'
import { checkLogin } from '../../utils/generalFunctions'
import BottomHeader from '@/components/shop/header/BottomHeader'


function Page() {
    const router = useRouter();
    const [copied, setCopied] = useState('');

    const [loading, setLoading] = useState(true)

    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        checkLogin(router)
    }, [router])

    useEffect(() => {
        function fetchData() {
            axios.get(GET_USER, { withCredentials: true }).then(res => {
                setUser(res.data);
                console.log(res.data)
                setLoading(false)
            }).catch(err => {
                console.log(err)
                if (err.response.data?.status == 'missing token') {
                    localStorage.removeItem('user')
                }

                toast({
                    title: err.response?.data.msg || err.message
                })
                setLoading(false)
            })
        }

        fetchData();
    }, [])

    const handleCopy = (type) => {
        if (type == 'code') {
            setCopied('refCode')
        }
        else if (type == 'link') {
            setCopied('refLink')
        }
    }

    if (loading) {
        return (
            <>
                Loading...
            </>
        )
    }

    return (
        <div className=' bg-slate-100 pb-4'>
            <div className='flex justify-between bg-[#fff] p-2 border-b-[1px]'>
                <div>
                    <h2 className=' font-medium'>Hey! {user.name}</h2>
                    <p>Explore our world !</p>
                </div>
                {
                    user.role == 'seller' ?
                        <div className='border-[2px] h-fit rounded-xl border-yellow-200 p-[1px] px-2' onClick={() => router.push('/auth/my-shop')}>
                            Your Shop
                        </div> :
                        <div className='border-[2px] h-fit rounded-xl border-yellow-200 p-[1px] px-2' onClick={() => router.push('/auth/register-shop')}>
                            Become Seller
                        </div>
                }
            </div>

            {/* nav cards */}
            <div className='flex flex-wrap justify-between bg-[#fff] p-2 shadow-md shadow-slate-100'>
                <div className='border-[2px] border-slate-300 py-1 pl-2 max-w-[43vw] w-[210px] rounded-sm m-1 cursor-pointer' onClick={() => router.push('/orders')}>orders</div>
                <div className='border-[2px] border-slate-300 py-1 pl-2 max-w-[43vw] w-[210px] rounded-sm m-1 cursor-pointer' onClick={() => router.push('/coupons')}>coupons</div>
                <div className='border-[2px] border-slate-300 py-1 pl-2 max-w-[43vw] w-[210px] rounded-sm m-1 cursor-pointer' onClick={() => router.push('/wallet')}>wallet</div>
                <div className='border-[2px] border-slate-300 py-1 pl-2 max-w-[43vw] w-[210px] rounded-sm m-1 cursor-pointer' onClick={() => router.push('/cart')}>carts</div>
            </div>

            {/* activity section */}
            <div className='bg-white mt-2 p-2'>
                <h2>Your activity</h2>
                <div className=' flex flex-wrap justify-between mt-2'>
                    <Card className='p-2 pl-3 w-[41vw] m-2'>
                        <h2 className=' font-semibold'>Earnings</h2>
                        <p>₹{user.earnings || 0}</p>
                    </Card>
                    <Card className='p-2 pl-3 w-[41vw] m-2'>
                        <h2 className=' font-semibold'>Referrals</h2>
                        <p>{20} persons</p>
                    </Card>

                </div>

            </div>

            {/* referral link section */}
            <div className='bg-blue-50 my-2 p-2'>
                <div className='mb-4'>
                    <label htmlFor="refCode" className='text-gray-600'>Referral Code:</label>
                    <div>
                        <input className=' bg-transparent border-[2px] border-gray-400 rounded-sm p-[2px] pl-4 text-gray-700' type="text" name='refCode' value={user.referralCode || 'yourefcode'} />
                        <span className={`${copied == 'refCode' ? 'bg-gray-400' : 'bg-blue-500'} p-[3.5px] rounded-sm text-center px-3 text-[#fff] ml-2 cursor-pointer`} onClick={() => handleCopy('code')}>{copied == 'refCode' ? 'copied !' : 'copy'}</span>
                    </div>
                </div>

                <div>
                    <label htmlFor="refLink" className='text-gray-600'>Referral Link:</label>
                    <div>
                        <input className=' bg-transparent border-[2px] border-gray-400 rounded-sm p-[2px] pl-4 text-gray-700' type="text" name='refCode' value={`https://omitrek.com?refCode=${user.referralCode}`} />
                        <span className={`${copied == 'refLink' ? 'bg-gray-400' : 'bg-blue-500'} p-[3.5px] rounded-sm text-center px-3 text-[#fff] ml-2 cursor-pointer`} onClick={() => handleCopy('link')}>{copied == 'refLink' ? 'copied !' : 'copy'}</span>
                    </div>
                    <h2>Share:</h2>
                    <div className='flex flex-wrap'>
                        <span className='rounded-md bg-green-500 p-[2px] text-white px-3 m-1'>Whatsapp</span>
                        <span className='rounded-md bg-pink-500 p-[2px] text-white px-3 m-1'>Instagram</span>
                        <span className='rounded-md bg-gray-500 p-[2px] text-white px-3 m-1'>Message</span>
                        <span className='rounded-md bg-sky-500 p-[2px] text-white px-3 m-1'>Facebook</span>
                    </div>
                </div>
            </div>

            {/* edit profile section */}
            <Tabs defaultValue="profile" className="mt-3">
                <TabsList className='w-full h-10 bg-gray-200'>
                    <TabsTrigger value="profile" className='w-[50%] h-full'>Edit Profile</TabsTrigger>
                    <TabsTrigger value="password" className='w-[50%] h-full'>Change Password</TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className='px-2'>
                    <EditProfile name={user.name} phone={user.phone} email={user.email} address={user.address} />
                </TabsContent>

                <TabsContent value="password" className='px-2'>
                    <EditPassword />
                </TabsContent>
            </Tabs>

            <div className='border-[1px] w-[90vw] mx-auto flex justify-center items-center p-1 rounded-md m-4 text-red-500 font-semibold bg-[#fff] '>Log Out</div>
            <BottomHeader />
        </div>
    )
}

function EditProfile(props) {
    const { toast } = useToast()
    const [name, setName] = useState(props.name || '');
    const [phone, setPhone] = useState(props.phone || '');
    const [email, setEmail] = useState(props.email || '');
    const [address, setAddress] = useState(props.address || '');

    console.warn(props)

    const updateProfile = async () => {
        try {
            axios.post(UPDATE_PROFILE, {
                name, phone, email, genAddress: address
            }, { withCredentials: true }).then(res => {
                toast({
                    title: res.data,
                })
            }).catch(err => {
                console.log(err)
                toast({
                    title: err.response.data,
                })
            });


        } catch (err) {
            console.error('error in updating profile', err);
            return toast({
                title: 'something went wrong try again',
            })
        }
    }

    return (
        <div className='bg-[#fff] flex-col p-2 mt-2 rounded-md'>
            <h2 className='mb-4'>Edit Profile</h2>
            <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-semibold text-gray-800">Name</label>
                <input
                    type="text"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder='Enter your name'
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-800">Email</label>
                <input
                    type="email"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder='Enter your email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-800">Phone:</label>
                <input
                    type="number"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder='Enter your phone no.'
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="address" className="block text-sm font-semibold text-gray-800">Address</label>
                <textarea
                    type="text"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder='Enter your address'
                // value={address}
                // onChange={e => setAddress(e.target.value)}
                />
            </div>

            <div className='flex w-full justify-between'>
                <Button className='bg-red-500 px-7'>Reset</Button>
                <Button className='bg-blue-500 px-7' onClick={updateProfile}>Save</Button>
            </div>

        </div>
    )
}
function EditPassword() {
    const { toast } = useToast()
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [conformPassword, setConformPassword] = useState('')
    const [isDisable, setIsDisable] = useState(true)

    useEffect(() => {
        const doesPassMatch = password == conformPassword;
        const doesPassNull = conformPassword == ''
        const doesOldPassNull = oldPassword == ''

        if (!doesPassNull && doesPassMatch && !doesOldPassNull) {
            setIsDisable(false)
        } else {
            setIsDisable(true)
        }
    }, [password, conformPassword, oldPassword])

    const updatePassword = () => {
        try {
            axios.post(UPDATE_PASSWORD, {
                oldPassword, newPassword: password
            }, { withCredentials: true }).then(res => {
                toast({
                    title: res.data
                })
            }).catch(err => {
                console.log(err)
                toast({
                    title: err.response.data,
                })
            });

            return;
        } catch (err) {
            console.error('error in updating profile', err);
            return toast({
                title: 'something went wrong try again'
            })
        }
    }

    return (
        <div className='bg-[#fff] flex-col p-2 mt-2 rounded-md'>
            <h2 className='mb-4'>Change Password:</h2>
            <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-semibold text-gray-800">Current Password:</label>
                <input
                    type="text"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder='Enter your current password'
                    value={oldPassword}
                    onChange={e => setOldPassword(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-800">Enter New Password:</label>
                <input
                    type="text"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder='Enter your new password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-800">Conform Password:</label>
                <input
                    type="password"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder='Re-enter your password'
                    value={conformPassword}
                    onChange={e => setConformPassword(e.target.value)}
                />
                {conformPassword != '' && <p className={`float-start text-sm font-medium ${password == conformPassword ? 'text-green-600' : 'text-red-600'}`}>{password == conformPassword ? "password matched" : "Pass word doesn't matches"}</p>}

            </div>

            <div className='flex w-full justify-between'>
                <Button className='bg-red-500 px-7'>Reset</Button>
                <Button className='bg-blue-500 px-7' disabled={isDisable} onClick={updatePassword}>Save</Button>
            </div>

        </div>
    )
}
export default Page