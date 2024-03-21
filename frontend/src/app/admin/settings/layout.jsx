'use client'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {useRouter} from "next/navigation";


export default function RootLayout({ children }) {
  const router = useRouter();

    return(
    <main className="px-4">
        {/* ------------------ headings section ------------------------- */}
        <div className="flex">
            {/* --------- right heading ---------- */}
            <h2 className="text-3xl font-bold my-2">Settings</h2>
        </div>

        {/* ---------------- secondary Nav section ------------------ */}
        <div className="flex-column">
            <Tabs defaultValue="banners" className="w-[400px] my-3">
                <TabsList>
                    <TabsTrigger value="banners" onClick={()=>router.push('/admin/settings/banners')} >Banners</TabsTrigger>
                    <TabsTrigger value="category" onClick={()=>router.push('/admin/settings/category')}>Category</TabsTrigger>
                    <TabsTrigger value="notifications" onClick={()=>router.push('/admin/settings/notifications')}>Notifications</TabsTrigger>
                </TabsList>
            </Tabs>

        </div>

        {/* ------------------ card Overviews ------------------- */}
        <div className="flex justify-between">
        </div>
        {children}
    </main>
    )
}