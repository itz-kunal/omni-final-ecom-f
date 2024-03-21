'use client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { useContext, useEffect, useState } from 'react'
import { ArrowLeftIcon } from '@radix-ui/react-icons'
import { IoCartOutline } from "react-icons/io5";
import { useRouter } from 'next/navigation'
import UserContext from '@/app/context/UseContext'
import axios from 'axios'
import { GET_USER, REQUEST_WITHDRAW, SET_TRANSACTION_PASSWORD, WITHDRAWLS } from '@/utils/apiroutes'
import { formattedDateTime } from '@/utils/time'
import { toast } from '@/components/ui/use-toast'
import Loader from '@/components/common/Loader'
import LoadingLayout from '@/components/common/LoadingLayout'
import { SetTransactionPassword } from '../transactions/page'


function Page() {
    const router = useRouter();
    const { user, withdrawls } = useContext(UserContext);
    const [withdrawlAmount, setWithdrawlAmount] = useState('');
    const [totalWithdrawl, setTotalWithdrawl] = useState(0)
    const [upi, setUpi] = useState('')
    const [loading, setLoading] = useState(true);

    const [withdrawlLoading, setWithdrawlLoading] = useState(true)


    useEffect(() => {
        if (user) {
            setLoading(false)
        }
        if (withdrawls) {
            setWithdrawlLoading(false)
        }
    }, [user, withdrawls])

    useEffect(() => {
        if (!withdrawls) return;

        const totalWithdrawlRes = withdrawls?.reduce((acr, cur) => {
            return acr + cur.amount
        }, 0) || 0;

        setTotalWithdrawl(totalWithdrawlRes);
    }, [withdrawls])

    // if (loading) {
    //     return (
    //         <LoadingLayout/>
    //         // <div className='h-[100vh] flex justify-center items-center'>
    //         //      <Loader title={'Loading...'} size='medium'/>
    //         // </div>
    //     )
    // }

    return (
        <>
            <div className='flex p-3 shadow-md shadow-gray-100 justify-between fixed w-full bg-white z-30'>
                <div className='flex items-center'>
                    <div onClick={() => router.back()} className='cursor-pointer'><ArrowLeftIcon className='size-5' /></div>
                    <div className='ml-4 font-semibold text-[1em]'>My Wallet</div>
                </div>
                <div className='flex'>
                    <div>Search</div>
                    <div className='relative ml-4'>
                        <b className='border-[2px] bg-red-600 rounded-full absolute size-5 text-sm flex justify-center items-center text-white right-[-4px] top-[-4px] border-black'>{4}</b>
                        <IoCartOutline className='size-8 mr-1' /></div>
                </div>
            </div>

            <div className='pt-16'>

                {/* -------------upper cards section--------------- */}
                <div className='flex justify-around flex-wrap shadow-md border-b-2 mb-2'>
                    <Card className='m-2 w-[41vw] p-2'>
                        <h2 className=' font-semibold text-[18px]'>Earnings:</h2>
                        <p>₹ {user.balance || 0}</p>
                    </Card>
                    <Card className='m-2 w-[41vw] p-2'>
                        <h2 className=' font-semibold text-[18px]'>2% Balance:</h2>
                        <p>₹ {user.balance2 || 0}</p>
                    </Card>
                    <Card className='m-2 w-[41vw] p-2'>
                        <h2 className=' font-semibold text-[18px]'>50% Balance:</h2>
                        <p>₹ {user.balance50 || 0}</p>
                    </Card>
                    <Card className='m-2 w-[41vw] p-2'>
                        <h2 className=' font-semibold text-[18px]'>Withdrawls:</h2>
                        <p>₹ {totalWithdrawl}</p>
                    </Card>
                    <Card className='m-2 w-full p-4 flex justify-between items-center mx-4'>
                        <div>
                            <h2 className=' font-semibold text-[18px]'>Balance (omni-coins):</h2>
                            <p>₹ {user.omniCoin || 0}</p>
                        </div>

                        <Button className='bg-green-700 hover:bg-slate-500' onClick={() => router.push('/pay-amount/topup_100')}>Add</Button>

                    </Card>

                </div>

                {/* --------------------send money------------------ */}
                <div><Button className=' w-[90vw] mx-[4vw]' onClick={() => router.push('/transactions')}>Transactions</Button></div>
                {/* --------------------withdrawl section------------------ */}
                <div className='p-2 bg-slate-100'>
                    <h2 className='font-bold text-[20px] mb-4'>Withdraw</h2>

                    <div className="mb-4 ml-3 ">
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-800">UPI</label>
                        <input
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            placeholder='Enter your UPI no.'
                            value={upi}
                            onChange={e => setUpi(e.target.value)}
                        />
                    </div>
                    <div className="mb-4 ml-3">
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-800">Amount</label>
                        <input
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            placeholder='Enter amount'
                            value={withdrawlAmount}
                            onChange={e => setWithdrawlAmount(e.target.value)}
                        />

                        {withdrawlAmount && (withdrawlAmount > user.balance ? <p className=' text-sm font-medium text-red-600'>you only have ₹{user.balance} to withdraw</p> :
                            <p className=' text-sm font-medium text-green-600'>₹{withdrawlAmount * 0.15} will be deduced as tax including GST, platform charge</p>)}

                        {/* {<p className=' text-sm font-medium text-green-600'>₹{400} will be deduced as tax including GST, platform charge</p>}
                        {<p className=' text-sm font-medium text-red-600'>you only have ₹{300} to withdraw</p>} */}
                    </div>

                    <Button className='bg-red-500 px-12 ml-3'>Reset</Button>


                    <WithdrawButton transactionPassword={user.transactionPassword ? true : false} withdrawlAmount={withdrawlAmount} upi={upi} />
                </div>

                <div className='p-2'>
                    <h2 className='font-bold text-[20px] mb-4'>Pending Withdrawls</h2>
                    <div className='flex justify-around flex-wrap'>
                        {withdrawlLoading ? (<>Loading...</>) : (
                            withdrawls.length > 0 ? (
                                withdrawls.map((withdrawl) =>
                                (
                                    <Card className='p-2 w-fit m-2 px-6' key={withdrawl._id}>
                                        <h2 className=' font-bold text-[20px] text-center'>₹{withdrawl.amount || 0}</h2>
                                        <p className=' font-medium'>{formattedDateTime(withdrawl.createdAt).date}</p>
                                        <p className='text-center text-yellow-600'>{withdrawl.status}</p>
                                    </Card>
                                )
                                )) : ('Not Withdrawls yet')
                        )
                        }

                    </div>
                </div>
            </div>
        </>
    )
}

