'use client'
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function RootLayout({ children }) {
    const router = useRouter();
    const [activeLink, setActiveLink] = useState(0)

    useEffect(() => {
        const urlParams = window.location.href
        const url = urlParams.split('/')
        if (url.includes('dashboard')) { setActiveLink(0) }
        else if (url.includes('transations')) { setActiveLink(1) }
        else if (url.includes('withdrawls')) { setActiveLink(2) }
        else if (url.includes('settings')) { setActiveLink(3) }

        // console.log(router.pathname)
    },[]);

    return (
        <>
            {/* -------------------- nav section goes here ------------------------- */}
            <nav className="flex justify-between w-full border-b-2 p-2">
                {/* ---------------------------- right nav section --------------------- */}
                <div className="flex p-1">
                    <Link href={'/admin/dashboard'} className={`${activeLink == 0 ? 'bg-gray-400' : 'bg-slate-200'} text list-none mx-[1px] px-3 py-1 flex items-center rounded-sm`} onClick={()=>setActiveLink(0)}>Overview</Link>
                    <Link href={'/admin/transactions'} className={`${activeLink == 1 ? 'bg-gray-400' : 'bg-slate-200'} text list-none mx-[1px] px-3 py-1 flex items-center rounded-sm bg-slate-200`} onClick={()=>setActiveLink(1)}>Transactions</Link>
                    <Link href={'/admin/withdrawls'} className={`${activeLink == 2 ? 'bg-gray-400' : 'bg-slate-200'} text list-none mx-[1px] px-3 py-1 flex items-center rounded-sm bg-slate-200`} onClick={()=>setActiveLink(2)}>Withdrawls</Link>
                    <Link href={'/admin/settings'} className={`${activeLink == 3 ? 'bg-gray-400' : 'bg-slate-200'} text list-none mx-[1px] px-3 py-1 flex items-center rounded-sm bg-slate-200`} onClick={()=>setActiveLink(3)}>Settings</Link>
                </div>
                {/* --------------------- right nav section ------------------------ */}
                <div className="flex justify-center items-center">
                    <Input className="w-420px" type="text" id="email" placeholder="Search user here ..." />
                    <Avatar className="ml-2">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>FP</AvatarFallback>
                    </Avatar>
                </div>
            </nav>

          {children}

        </>
    )
}