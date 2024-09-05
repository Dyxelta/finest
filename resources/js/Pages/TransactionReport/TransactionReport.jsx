import CustomSelectInput from "@/Components/CustomInput/CustomSelectInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Head, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { CgNotes } from "react-icons/cg";
import { TbMoodEmpty } from "react-icons/tb";
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

    const words = text.split(" ");
    let lines = [];

    words.forEach((word, index) => {
        if (word === "&" && index > 0) {
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

const CustomBar = (props) => {
    const { x, y, width, height, index } = props;
    const fillColor = index % 2 === 1 ? "#CAD8E7" : "#2D5074";

    if (isNaN(x) || isNaN(y) || isNaN(width) || isNaN(height)) {
        return null;
    }

    return <rect x={x} y={y} width={width} height={height} fill={fillColor} />;
};

export default function TransactionReportPage({
    auth,
    currMonth,
    category_transactions,
    currWallet,
    monthly_expense_data,
    monthly_income_data,
    summary_report_data,
    wallets,
}) {
    const { post, get, setData } = useForm({
        month: currMonth,
        wallet_name: currWallet?.wallet_name,
    });

    console.log(summary_report_data,"huidsfusdfghiuhiosdfghuifgsd")
    const tempData =
        category_transactions?.map((cat) => ({
            name: cat?.category?.category_name,
            value: Math.abs(cat?.total_amount),
        })) || [];

    const lengthEmpty = 18 - tempData.length;

    const data = [...tempData, ...Array(lengthEmpty).fill({})];

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

    const allWallet = {
        wallet_name: "All Wallet",
    };
    const initialWallets = [allWallet, ...wallets];

    const walletOptions = initialWallets.map((wallet) => ({
        value: wallet?.wallet_name,
        label: wallet?.wallet_name,
    }));
    console.log(category_transactions, "dfguihuhiosdfguiohgsdfuih");
    const [wait, setWait] = useState(false);
    useEffect(() => {
        const getBudgetsByWallet = () => {
            if (wait) {
                try {
                    get(route("transactionReportPage"));
                } catch (error) {
                    console.error("Error setting data:", error);
                } finally {
                    setWait(false);
                }
            }
        };

        getBudgetsByWallet();
    }, [wait]);

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
            <div className="grid grid-cols-2 grid-rows-3 gap-2 text-primary">
                <div className="bg-light rounded-lg w-full h-[375px] px-2 md:px-4 py-2 col-span-2 ">
                    <div className="flex flex-col md:flex-row w-full justify-between gap-4 ">
                        <div className="flex items-center gap-2 ">
                            <div className="header-5">
                                {" "}
                                <CgNotes />
                            </div>
                            <div className="sub-body md:button lg:header-5">
                                Monthly Report Overview
                            </div>
                        </div>
                        <div className="flex items-center gap-2 ">
                            <div className="w-32 lg:w-52 text-[10px] lg:body">
                                <CustomSelectInput
                                    placeholder={"Select Wallet"}
                                    defaultValue={
                                        currWallet
                                            ? {
                                                  value: currWallet?.wallet_name,
                                                  label: currWallet?.wallet_name,
                                              }
                                            : {
                                                  value: "All Wallet",
                                                  label: "All Wallet",
                                              }
                                    }
                                    options={walletOptions}
                                    onChange={(e) => {
                                        setData("wallet_name", e.value);
                                        setWait(true);
                                    }}
                                />
                            </div>
                            <div className="w-32 lg:w-52 text-[10px] lg:body">
                                <CustomSelectInput
                                    placeholder={"Select Month"}
                                    defaultValue={{
                                        value: monthValue,
                                        label: monthName,
                                    }}
                                    options={getCurrentMonth()}
                                    onChange={(e) => {
                                        setData("month", e.value);
                                        setWait(true);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center h-full pt-2 w-full md:w-[95%] mx-auto">
                        {category_transactions &&
                        category_transactions.length !== 0 ? (
                            <ResponsiveContainer width="100%" height="85%">
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
                                        className="hidden lg:block"
                                        dataKey="name"
                                        tick={<CustomTick />}
                                        interval={0}
                                    />
                                    <YAxis
                                        className="m-0 p-0 text-[8px] md:text-[10px] w-[30px] md:w-[50px]"
                                        width={40}
                                    />
                                    <Tooltip />
                                    <Bar
                                        dataKey="value"
                                        shape={<CustomBar />}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex flex-col w-full h-full justify-center items-center text-primary  rounded-xl gap-4">
                                <div className="text-[64px] md:text-[84px] lg:text-[110px]">
                                    <TbMoodEmpty />
                                </div>
                                <div className="header-5 md:header-3">
                                    You have no expenses for this month
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="bg-light rounded-lg w-full h-[375px] px-4 py-4">
                    <div className="flex flex-col  w-full gap-4">
                        <div className="flex items-center gap-2 ">
                            <div className="header-5">
                                {" "}
                                <CgNotes />
                            </div>
                            <div className="sub-body md:button lg:header-5">
                                Summary Report
                            </div>
                        </div>
                        <div className="w-full button md:header-5 border-b border-primary py-1">
                            Total Balance :
                        </div>
                    </div>
                    <div className="flex flex-col  h-full pt-2 w-full ">
                        <div className="rounded-xl bg-lighter-primary py-2 px-4 ">
                            <div className="flex justify-between button">
                                <div>Total Income</div>
                                <div>Rp 5000000</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-light rounded-lg w-full h-[375px] px-2 md:px-4 py-2">
                    <div className="flex w-full justify-between">
                        <div className="flex items-center gap-2 ">
                            <div className="header-5">
                                {" "}
                                <CgNotes />
                            </div>
                            <div className="sub-body md:button lg:header-5">
                                Monthly Report Overview
                            </div>
                        </div>
                        <div className="w-32 md:w-52 text-[10px] lg:body">
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
                    <div className="flex justify-center h-full pt-2 w-full md:w-[95%] mx-auto">
                        <ResponsiveContainer width="100%" height="85%">
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
                                    className="hidden lg:block"
                                    dataKey="name"
                                    tick={<CustomTick />}
                                    interval={0}
                                />
                                <YAxis
                                    className="m-0 p-0 text-[8px] md:text-[10px] w-[30px] md:w-[50px]"
                                    width={40}
                                />
                                <Tooltip />
                                <Bar dataKey="pv" shape={<CustomBar />} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="bg-light rounded-lg w-full h-[375px] px-2 md:px-4 py-2">
                    <div className="flex w-full justify-between">
                        <div className="flex items-center gap-2 ">
                            <div className="header-5">
                                {" "}
                                <CgNotes />
                            </div>
                            <div className="sub-body md:button lg:header-5">
                                Monthly Report Overview
                            </div>
                        </div>
                        <div className="w-32 md:w-52 text-[10px] lg:body">
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
                    <div className="flex justify-center h-full pt-2 w-full md:w-[95%] mx-auto">
                        <ResponsiveContainer width="100%" height="85%">
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
                                    className="hidden lg:block"
                                    dataKey="name"
                                    tick={<CustomTick />}
                                    interval={0}
                                />
                                <YAxis
                                    className="m-0 p-0 text-[8px] md:text-[10px] w-[30px] md:w-[50px]"
                                    width={40}
                                />
                                <Tooltip />
                                <Bar dataKey="pv" shape={<CustomBar />} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="bg-light rounded-lg w-full h-[375px] px-2 md:px-4 py-2">
                    <div className="flex w-full justify-between">
                        <div className="flex items-center gap-2 ">
                            <div className="header-5">
                                {" "}
                                <CgNotes />
                            </div>
                            <div className="sub-body md:button lg:header-5">
                                Monthly Report Overview
                            </div>
                        </div>
                        <div className="w-32 md:w-52 text-[10px] lg:body">
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
                    <div className="flex justify-center h-full pt-2 w-full md:w-[95%] mx-auto">
                        <ResponsiveContainer width="100%" height="85%">
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
                                    className="hidden lg:block"
                                    dataKey="name"
                                    tick={<CustomTick />}
                                    interval={0}
                                />
                                <YAxis
                                    className="m-0 p-0 text-[8px] md:text-[10px] w-[30px] md:w-[50px]"
                                    width={40}
                                />
                                <Tooltip />
                                <Bar dataKey="pv" shape={<CustomBar />} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
