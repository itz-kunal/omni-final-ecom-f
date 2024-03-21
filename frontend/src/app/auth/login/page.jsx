// 'use client'
import dynamic from 'next/dynamic';
const Login = dynamic(()=>import('@/components/auth/Login'))
import React from 'react'

const page = () => {
    return (
        <div>
            <Login />
        </div>
    )
}

export default page