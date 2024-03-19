'use client'
import { ArrowLeftIcon } from "@radix-ui/react-icons"
import { IoCartOutline } from "react-icons/io5"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Button } from "@/components/ui/button"
import { useState, useEffect, useContext } from "react"
import { useRouter } from "next/navigation"
import UserContext from "@/app/context/UseContext"
import { formattedDateTime } from "@/utils/time"

import axios from 'axios'
import { GET_USER, REQUEST_WITHDRAW, SEND_MONEY, SET_TRANSACTION_PASSWORD } from '@/utils/apiroutes'
import { toast } from '@/components/ui/use-toast'
import { checkLogin } from "../../utils/generalFunctions"



function Page() {
    const router = useRouter()
    useEffect(() => {
        checkLogin(router)
    }, [])

    const [phone, setPhone] = useState('');
    const [amount, setAmount] = useState('');
    const {user, setUser} = useContext(UserContext);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if(user){return}
        async function fetchData() {
            if(user) return;
            const userData = await axios.get(GET_USER, { withCredentials: true })
            console.log(userData)
            setUser(userData.data);
            setLoading(false)
        }

        fetchData();
    }, [setUser])

    if(loading){
        return(
            <>
            Loading...
            </>
        )
    }
    return (
        <>
            <div className='flex p-3 shadow-md shadow-gray-100 justify-between fixed w-full bg-white z-30'>
                <div className='flex items-center'>
                    <div onClick={() => router.back()} className=" cursor-pointer"><ArrowLeftIcon className='size-5' /></div>
                    <div className='ml-4 font-semibold text-[1em]'>My Transactions</div>
                </div>
                <div className='flex'>
                    <div>Search</div>
                    <div className='relative ml-4'>
                        <b className='border-[2px] bg-red-600 rounded-full absolute size-5 text-sm flex justify-center items-center text-white right-[-4px] top-[-4px] border-black'>{4}</b>
                        <IoCartOutline className='size-8 mr-1' /></div>
                </div>
            </div>

            <div className="pt-16">
                <div className='p-2 shadow-md'>
                    <h2 className='font-bold text-[20px] mb-4'>Send Money :</h2>

                    <div className="mb-4 ml-3 ">
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-800">Phone No.</label>
                        <input
                            type="number"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            placeholder='Enter phone no.'
                            value={phone}
                            onChange={e=>setPhone(e.target.value)}
                        />
                    </div>
                    <div className="mb-4 ml-3">
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-800">Amount</label>
                        <input
                            type="number"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            placeholder='Enter amount'
                            value={amount}
                            onChange={e=>setAmount(e.target.value)}
                        />
                        {<p className=' text-sm font-medium text-green-600'>₹{400} will be deduced as tax including GST, platform charge</p>}
                        {<p className=' text-sm font-medium text-red-600'>you only have ₹{300} to withdraw</p>}
                    </div>

                    <Button className='bg-red-500 px-12 ml-3'>Reset</Button>
                    <SendButton phone={phone} amount={amount} transactionPassword={user.transactionPassword} />
                </div>

                {/* -----------------transactions--------------- */}
                <Tabs defaultValue="received" className="mt-3">
                    <TabsList className='w-full h-10'>
                        <TabsTrigger value="received" className='w-[50%] h-full'>Received</TabsTrigger>
                        <TabsTrigger value="send" className='w-[50%] h-full'>Sent</TabsTrigger>
                    </TabsList>

                    <TabsContent value="received" className='px-2'>
                        <DataTable type={'received'} />
                    </TabsContent>

                    <TabsContent value="send" className='px-2'>
                        <DataTable type={'sent'} />
                    </TabsContent>
                </Tabs>

            </div>
        </>
    )
}

