import ExpenseReportOverview from "@/Components/TransactionReports/ExpenseReportOverview";
import IncomeReportOverview from "@/Components/TransactionReports/IncomeReportOverview";
import MonthlyReportOverview from "@/Components/TransactionReports/MonthlyReportOverview";
import ShowNetIncomeOverview from "@/Components/TransactionReports/ShowNetIncomeOverview";
import ShowNetIncome from "@/Components/TransactionReports/ShowNetIncomeOverview";
import SummaryReportOverview from "@/Components/TransactionReports/SummaryReportOverView";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Head, useForm } from "@inertiajs/react";
import moment from "moment";
import { useEffect, useState } from "react";
import { CgNotes } from "react-icons/cg";
import DecorBG from "../../../../public/image/public/DecorBG.png";
const generateMonthsArray = () => {
    const monthsArray = [];
    const currentMonth = moment().month() + 1;
    const currentYear = moment().year();
    for (let i = 0; i < 12; i++) {
        const month = currentMonth - i;
        const year = currentYear - Math.floor((11 - month) / 12);
        const adjustedMonth = (month + 12) % 12 || 12;
        const monthName = moment(`${year}-${adjustedMonth}`, "YYYY-M").format(
            "MMM"
        );

        monthsArray.push({
            total_amount: 0,
            month: month,
            monthName: monthName,
        });
    }

    return monthsArray.reverse();
};

const generate12MonthsChart = (monthsArray, data) => {
    return monthsArray.map((mon) => {
        const matchingData = data.find((item) => item.month === mon.month);
        return matchingData || mon;
    });
};

export default function TransactionReportPage({
    auth,
    currMonth,
    category_transactions,
    currWallet,
    monthly_expense_data,
    monthly_income_data,
    summary_report,
    wallets,
}) {
    const { get, setData } = useForm({
        month: currMonth,
        wallet_name: currWallet?.wallet_name,
    });

    const tempData = category_transactions?.map((cat) => ({
        name: cat?.category?.category_name,
        value: Math.abs(cat?.total_amount),
    }));

    const lengthEmpty = 18 - tempData.length;

    const MonthlyReportData = [...tempData, ...Array(lengthEmpty).fill({})];

    const monthValue = parseInt(currMonth) ?? new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const monthName = new Date(currentYear, monthValue).toLocaleString(
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
                <div className="bg-light rounded-lg w-full h-[300px] md:h-[375px] px-2 md:px-4 py-2 col-span-2 ">
                    <MonthlyReportOverview
                        category_transactions={category_transactions}
                        walletOptions={walletOptions}
                        currWallet={currWallet}
                        monthValue={monthValue}
                        monthName={monthName}
                        getCurrentMonth={getCurrentMonth}
                        setData={setData}
                        setWait={setWait}
                        MonthlyReportData={MonthlyReportData}
                    />
                </div>

                <div className="bg-light rounded-lg w-full h-[300px] md:h-[375px] px-4 md:px-8 py-4 col-span-2 md:col-span-1">
                    <SummaryReportOverview summary_report={summary_report} />
                </div>
                <div className="bg-light rounded-lg w-full h-[300px] md:h-[375px] p-3 col-span-2 md:col-span-1 ">
                    <div className="w-full h-full bg-background rounded-xl z-50 relative overflow-hidden">
                    <img
                        src={DecorBG}
                        alt="DecorBG"
                        className=" absolute right-[-80px] top-[-80px] w-[300px] h-[200px] -z-0"
                    />
                        <div className="flex w-full justify-between z-50 items-center px-1 lg:px-4 relative">
                            <div className="flex items-center gap-2 mt-2">
                                <div className="sub-body-bold lg:button xl:header-5 bg-light rounded-md px-4 py-2 ">
                                    {monthName}
                                </div>
                            </div>
                            <div className="flex items-center gap-1 lg:gap-2 mt-2">
                                <div className="sub-body-bold lg:button  xl:header-5  bg-light rounded-md px-4 py-2 m">
                                    Net Income Overview
                                </div>
                                <div className="sub-body-bold lg:button xl:header-5 bg-light rounded-full p-3 ">
                                    {" "}
                                    <CgNotes />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center h-full pt-2 w-full md:w-[95%] mx-auto mt-4 relative">
                            <ShowNetIncomeOverview />
                        </div>
                    </div>
                </div>
                <div className="bg-light rounded-lg w-full h-[300px] md:h-[375px] px-4 md:px-8 py-4 col-span-2 ">
                    <IncomeReportOverview
                        generateMonthsArray={generateMonthsArray}
                        generate12MonthsChart={generate12MonthsChart}
                        monthly_income_data={monthly_income_data}
                    />
                </div>
                <div className="bg-light rounded-lg w-full h-[300px] md:h-[375px] px-4 md:px-8 py-4 col-span-2 ">
                    <ExpenseReportOverview
                        generateMonthsArray={generateMonthsArray}
                        generate12MonthsChart={generate12MonthsChart}
                        monthly_expense_data={monthly_expense_data}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
