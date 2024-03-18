"use client"
import React from 'react'
import { Inter } from "next/font/google"; 

// shadCN components
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardTitle } from "@/components/ui/card"
import {useRouter} from "next/navigation";


// const inter = Inter({ subsets: ["latin"] });

const overviewCart = ({ perfomance = '+0 %', title = 'not-set', amount = '000' }) => {
  return (
    <Card className="w-[350px] h-auto py-4 px-6 items-center justify-center">
      <CardTitle className='mb-1 text-base text-slate-600'>{title} <i className="text-right"></i></CardTitle>
      <b className="text-2xl">₹{amount}</b>
      <p className="text-sm text-slate-500">{perfomance} from last month</p>
    </Card>
  );
}


export default function RootLayout({ children }) {
  const router = useRouter();

  return (
    <>
        {/* -------------------- dashboard content --------------------------- */}
        <main className="px-4">
          {/* ------------------ headings section ------------------------- */}
          <div className="flex">
            {/* --------- right heading ---------- */}
            <h2 className="text-3xl font-bold my-2">Dashboard</h2>
          </div>

          {/* ---------------- dashboard Nav section ------------------ */}
          <div className="flex-column">
            <Tabs defaultValue="overview" className="w-[400px] my-3">
              <TabsList>
                <TabsTrigger sele value="overview"  onClick={()=>router.push("/admin/dashboard")}>Overview</TabsTrigger>
                <TabsTrigger value="users" onClick={()=>router.push("/admin/dashboard/analytics")}>Analytics</TabsTrigger>
                <TabsTrigger value="sales" onClick={()=>router.push("/admin/dashboard/users")}>Sales</TabsTrigger>
              </TabsList>
            </Tabs>

          </div>

          {/* ------------------ card Overviews ------------------- */}
          <div className="flex justify-between">
            {overviewCart({})}
            {overviewCart({ perfomance: '+100 %' })}
            {overviewCart({})}
            {overviewCart({})}
          </div>
          {children}
        </main>
    </>
  );
}