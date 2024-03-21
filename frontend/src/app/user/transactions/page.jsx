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
// import { checkLogin } from "../../utils/generalFunctions"
import LoadingLayout from "@/components/common/LoadingLayout"
import Loader from "@/components/common/Loader"



function Page() {
    const router = useRouter()
   
    const [phone, setPhone] = useState('');
    const [amount, setAmount] = useState('');
    const { user } = useContext(UserContext);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (user) setLoading(false)
    }, [user])

    if (loading) {
        return (
            <LoadingLayout />
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
                            onChange={e => setPhone(e.target.value)}
                        />
                    </div>
                    <div className="mb-4 ml-3">
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-800">Amount</label>
                        <input
                            type="number"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            placeholder='Enter amount'
                            value={amount}
                            onChange={e => setAmount(e.target.value)}
                        />
                        { amount&&(amount > user.balance ? <p className=' text-sm font-medium text-red-600'>you only have ₹{user.balance} to withdraw</p> :
                         <p className=' text-sm font-medium text-green-600'>₹{amount*0.02} will be deduced as platform charge</p>)}
                    </div>

                    <Button className='bg-red-500 px-12 ml-3'>Reset</Button>
                    <SendButton phone={phone} amount={amount} transactionPassword={user.transactionPassword ? true : false} />
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
    const { receivedCoins, sentCoins } = useContext(UserContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (data == 'received') {

            if (receivedCoins) setLoading(false)
            setData(receivedCoins || [])
        } else {

            if (sentCoins) setLoading(false)
            setData(sentCoins || [])
        }
    }, [receivedCoins, sentCoins, data])

    if (loading) {
        return (
            <div>
                <Loader title={'Loading...'} size="medium" />
            </div>
        )
    }

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
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);

        axios.post(SEND_MONEY, { receiverPhone: phone, amount, password }, { withCredentials: true }).then(res => {

            setLoading(false)
            toast({
                title: res.data
            })
        }).catch(err => {
             setLoading(false)
            toast({
                title: err.response.data
            })
        })

    }
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Enter your Transaction password !</DialogTitle>
                <DialogDescription>
                    <div >
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
                <Button onClick={handleSubmit} disabled={!password || loading}>{loading ? <Loader size="small" title={'Sending...'} /> : 'Send'}</Button>
            </DialogFooter>
        </DialogContent>
    )
}

export function SetTransactionPassword() {
    const [password, setPassword] = useState('');
    const [conformPassword, setConformPassword] = useState('')
    const [isDisable, setIsDisable] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const doesPassMatch = password == conformPassword;
        const doesPassNull = conformPassword == ''

        if (!doesPassNull && doesPassMatch) {
            setIsDisable(false)
        } else {
            setIsDisable(true)
        }
    }, [password, conformPassword])


    const handleSubmit = () => {

        setLoading(true)
        axios.post(SET_TRANSACTION_PASSWORD, { transactionPassword:password }, { withCredentials: true }).then(res => {

            setLoading(false)
            toast({
                title: res.data.msg
            })

            setIsDisable(true)
            setConformPassword('')
            setPassword('')
        }).catch(err => {

            console.error('error in setting transaction password', err);
            setLoading(false)
            toast({
                title: err.data.msg || err.message,
                variant: 'destructive'
            })
            setIsDisable(false)
        })
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
                <Button disabled={isDisable} onClick={handleSubmit} className='bg-green-600'>{loading ? <Loader title={'Saving...'} size="small"/> : 'Save'}</Button>
            </DialogFooter>
        </DialogContent>
    )
}


export default Page
