"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import {
    Card,
    CardDescription,
    CardTitle,
} from "@/components/ui/card"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import axios from "axios"
import { ADD_NOTIFICATION, DELETE_NOTIFICATION, EDIT_NOTIFICATION,  } from "@/utils/apiroutes"


function NotificationCard({title, description, id}) {
    const {toast} = useToast()
    const[name, setName] = useState('');
    const[message, setMessage] = useState('');

    async function editNotification(){
        try{
            const res = axios.post(EDIT_NOTIFICATION, {name, message}, {withCredentials:true})
            return toast({
                title:res.data
            })
        }catch(err){
            console.error('error in adding notification at frontend', err)
            return toast({
                title:'an error message from server',
                description:err
            })
        }
    }
    async function deleteNotification(notificationId){
        try{
            const res = await axios.post(DELETE_NOTIFICATION, {notificationId}, {withCredentials:true})
            return toast({
                title: res.data
            })
        }catch(err){
            console.error('error in deleting notification', err)
            return toast({
                title:'something went wrong try again',
                description:err
            })
        }
    }
    return (
        <Card className='py-4 px-8 mb-4'>
            <CardTitle className='mb-1'>{title || 'Notification'}</CardTitle>
            <CardDescription>{description || 'Card Description'}</CardDescription>
            <div className="mt-2">
                {/* -------------- edit dialogue ------------------ */}
                <Dialog>
                    <DialogTrigger className='bg-black py-[4px] px-4 rounded-sm text-white mr-1'>Edit</DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit notification :</DialogTitle>
                            <DialogDescription>
                                <form>
                                    <div>
                                        <label htmlFor="firstName">Name:</label>
                                        <Input
                                            type="text"
                                            name="name"
                                            placeholder="Enter notification's name"
                                            value={name}
                                            onChange={e=>setName(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="lastName">Message</label>
                                        <Textarea
                                            type="text"
                                            name="message"
                                            placeholder="Enter notification message"
                                            value={message}
                                            onChange={e=>setMessage(e.target.value)}
                                        />
                                    </div>
                                    <Button className='mt-2' type="submit" onClick={editNotification}>Submit</Button>
                                </form>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>

                {/* --------------------- delete dialogue ---------------------- */}
                <AlertDialog>
                    <AlertDialogTrigger className=' bg-red-600 py-[4px] px-4 rounded-sm text-white mx-1'>Delete</AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete this notification
                                and remove data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={()=>deleteNotification(id)}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </Card>

    )
}


function Notifications() {
    const {toast} = useToast()
    const[name, setName] = useState('');
    const[message, setMessage] = useState('');

    async function addNotification(){
        try{
            const res = axios.post(ADD_NOTIFICATION, {name, message}, {withCredentials:true})
            return toast({
                title:res.data
            })
        }catch(err){
            console.error('error in adding notification at frontend', err)
            return toast({
                title:'an error message from server',
                description:err
            })
        }
    }
    return (
        <>
            <div className='flex justify-between items-center'>
                <div className='text-[1.6em] font-medium'>Recent Notifications</div>

                {/* -------------------notification adding dialogue---------------- */}
                <Dialog>
                    <DialogTrigger className="text-lg border-2 px-3 rounded-md">Add</DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create new notification :</DialogTitle>
                            <DialogDescription>
                                <form>
                                    <div>
                                        <label htmlFor="firstName">Name:</label>
                                        <Input className='w-[100%]'
                                            type="text"
                                            name="name"
                                            placeholder="Enter notification's name"
                                            value={name}
                                            onChange={e=>setName(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="lastName">Message</label>
                                        <Textarea
                                            type="text"
                                            name="message"
                                            placeholder="Enter notification message"
                                            value={message}
                                            onChange={e=>setMessage(e.target.value)}
                                        />
                                    </div>
                                    <Button className='mt-2' type="submit" onClick={addNotification}>Submit</Button>
                                </form>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="mt-3">
               <NotificationCard/>
               <NotificationCard/>
               <NotificationCard/>
               <NotificationCard/>
               <NotificationCard/>
               <NotificationCard/>
               <NotificationCard/>
               <NotificationCard/>
            </div>
        </>
    )
}

export default Notifications


