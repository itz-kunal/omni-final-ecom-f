'use client'
import { Button } from '@/components/ui/button'
import React, { use, useContext, useEffect, useState } from 'react'
import {
    Card,
} from "@/components/ui/card"
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { UPDATE_PASSWORD, UPDATE_PROFILE } from '@/utils/apiroutes'
import { toast } from '@/components/ui/use-toast'
import UserContext from '@/app/context/UseContext'


import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function ProfilePassEdit() {
    const {user} = useContext(UserContext);
    
    return (
        <>
            {/*  edit profile section */}
            < Tabs defaultValue="profile" className="mt-3" >
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
            </Tabs >

        </>

    )
}

function EditProfile(props) {
    const [name, setName] = useState(props.name || '');
    const [phone, setPhone] = useState(props.phone || '');
    const [email, setEmail] = useState(props.email || '');
    const [address, setAddress] = useState(props.address || '');


    const updateProfile = async () => {
        axios.post(UPDATE_PROFILE, {
            name, phone, email, genAddress: address

        }, { withCredentials: true }).then(res => {
            const { name, phone, email, address } = res.data.user;

            toast({
                title: res.data.msg,
            });
            setName(name);
            setPhone(phone);
            setEmail(email);
            setAddress(address);


        }).catch(err => {
            toast({
                title: err.response?.data.msg || err.message,
            })
        });

        return;
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
                    type="tel"
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
                    value={address}
                    onChange={e => setAddress(e.target.value)}
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
        axios.post(UPDATE_PASSWORD, {
            oldPassword, newPassword: password
        }, { withCredentials: true }).then(res => {
            toast({
                title: res.data.msg
            })
        }).catch(err => {
            toast({
                title: err.response?.data.msg || err.message,
            })
        });

        return;
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

export default ProfilePassEdit