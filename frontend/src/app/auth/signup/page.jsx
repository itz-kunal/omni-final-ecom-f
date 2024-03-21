'use client'
import SignUp from '@/components/auth/SignUp'
import React from 'react'
import {useSearchParams } from 'next/navigation'

const Page = () => {
    // const router = useRouter();
    const params = useSearchParams();
    const ref = params.get('ref');
    // console.log(ref,  params)
    return (
        <div>
            <SignUp refCode={ref} />
        </div>
    )
}

export default Page