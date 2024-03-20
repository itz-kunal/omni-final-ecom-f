'use client'
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"
import axios from 'axios';
import { APPROVE_PRODUCT, APPROVE_TRANSACTIONS, GET_TRANSACTIONS, PENDING_PRODUCTS } from '@/utils/apiroutes';
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
  



function Transactions() {
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [transactions, setTransactions] = useState(data);

    const [transactionsToDisplay, setTransactionsToDisplay] = useState([]);
    const [pages, setPages] = useState(1);

    //function forgetting all transactions
    useEffect(() => {
        const getTransactions = async () => {
            try {
                const res = await axios.get(PENDING_PRODUCTS, {withCredentials:true});
                setTransactions(res.data);
            } catch (err) {
                console.log('error in getting users', err)
                toast({
                    title: "Error:",
                    description: `error in getting all users, ${err.data}`,
                    variant: "destructive"
                });
            }
        };

        getTransactions();
    }, []);

    // useEffect for updating usersToDisplay
    useEffect(() => {
        const startIndex = (pageNo - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        setTransactionsToDisplay(transactions.slice(startIndex, endIndex));

        //for updating pages
        setPages(Math.ceil(transactions.length / pageSize))
    }, [transactions, pageNo, pageSize]);

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
        let matchingTransactions = [];
        if (name !== '') {
            matchingTransactions = transactions.filter(user => user.name.includes(name))
        } else if (id !== '') {
            matchingTransactions = transactions.filter(user => user._id.includes(id))
        }

        if (name === '' && id === '' || !name && !id) {
            const startIndex = (pageNo - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            setTransactionsToDisplay(transactions.slice(startIndex, endIndex));
        } else {
            setTransactionsToDisplay(matchingTransactions)
        }
    }

    return (
        <div className='p-2'>
            {/* =================== searching box inputs and filters ===================== */}
            <div className="flex my-4 mt-6">
                <Input type="text" placeholder="Enter Name..." className="w-96" onChange={(e) => searchUser(e.target.value)} />
                <Input type="text" placeholder="Enter Id..." className="mx-5 w-80" onChange={(e) => searchUser('', e.target.value)} />
            </div>

            <DataTable transactions={transactionsToDisplay} />

            {/* ====================== pagination contents ========================== */}
            <div className="flex items-center  mt-2">
                {/* -------------------- display number -------------- */}
                <div className="text-medium text-slate-500 mr-10">
                    {`${transactionsToDisplay.length} out of ${transactions.length} displayed`}
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

function DataTable({ transactions = [] }) {
    const { toast } = useToast()

    const approveTransaction = async (id, status) => {
        try {
            const res = await axios.post(APPROVE_PRODUCT, { productId: id, status }, { withCredentials: true });
            console.log(res)
            toast({
                title: `product status ${status}ed successfully !`
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
                        <TableHead>Category</TableHead>
                        <TableHead>Shop Id</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Added At</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                {/* ================= Table body data ============== */}
                <TableBody>

                    {transactions.map((transaction, i) => {
                        return (
                            <TableRow key={i}>
                                <TableCell className="font-medium">{transaction._id.toString()}</TableCell>
                                <TableCell>{transaction.name}</TableCell>
                                <TableCell>{transaction.category}</TableCell>
                                <TableCell>{transaction.addedBy}</TableCell>
                                <TableCell >{transaction.price}</TableCell>
                                <TableCell>{transaction.addedAt}</TableCell>
                                <TableCell className="text-right">
                                    <Button onClick={() => approveTransaction(transaction._id, 'approve')} className='bg-slate-600 mr-1'>Approve</Button>
                                    <Button onClick={() => approveTransaction(transaction._id, 'decline')} variant='destructive'>Decline</Button>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    )
}


export default Transactions