function WithdrawButton({ transactionPassword, withdrawlAmount, upi }) {
    return (
        <Dialog>
            <DialogTrigger className='float-right'>
                <Button className='bg-green-600 px-12 ml-3 w-48'>Withdraw</Button>
            </DialogTrigger>

            {transactionPassword ? <AskTransactionPassword upi={upi} withdrawlAmount={withdrawlAmount} /> : <SetTransactionPassword />}
        </Dialog>
    )
}

function AskTransactionPassword({ upi, withdrawlAmount }) {
    const [password, setPassword] = useState('');

    const { setWithdrawls } = useContext(UserContext)

    const handleSubmit = () => {
        axios.post(REQUEST_WITHDRAW, { upi, amount: withdrawlAmount, transactionPassword: password }, { withCredentials: true }).then(res => {
            setWithdrawls(res.data.withdrawls);
            toast({
                title: res.data.msg
            })
        }).catch(err => {
            toast({
                title: err.response.data
            })
        })

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

// function SetTransactionPassword() {
//     const [password, setPassword] = useState('');
//     const [conformPassword, setConformPassword] = useState('')
//     const [isDisable, setIsDisable] = useState(true)
//     useEffect(() => {
//         const doesPassMatch = password == conformPassword;
//         const doesPassNull = conformPassword == ''

//         if (!doesPassNull && doesPassMatch) {
//             setIsDisable(false)
//         } else {
//             setIsDisable(true)
//         }
//     }, [password, conformPassword])


//     const handleSubmit = async () => {

//         try {
//             const res = await axios.post(SET_TRANSACTION_PASSWORD, { transactionPassword: password }, { withCredentials: true })
//             toast({
//                 title: res.data
//             })
//         } catch (err) {
//             console.error('error in setting transaction password', err);
//             toast({
//                 title: err.message,
//                 variant: 'destructive'
//             })
//         }
//     }
//     return (
//         <DialogContent>
//             <DialogHeader>
//                 <DialogTitle>Set Transaction Password !</DialogTitle>
//                 <DialogDescription>

//                     <div className='mb-4 mt-2' >
//                         <label htmlFor="name" className="block text-sm font-semibold text-gray-800 float-start">Enter Password:</label>
//                         <input
//                             type="text"
//                             className="block text-[1.2em] w-full px-4 py-3 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
//                             placeholder='Enter a strong password'
//                             value={password}
//                             onChange={e => setPassword(e.target.value)}
//                         />
//                     </div>
//                     <div className='mb-1'>
//                         <label htmlFor="name" className="block text-sm font-semibold text-gray-800 float-start">Conform Password:</label>
//                         <input
//                             type="password"
//                             className="block text-[1.2em] w-full px-4 py-3 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
//                             placeholder='Re-enter your password'
//                             value={conformPassword}
//                             onChange={e => setConformPassword(e.target.value)}
//                         />
//                         {conformPassword != '' && <p className={`float-start text-sm font-medium ${password == conformPassword ? 'text-green-600' : 'text-red-600'}`}>{password == conformPassword ? "password matched" : "Pass word doesn't matches"}</p>}
//                     </div>

//                 </DialogDescription>
//             </DialogHeader>

//             <DialogFooter>
//                 <Button disabled={isDisable} onClick={handleSubmit} className='bg-green-600'>Save</Button>
//             </DialogFooter>
//         </DialogContent>
//     )
// }

export default Page