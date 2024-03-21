'use client'
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"
import axios from 'axios';
import { ALL_WITHDRAWL, UPDATE_WITHDRAW, WITHDRAWLS } from '@/utils/apiroutes';
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
  



function withdrawls() {
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [withdrawls, setWithdrawls] = useState(data);

    const [withdrawlsToDisplay, setWithdrawlsToDisplay] = useState([]);
    const [pages, setPages] = useState(1);

    //function forgetting all withdrawls
    useEffect(() => {
        const getWithdrawls = async () => {
            try {
                const res = await axios.get(`${ALL_WITHDRAWL}`, {withCredentials:true});
                setWithdrawls(res.data);
            } catch (err) {
                console.log('error in getting users', err)
                toast({
                    title: "Error:",
                    description: `error in getting all users, ${err.data}`,
                    variant: "destructive"
                });
            }
        };

        getWithdrawls();
    }, []);

    // useEffect for updating usersToDisplay
    useEffect(() => {
        const startIndex = (pageNo - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        setWithdrawlsToDisplay(withdrawls.slice(startIndex, endIndex));

        //for updating pages
        setPages(Math.ceil(withdrawls.length / pageSize))
    }, [withdrawls, pageNo, pageSize]);

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
        let matchingWithdrawls = [];
        if (name !== '') {
            matchingWithdrawls = withdrawls.filter(user => user.name.includes(name))
        } else if (id !== '') {
            matchingWithdrawls = withdrawls.filter(user => user._id.includes(id))
        }

        if (name === '' && id === '' || !name && !id) {
            const startIndex = (pageNo - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            setWithdrawlsToDisplay(withdrawls.slice(startIndex, endIndex));
        } else {
            setWithdrawlsToDisplay(matchingWithdrawls)
        }
    }

    return (
        <div className='p-2'>
            {/* =================== searching box inputs and filters ===================== */}
            <div className="flex my-4 mt-6">
                <Input type="text" placeholder="Enter Name..." className="w-96" onChange={(e) => searchUser(e.target.value)} />
                <Input type="text" placeholder="Enter Id..." className="mx-5 w-80" onChange={(e) => searchUser('', e.target.value)} />
            </div>

            <DataTable withdrawls={withdrawlsToDisplay} />

            {/* ====================== pagination contents ========================== */}
            <div className="flex items-center  mt-2">
                {/* -------------------- display number -------------- */}
                <div className="text-medium text-slate-500 mr-10">
                    {`${withdrawlsToDisplay.length} out of ${withdrawls.length} displayed`}
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

const data = [{
    _id:'chmac4589ha891hdj134',
    name:'Rohit Raj',
    amount:450,
    upi:'87235662@ybl',
    phone:'9122345667',
    createdAt:'23 june 2023',
},{
    _id:'chmac4589ha891hdj134',
    name:'Rohit Raj',
    amount:450,
    upi:'87235662@ybl',
    phone:'9122345667',
    createdAt:'23 june 2023',
},{
    _id:'chmac4589ha891hdj134',
    name:'Rohit Raj',
    amount:450,
    upi:'87235662@ybl',
    phone:'9122345667',
    createdAt:'23 june 2023',
},{
    _id:'chmac4589ha891hdj134',
    name:'Rohit Raj',
    amount:450,
    upi:'87235662@ybl',
    phone:'9122345667',
    createdAt:'23 june 2023',
},{
    _id:'chmac4589ha891hdj134',
    name:'Rohit Raj',
    amount:450,
    upi:'87235662@ybl',
    phone:'9122345667',
    createdAt:'23 june 2023',
},{
    _id:'chmac4589ha891hdj134',
    name:'Rohit Raj',
    amount:450,
    upi:'87235662@ybl',
    phone:'9122345667',
    createdAt:'23 june 2023',
},{
    _id:'chmac4589ha891hdj134',
    name:'Rohit Raj',
    amount:450,
    upi:'87235662@ybl',
    phone:'9122345667',
    createdAt:'23 june 2023',
},{
    _id:'chmac4589ha891hdj134',
    name:'Rohit Raj',
    amount:450,
    upi:'87235662@ybl',
    phone:'9122345667',
    createdAt:'23 june 2023',
},{
    _id:'chmac4589ha891hdj134',
    name:'Rohit Raj',
    amount:450,
    upi:'87235662@ybl',
    phone:'9122345667',
    createdAt:'23 june 2023',
},{
    _id:'chmac4589ha891hdj134',
    name:'Rohit Raj',
    amount:450,
    upi:'87235662@ybl',
    phone:'9122345667',
    createdAt:'23 june 2023',
},{
    _id:'chmac4589ha891hdj134',
    name:'Rohit Raj',
    amount:450,
    upi:'87235662@ybl',
    phone:'9122345667',
    createdAt:'23 june 2023',
},{
    _id:'chmac4589ha891hdj134',
    name:'Rohit Raj',
    amount:450,
    upi:'87235662@ybl',
    phone:'9122345667',
    createdAt:'23 june 2023',
},{
    _id:'chmac4589ha891hdj134',
    name:'Rohit Raj',
    amount:450,
    upi:'87235662@ybl',
    phone:'9122345667',
    createdAt:'23 june 2023',
},{
    _id:'chmac4589ha891hdj134',
    name:'Rohit Raj',
    amount:450,
    upi:'87235662@ybl',
    phone:'9122345667',
    createdAt:'23 june 2023',
},{
    _id:'chmac4589ha891hdj134',
    name:'Rohit Raj',
    amount:450,
    upi:'87235662@ybl',
    phone:'9122345667',
    createdAt:'23 june 2023',
},{
    _id:'chmac4589ha891hdj134',
    name:'Rohit Raj',
    amount:450,
    upi:'87235662@ybl',
    phone:'9122345667',
    createdAt:'23 june 2023',
},{
    _id:'chmac4589ha891hdj134',
    name:'Rohit Raj',
    amount:450,
    upi:'87235662@ybl',
    phone:'9122345667',
    createdAt:'23 june 2023',
},{
    _id:'chmac4589ha891hdj134',
    name:'Rohit Raj',
    amount:450,
    upi:'87235662@ybl',
    phone:'9122345667',
    createdAt:'23 june 2023',
},{
    _id:'chmac4589ha891hdj134',
    name:'Rohit Raj',
    amount:450,
    upi:'87235662@ybl',
    phone:'9122345667',
    createdAt:'23 june 2023',
},{
    _id:'chmac4589ha891hdj134',
    name:'Rohit Raj',
    amount:450,
    upi:'87235662@ybl',
    phone:'9122345667',
    createdAt:'23 june 2023',
},{
    _id:'chmac4589ha891hdj134',
    name:'Rohit Raj',
    amount:450,
    upi:'87235662@ybl',
    phone:'9122345667',
    createdAt:'23 june 2023',
},{
    _id:'chmac4589ha891hdj134',
    name:'Rohit Raj',
    amount:450,
    upi:'87235662@ybl',
    phone:'9122345667',
    createdAt:'23 june 2023',
},{
    _id:'chmac4589ha891hdj134',
    name:'Rohit Raj',
    amount:450,
    upi:'87235662@ybl',
    phone:'9122345667',
    createdAt:'23 june 2023',
},{
    _id:'chmac4589ha891hdj134',
    name:'Rohit Raj',
    amount:450,
    upi:'87235662@ybl',
    phone:'9122345667',
    createdAt:'23 june 2023',
},{
    _id:'chmac4589ha891hdj134',
    name:'Rohit Raj',
    amount:450,
    upi:'87235662@ybl',
    phone:'9122345667',
    createdAt:'23 june 2023',
},{
    _id:'chmac4589ha891hdj134',
    name:'Rohit Raj',
    amount:450,
    upi:'87235662@ybl',
    phone:'9122345667',
    createdAt:'23 june 2023',
},{
    _id:'chmac4589ha891hdj134',
    name:'Rohit Raj',
    amount:450,
    upi:'87235662@ybl',
    phone:'9122345667',
    createdAt:'23 june 2023',
},{
    _id:'chmac4589ha891hdj134',
    name:'Rohit Raj',
    amount:450,
    upi:'87235662@ybl',
    phone:'9122345667',
    createdAt:'23 june 2023',
},{
    _id:'chmac4589ha891hdj134',
    name:'Rohit Raj',
    amount:450,
    upi:'87235662@ybl',
    phone:'9122345667',
    createdAt:'23 june 2023',
},{
    _id:'chmac4589ha891hdj134',
    name:'Rohit Raj',
    amount:450,
    upi:'87235662@ybl',
    phone:'9122345667',
    createdAt:'23 june 2023',
}]
function DataTable({ withdrawls = data }) {
    const { toast } = useToast()

    const approveTransaction = async (userId ,id, status) => {
        try {
            const res = await axios.post(UPDATE_WITHDRAW, { userId, withdrawlId: id, status }, { withCredentials: true });
            toast({
                title: `payment status ${status}ed successfully !`
            })
        } catch (err) {
            console.error('something went wrong in approving', err);
            toast({
                title: 'umm something went wrong !'
            })
        }
    }

    return (
        <div className='border-2 rounded-sm'>
            <Table>
                {/* ====================== table head data ========================= */}
                <TableHeader>
                    <TableRow className="bg-slate-50">
                        <TableHead className="w-[210px]">ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>UPI</TableHead>
                        <TableHead>Phone No.</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                {/* ================= Table body data ============== */}
                <TableBody>

                    {withdrawls.map((withdrawl, i) => {
                        return (
                            <TableRow key={i}>
                                <TableCell className="font-medium">{withdrawl._id.toString()}</TableCell>
                                <TableCell>{withdrawl.name}</TableCell>
                                <TableCell>{withdrawl.upi}</TableCell>
                                <TableCell>{withdrawl.phone}</TableCell>
                                <TableCell >{withdrawl.amount}</TableCell>
                                <TableCell>{withdrawl.createdAt}</TableCell>
                                <TableCell className="text-right">
                                    <Button onClick={() => approveTransaction(withdrawl.user , withdrawl._id, 'approve')} className='bg-slate-600 mr-1'>Approve</Button>
                                    <Button onClick={() => approveTransaction(withdrawl.user , withdrawl._id, 'decline')} variant='destructive'>Decline</Button>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    )
}


export default withdrawls