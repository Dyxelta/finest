import CustomSelectInput from "@/Components/CustomInput/CustomSelectInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Head, useForm } from "@inertiajs/react";
import { CgNotes } from "react-icons/cg";
import {
    BarChart,
    Bar,
    Rectangle,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Text,
} from "recharts";

const CustomTick = ({ x, y, payload }) => {
    let text = payload.value;
  

    const words = text.split(' ');
    let lines = [];
  
    words.forEach((word, index) => {
      if (word === '&' && index > 0) {
        lines[lines.length - 1] += ` &`;
      } else {
        lines.push(word);
      }
    });
  
    return (
      <g transform={`translate(${x},${y})`}>
        {lines.map((line, index) => (
          <text
            key={index}
            x={0}
            y={index * 12} 
            textAnchor="middle"
            fill="#666"
            fontSize={9}
          >
            <tspan dy={6}>{line}</tspan>
          </text>
        ))}
      </g>
    );
  };
  
export default function TransactionReportPage({ auth, currMonth }) {
    const { post, get, setData } = useForm({
        month: "",
    });

    const data = [
        {
            name: "Outgoing Transafer",

            pv: 2400,
        },
        {
            name: "Housing",

            pv: 1398,
        },
        {
            name: "Bill & Utilities",

            pv: 9800,
        },
        {
            name: "Food & Beverage",

            pv: 3908,
        },
        {
            name: "Entertainment",

            pv: 4800,
        },
        {
            name: "Subscriptions",

            pv: 3800,
        },
        {
            name: "Gifts & Donations",

            pv: 4300,
        },
        {
            name: "Health",

            pv: 4300,
        },
        {
            name: "Fitness",

            pv: 4300,
        },
        {
            name: "Insurance",

            pv: 2400,
        },
        {
            name: "Page B",

            pv: 1398,
        },
        {
            name: "Investment",

            pv: 9800,
        },
        {
            name: "Shopping",

            pv: 3908,
        },
        {
            name: "Transportation",

            pv: 4800,
        },
        {
            name: "Pet",

            pv: 3800,
        },
        {
            name: "Education",

            pv: 4300,
        },
        {
            name: "Outgoing Transafer",

            pv: 4300,
        },
        {
            name: "Other Expense",

            pv: 4300,
        },
    ];
    const monthValue = parseInt(currMonth) ?? new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const monthName = new Date(currentYear, monthValue - 1).toLocaleString(
        "default",
        { month: "long" }
    );

    const getCurrentMonth = () => {
        const currentMonth = new Date().getMonth();

        const months = [];
        for (let i = 0; i < 12; i++) {
            const month = currentMonth - i;
            const currentYear = new Date().getFullYear();
            const year = currentYear - Math.floor((11 - month) / 12);
            const adjustedMonth = (month + 12) % 12;
            const monthName = new Date(year, adjustedMonth).toLocaleString(
                "default",
                { month: "long" }
            );
            months.push({
                label: monthName,
                value: adjustedMonth + 1,
            });
        }

        return months;
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Transaction Records
                </h2>
            }
        >
            <Head title="Transaction Reports" />
            <div className="">
                <div className="bg-light rounded-lg w-full h-[350px] px-4 py-2">
                    <div className="flex w-full justify-between">
                        <div className="flex items-center gap-2 text-primary">
                            <div className="header-5">
                                {" "}
                                <CgNotes />
                            </div>
                            <div className=" button md:header-5">
                                Monthly Report Overview
                            </div>
                        </div>
                        <div className="w-52">
                            <CustomSelectInput
                                placeholder={"Select Month"}
                                defaultValue={{
                                    value: monthValue,
                                    label: monthName,
                                }}
                                options={getCurrentMonth()}
                                onChange={(e) => {
                                    setData("month", e.value);
                                }}
                            />
                        </div>
                    </div>
                    <div className="flex w-full justify-center h-full">
                        <ResponsiveContainer width="90%" height="85%">
                            <BarChart
                                width={500}
                                height={240}
                                data={data}
                                margin={{
                                    top: 5,
                                    right: 0,
                                    left: 0,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    className="mt-8"
                                    dataKey={"name"}
                                    tick={<CustomTick />}
                                    interval={0}
                                    fontSize={8}
                                />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="pv" fill="#2D5074" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
