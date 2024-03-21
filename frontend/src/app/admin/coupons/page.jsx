'use client'
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"
import axios from 'axios';
import { ALL_WITHDRAWL, UPDATE_WITHDRAW, SENT_60_COUPON, ALL_COUPONS } from '@/utils/apiroutes';
import { useToast } from '@/components/ui/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from '@/components/ui/input';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { formattedDateTime } from '@/utils/time';




function Coupons() {
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [coupons, setCoupons] = useState([]);

    const [couponsToDisplay, setCouponsToDisplay] = useState([]);
    const [pages, setPages] = useState(1);

    //function forgetting all Coupons
    useEffect(() => {
        const getCoupons = async () => {
            try {
                const res = await axios.get(ALL_COUPONS, { withCredentials: true });
                setCoupons(res.data.coupons);
            } catch (err) {
                console.log('error in getting users', err)
                toast({
                    title: "Error:",
                    description: `error in getting all users, ${err.data.msg || err.message}`,
                    variant: "destructive"
                });
            }
        };

        getCoupons();
    }, []);

    // useEffect for updating usersToDisplay
    useEffect(() => {
        const startIndex = (pageNo - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        if (coupons) {
            setCouponsToDisplay(coupons.slice(startIndex, endIndex));
        }

        //for updating pages
        setPages(Math.ceil(coupons.length / pageSize))
    }, [coupons, pageNo, pageSize]);

    //handle next and back page
    const handleNextBackPage = (i) => {
        if (i === -1) {
            setPageNo(prev => {
                if (prev - 1 !== 0) {
                    return prev - 1
                } else {
                    return 1
                }
            })
        } else {
            setPageNo(prev => {
                if (prev + 1 < pages) {
                    return prev + 1
                } else {
                    return pages
                }
            })
        }
    }

    const searchUser = (name, id) => {
        let matchingCoupons = [];
        if (name !== '') {
            matchingCoupons = coupons.filter(user => user.name.includes(name))
        } else if (id !== '') {
            matchingCoupons = coupons.filter(user => user._id.includes(id))
        }

        if (name === '' && id === '' || !name && !id) {
            const startIndex = (pageNo - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            setCouponsToDisplay(coupons.slice(startIndex, endIndex));
        } else {
            setCouponsToDisplay(matchingCoupons)
        }
    }

    function sendCoupon() {
        axios.post(SENT_60_COUPON, {}, { withCredentials: true }).then(res => {
            toast({
                title: res.data.msg
            })
        }).catch(err => {
            console.log(err)
            toast({
                title: err.response.data.msg || err.message
            })
        })
    }

    return (
        <div className='p-2'>
            {/* =================== searching box inputs and filters ===================== */}
            <div className="flex my-4 mt-6">
                <Input type="text" placeholder="Enter Name..." className="w-96" onChange={(e) => searchUser(e.target.value)} />
                <Input type="text" placeholder="Enter Id..." className="mx-5 w-80" onChange={(e) => searchUser('', e.target.value)} />

                <Button className='ml-60' onClick={sendCoupon}>Send Coupon</Button>
            </div>

            <DataTable coupons={couponsToDisplay} />

            {/* ====================== pagination contents ========================== */}
            <div className="flex items-center  mt-2">
                {/* -------------------- display number -------------- */}
                <div className="text-medium text-slate-500 mr-10">
                    {`${couponsToDisplay.length} out of ${coupons.length} displayed`}
                </div>
                {/* ---------------------- select col numbers ----------------- */}
                <Select onValueChange={(value) => setPageSize(value)}>
                    <SelectTrigger className="w-[80px]">
                        <SelectValue placeholder="20" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="20">20</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                    </SelectContent>
                </Select>

                {/* ------------------pagination----------------- */}
                <Pagination className="w-auto mx-0 ml-[800px]">
                    <PaginationContent>
                        <PaginationItem onClick={() => handleNextBackPage(-1)}>
                            <PaginationPrevious href="#" />
                        </PaginationItem>


                        {pages > 3 ? (
                            <>
                                {pageNo > 3 ? (
                                    <>
                                        {Array.from({ length: 3 }).map((_, index) => (
                                            <PaginationItem key={index}>
                                                <PaginationLink href="#" isActive={(pageNo - index) === pageNo} onClick={() => setPageNo(pageNo - index)}>{pageNo - index}</PaginationLink>
                                            </PaginationItem>
                                        )).reverse()}
                                        {pageNo === pages ? null : (
                                            <PaginationItem>
                                                <PaginationEllipsis />
                                            </PaginationItem>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        {Array.from({ length: 3 }).map((_, index) => (
                                            <PaginationItem key={index}>
                                                <PaginationLink href="#" isActive={(index + 1) === pageNo} onClick={() => setPageNo(index + 1)}>{index + 1}</PaginationLink>
                                            </PaginationItem>
                                        ))}
                                        {pageNo === pages ? null : (
                                            <PaginationItem>
                                                <PaginationEllipsis />
                                            </PaginationItem>
                                        )}
                                    </>
                                )}
                            </>
                        ) : (
                            <>
                                {Array.from({ length: pages }).map((_, index) => (
                                    <PaginationItem key={index}>
                                        <PaginationLink href="#" isActive={(index + 1) === pageNo} onClick={() => setPageNo(index + 1)}>{index + 1}</PaginationLink>
                                    </PaginationItem>
                                ))}
                            </>
                        )}

                        <PaginationItem>
                            <PaginationNext href="#" onClick={() => handleNextBackPage(1)} />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>


            </div>
        </div>
    )
}

function DataTable({ coupons = [] }) {
    const { toast } = useToast()
    function sendCoupon(schCouponId) {
        axios.post(SENT_60_COUPON, { schCouponId }, { withCredentials: true }).then(res => {
            toast({
                title: res.data.msg
            })
        }).catch(err => {
            toast({
                title: err.response?.data.msg
            })
        })
    }

    return (
        <div className='border-2 rounded-sm'>
            <Table>
                {/* ====================== table head data ========================= */}
                <TableHeader>
                    <TableRow className="bg-slate-50">
                        <TableHead className="w-[210px]">ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>count</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                {/* ================= Table body data ============== */}
                <TableBody>

                    {coupons.map((coupon, i) => {
                        return (
                            <TableRow key={i}>
                                <TableCell className="font-medium">{coupon._id.toString()}</TableCell>
                                <TableCell>{coupon.name}</TableCell>
                                <TableCell>{coupon.type}</TableCell>
                                <TableCell>{coupon.type == '60day' ? coupon.count : ''}</TableCell>
                                <TableCell >{coupon.amount}</TableCell>
                                <TableCell>{formattedDateTime(coupon.createdAt).date}</TableCell>
                                <TableCell className="text-right">
                                    <Button onClick={() => sendCoupon(coupon._id)} className='bg-slate-600 mr-1'>Sent ({coupon.count})</Button>
                                    {/* <Button onClick={() => approveTransaction(withdrawl.user , withdrawl._id, 'decline')} variant='destructive'>Decline</Button> */}
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    )
}


export default Coupons