function DataTable({ type }) {
    const [data, setData] = useState([]);
    const { user } = useContext(UserContext)

    useEffect(() => {
        if (data == 'received') {
            setData(user.receivedCoins || [])
        } else {
            setData(user.sentCoins || [])
        }
    }, [])

    return (
        <>
            <Table>
                <TableCaption>{type == 'received' ? 'Received Amounts ...' : 'Sent Amounts ...'}</TableCaption>
                <TableHeader>
                    <TableRow className='bg-blue-50'>
                        <TableHead>{type == 'received' ? 'Sender' : 'Receiver'}</TableHead>
                        <TableHead>Phone No.</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead className="text-right">{type == 'received' ? 'Received' : 'Sent'} At</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {
                        data.map((elem, index) => {
                            <TableRow key={index}>
                                <TableCell>{elem.name}</TableCell>
                                <TableCell>{elem.phone}</TableCell>
                                <TableCell>₹{elem.coins}</TableCell>
                                <TableCell className="text-right">{formattedDateTime(elem.date).date}</TableCell>
                            </TableRow>
                        })
                    }
                </TableBody>
            </Table>

        </>
    )
}


function SendButton({ transactionPassword, phone, amount }) {
    return (
        <Dialog>
            <DialogTrigger className='bg-black float-right px-14 text-white rounded-md py-2 text-[15px]'>Send</DialogTrigger>
            {transactionPassword ? <AskTransactionPassword phone={phone} amount={amount} /> : <SetTransactionPassword />}
        </Dialog>
    )
}
function AskTransactionPassword({ phone, amount }) {
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
        try {
            axios.post(SEND_MONEY, { receiverPhone:phone, amount, password }, { withCredentials: true }).then(res=>{
            toast({
                title: res.data
            })
        }).catch(err=>{
            toast({
                title:err.response.data
            })
        })
        } catch (err) {
            console.error('error in withdrawl', err);
            toast({
                title: err.message
            })
        }
    }
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Enter your withdrawl password !</DialogTitle>
                <DialogDescription>
                    <div >
                        {/* <label htmlFor="name" className="block text-sm font-semibold text-gray-800">Transaction Password:</label> */}
                        <input
                            type="name"
                            className="block text-[1.2em] w-full px-4 py-3 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            placeholder='Enter transaction password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>

                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button onClick={handleSubmit} disabled={!password}>Withdraw</Button>
            </DialogFooter>
        </DialogContent>
    )
}

function SetTransactionPassword() {
    const [password, setPassword] = useState('');
    const [conformPassword, setConformPassword] = useState('')
    const [isDisable, setIsDisable] = useState(true)
    useEffect(() => {
        const doesPassMatch = password == conformPassword;
        const doesPassNull = conformPassword == ''

        if (!doesPassNull && doesPassMatch) {
            setIsDisable(false)
        } else {
            setIsDisable(true)
        }
    }, [password, conformPassword])


    const handleSubmit = async () => {

        try {
            const res = await axios.post(SET_TRANSACTION_PASSWORD, { transactionPassword:password }, { withCredentials: true })
            toast({
                title: res.data
            })
        } catch (err) {
            console.error('error in setting transaction password', err);
            toast({
                title: err.message,
                variant: 'destructive'
            })
        }
    }
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Set Transaction Password !</DialogTitle>
                <DialogDescription>

                    <div className='mb-4 mt-2' >
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-800 float-start">Enter Password:</label>
                        <input
                            type="text"
                            className="block text-[1.2em] w-full px-4 py-3 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            placeholder='Enter a strong password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div className='mb-1'>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-800 float-start">Conform Password:</label>
                        <input
                            type="password"
                            className="block text-[1.2em] w-full px-4 py-3 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            placeholder='Re-enter your password'
                            value={conformPassword}
                            onChange={e => setConformPassword(e.target.value)}
                        />
                        {conformPassword != '' && <p className={`float-start text-sm font-medium ${password == conformPassword ? 'text-green-600' : 'text-red-600'}`}>{password == conformPassword ? "password matched" : "Pass word doesn't matches"}</p>}
                    </div>

                </DialogDescription>
            </DialogHeader>

            <DialogFooter>
                <Button disabled={isDisable} onClick={handleSubmit} className='bg-green-600'>Save</Button>
            </DialogFooter>
        </DialogContent>
    )
}


export default Page
