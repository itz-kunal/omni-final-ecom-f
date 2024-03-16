"use client"
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2"
import { useState,useEffect } from "react";
import { GET_ALL_SALES, GET_ALL_USERS } from "@/utils/apiroutes";
import axios from "axios";

// icons imorts 

// shadCN components
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"


const RecentUserTable = ( picUrl = 'https://github.com/shadcn.png', name = 'Demo Tester', amount = 0, description = 'Hey i am using Flirtu ...' ) => {
    return (
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell className="font-medium text-left flex items-center">
                        <Avatar className="mr-3 inline-block w-9 h-9">
                            <AvatarImage src={picUrl} />
                            <AvatarFallback>FP</AvatarFallback>
                        </Avatar>
                        <b>{name}
                            <p className="text-[13px] font-light text-slate-500">{description}</p>
                        </b>
                    </TableCell>
                    <TableCell className="text-right">₹{amount}</TableCell>
                </TableRow>
            </TableBody>
        </Table>

    )
}


function Dashboard() {
    const { toast } = useToast();
    const [sales, setSales] = useState([]);
    const [users, setUsers] = useState([]);


    //function forgetting all users
    useEffect(() => {
        const getSales = async () => {
            try {
                const res = await axios.get(`${GET_ALL_SALES}`);
                setSales(res.data);
            } catch (err) {
                console.log('error in getting users', err)
                toast({
                    title: "Error:",
                    description: `error in getting sales data, ${err.response.data}`,
                    variant: "destructive"
                });
            }
        };

        const getUsers = async () => {
            try {
                const res = await axios.get(`${GET_ALL_USERS}`);
                setUsers(res.data);
            } catch (err) {
                console.log('error in getting users', err)
                toast({
                    title: "Error:",
                    description: `error in getting all users, ${err.response.data}`,
                    variant: "destructive"
                });
            }
        };

        getUsers()
        getSales();
    }, []);

    function extractBarGraphData(data, label) {
        const filteredData = [];

        for (let i = 0; i < 12; i++) {
            filteredData.push(data.filter(elem => {
                if (label === 'Sales') {
                    const transactionDate = new Date(elem.paidAt)
                    return transactionDate.getMonth() === i
                } else {
                    const registrationDate = new Date(elem.registeredAt)
                    return registrationDate.getMonth() === i
                }
            }).length)
        }

        return filteredData
    }
    const barGraphData = (data, label) => {
        return ({
            datasets: [
                {
                    label,
                    data: extractBarGraphData(data, label) || [0],
                    backgroundColor: 'black',
                    barThickness: 35,
                    borderRadius: 3
                }
            ]
        });
    };

    const options = {
        responsive: true,
        elements: {
            bar: {
                shadowOffsetX: 2,
                shadowOffsetY: 2,
                shadowBlur: 5,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
        },
        animation: {
            duration: 1000, // Animation duration in milliseconds
            easing: 'easeInOutQuart', // Easing function for animation
        },

        scales: {
            x: {
                type: 'category',
                labels: ['jan', 'feb', 'mar', 'may', 'june', 'july', 'aug', 'sep', 'oct', 'nov', 'dec'],
                grid: {
                    display: false, // Hide x-axis grid lines
                },
            },
            y: {
                beginAtZero: true,
                grid: {
                    display: false, // Hide y-axis grid lines
                }
            },
        },
    };

    const recentSales = (qnty)=>{
        const recentSalesData = sales.reverse().slice(0,qnty) ;
        const monthTransaction = sales.filter(sale=>{
            const transactionDate = new Date(sale.paidAt)
            const currentDate = new Date(Date.now())
            return transactionDate.getMonth() === currentDate.getMonth() 
        }).length || 0 ;
        return {recentSalesData,monthTransaction} ;
    }
    const recentSalesData = recentSales(10)
    return (
        <>
            {/* ------------------ Analytics -------------------- */}
            <div className="flex justify-between my-4">
                {/* ---------------- Graphs ctnr ------------------ */}
                <Card className="flex-col justify-center items-center w-[59%] p-3">
                    <h2 className="text-xl font-medium mt-2">Overview</h2>
                    <Bar data={barGraphData(users, 'Users')} options={options} />
                </Card>

                {/* -------------------------recent users------------------------ */}
                <Card className="flex-col w-[39%] p-3">
                    <h2 className="text-xl font-medium mt-2">Recent Users</h2>
                    <p className="text-sm mb-3 text-slate-500">{recentSalesData.monthTransaction} transactions this month</p>
                    {recentSalesData.recentSalesData.map(sales=><RecentUserTable/>)}
                </Card>
            </div>
        </>
    )
}


export default Dashboard