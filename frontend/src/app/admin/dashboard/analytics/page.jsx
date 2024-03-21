
"use client"
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Chart as ChartJS } from "chart.js/auto";
import { Card } from "@/components/ui/card"
import { Bar, Doughnut } from 'react-chartjs-2'
import axios from "axios";
import { GET_ALL_SALES, GET_ALL_USERS } from "@/utils/apiroutes";

function Analytics() {
  const { toast } = useToast();
  const [sales, setSales] = useState([]);
  const [users, setUsers] = useState([]);


  //function forgetting all sales
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

  const chartData = {
    labels: ['Coins', 'Membership', 'Label 3'],
    datasets: [
      {
        data: [30, 40, 30],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };


  return (
    <>
      {/* ------------------ Analytics -------------------- */}
      <div className="flex justify-between my-4">
        {/* ---------------- Graphs ctnr ------------------ */}
        <Card className="flex-col justify-center items-center w-[59%] p-3">
          <h2 className="text-xl font-medium mt-2">Overview</h2>
          <Bar data={barGraphData(sales, 'Sales')} options={options} />
        </Card>

        {/* -------------------------recent users------------------------ */}
        <Card className="flex-col justify-center items-center w-[39%] h-[500px] p-3">
          <h2 className="text-xl font-medium mt-2">Recent Users</h2>
          <p className="text-sm mb-3 text-slate-500">250 users joined this year</p>
          <div className="h-[420px] flex justify-center items-center">
            <Doughnut data={chartData} options={{ cutoutPercentage: 90 }} height='100px' />
          </div>
        </Card>
      </div>

      <div className="flex justify-between my-4">
        {/* ---------------- Graphs ctnr ------------------ */}
        <Card className="flex-col justify-center items-center w-[59%] p-3">
          <h2 className="text-xl font-medium mt-2">Overview</h2>
          <Bar data={barGraphData(users, 'Users')} options={options} />
        </Card>

        {/* -------------------------recent users------------------------ */}
        <Card className="flex-col justify-center items-center w-[39%] h-[500px] p-3">
          <h2 className="text-xl font-medium mt-2">Recent Users</h2>
          <p className="text-sm mb-3 text-slate-500">250 users joined this year</p>
          <div className="h-[420px] flex justify-center items-center">
            <Doughnut data={chartData} options={{ cutoutPercentage: 90 }} height='100px' />
          </div>
        </Card>
      </div>
    </>
  )
}

export default Analytics