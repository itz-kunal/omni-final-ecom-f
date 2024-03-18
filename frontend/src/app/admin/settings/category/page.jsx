'use client'
import { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Card,
    CardDescription,
    CardTitle,
} from "@/components/ui/card"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { ADD_CATEGORY, DELETE_CATEGORY, EDIT_CATEGORY } from "@/utils/apiroutes";
import { toast } from "@/components/ui/use-toast";

function Page() {
    const [name, setName] = useState('');
    const [type, setType] = useState('general')
    const [description, setDescription] = useState('');
    const [platformCharge, setCharge] = useState('');

    const handleSubmit = () => {
        axios.post(ADD_CATEGORY, { name, description, platformCharge, type }).then(res => {
            toast({
                title: res.data
            })
        }).catch(err => {
            toast({
                title: err.response.data
            })
        })
    }
    return (
        <>
            <div className='flex justify-between items-center'>
                <div className='text-[1.6em] font-medium'>Notifications</div>

                {/* -------------------notification adding dialogue---------------- */}
                <Dialog>
                    <DialogTrigger className="text-lg border-2 px-3 rounded-md">Add</DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create new category :</DialogTitle>
                            <DialogDescription>
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <Select>
                                            <SelectTrigger className="opacity-60">
                                                <SelectValue placeholder="Select Category" value={type} onChange={e => setType(e.target.value)} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="general">General</SelectItem>
                                                <SelectItem value="fashion">Fashion</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <label htmlFor="firstName">Name:</label>
                                        <Input className='w-[100%]'
                                            type="text"
                                            name="name"
                                            placeholder="Enter notification's name"
                                            value={name}
                                            onChange={e => setName(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="lastName">Message</label>
                                        <Textarea
                                            type="text"
                                            name="message"
                                            placeholder="Enter notification message"
                                            value={description}
                                            onChange={e => setDescription(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="lastName">Platform Charge:</label>
                                        <Input className='w-[100%]'
                                            type="number"
                                            name="name"
                                            placeholder="Enter notification's name"
                                            value={platformCharge}
                                            onChange={e => setCharge(e.target.value)}
                                        />
                                    </div>
                                    <Button className='mt-2' type="submit">Submit</Button>
                                </form>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="mt-3">
                <CategoryCard/>
            </div>

        </>
    )
}

function CategoryCard({title, description, id}) {
    const[name, setName] = useState('');
    const[message, setMessage] = useState('');

    async function editCategory(e){
        e.preventDefault()
        try{
            const res = axios.post(EDIT_CATEGORY, {name, message}, {withCredentials:true})
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
    async function deleteCategory(notificationId){
        try{
            const res = await axios.post(DELETE_CATEGORY, {notificationId}, {withCredentials:true})
            return toast({
                title: res.data
            })
        }catch(err){
            console.error('error in deleting notification', err)
            return toast({
                title:'something went wrong try again',
                description:err.response.datap
            })
        }
    }
    return (
        <Card className='py-4 px-8 mb-4'>
            <CardTitle className='mb-1'>{title || 'Category'}</CardTitle>
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
                                    <Button className='mt-2' type="submit" onClick={editCategory}>Submit</Button>
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
                            <AlertDialogAction onClick={()=>deleteCategory(id)}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </Card>

    )
}

export default Page