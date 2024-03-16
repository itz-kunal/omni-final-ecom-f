"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import axios from 'axios'
import { DELETE_USER } from '@/utils/apiroutes'
import { useToast } from "@/components/ui/use-toast"



const DeleteDialog = ({userId, toast}) => {
    const deleteUser = async (userId) => {
        try {
            const res =await axios.post(DELETE_USER, {
                body: { deleteingUser: userId }
            })
           
            toast({
                title: "Success:",
                description: res.data,
            })
        } catch(err) {
            toast({
                title: "Error:",
                description:err.response.data,
                variant: "destructive"
            })
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger className=' bg-red-600 py-[7px] px-5 rounded-sm text-white'>Delete</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the account
                        and remove the data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={()=>deleteUser(userId)}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

const data = [{
    telegramId: 'demao@123',
    name: 'Demo 1',
    age: 19,
    gender: 'male',
    coins: 350,
    registeredAt: ' 5 jan 2023'
},
{
    telegramId: 'demao@321',
    name: 'Demo 2',
    age: 20,
    gender: 'female',
    coins: 450,
    registeredAt: ' 5 jan 2023'
}]

function DataTable({ users = data }) {
    const { toast } = useToast()
    return (
        <div className='border-2 rounded-sm'> 
            <Table>
                {/* ====================== table head data ========================= */}
                <TableHeader>
                    <TableRow className="bg-slate-50">
                        <TableHead className="w-[210px]">ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Gender</TableHead>
                        <TableHead>Coins</TableHead>
                        <TableHead>VIP</TableHead>
                        <TableHead>Registered At</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                {/* ================= Table body data ============== */}
                <TableBody>

                    {users.map((user, i) => {
                        return (
                            <TableRow key={user.telegramId}>
                                <TableCell className="font-medium">{user.telegramId}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.gender}</TableCell>
                                <TableCell>{user.coins}</TableCell>
                                <TableCell >{user.vip ? 'activated' : 'not activated'}</TableCell>
                                <TableCell>{user.registeredAt}</TableCell>
                                <TableCell className="text-right"><DeleteDialog userId={user.telegramId} toast={toast} /></TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    )
}

export default DataTable;

