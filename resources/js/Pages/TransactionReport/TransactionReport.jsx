import ExpenseReportOverview from "@/Components/TransactionReports/ExpenseReportOverview";
import IncomeReportOverview from "@/Components/TransactionReports/IncomeReportOverview";
import MonthlyReportOverview from "@/Components/TransactionReports/MonthlyReportOverview";
import SummaryReportOverview from "@/Components/TransactionReports/SummaryReportOverView";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Head, useForm } from "@inertiajs/react";
import moment from "moment";
import { useEffect, useState } from "react";
import { CgNotes } from "react-icons/cg";

const generateMonthsArray = () => {
    const monthsArray = [];
    const currentMonth = moment().month() + 1; // Get current month (1-12)
    const currentYear = moment().year(); 
    for (let i = 0; i < 12; i++) {
        const month = currentMonth - i;
        const year = currentYear - Math.floor((11 - month) / 12);
        const adjustedMonth = (month + 12) % 12 || 12; 
        const monthName = moment(`${year}-${adjustedMonth}`, "YYYY-M").format("MMM");
    
        monthsArray.push({
            total_amount: 0,
            month:month,
            monthName: monthName,
        });
      }
    
    
    return monthsArray.reverse();
};

const fillMissingMonths = (monthsArray, data) => {
    return monthsArray.map((mon) => {
        const matchingData = data.find(
            (item) => item.month === mon.month
        );
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
    summary_report_data,
    wallets,
}) {

    const { post, get, setData } = useForm({
        month: currMonth,
        wallet_name: currWallet?.wallet_name,
    });

    const tempData =
        category_transactions?.map((cat) => ({
            name: cat?.category?.category_name,
            value: Math.abs(cat?.total_amount),
        })) || [];

    const lengthEmpty = 18 - tempData.length;

    const MonthlyReportData = [...tempData, ...Array(lengthEmpty).fill({})];

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

    const parseMonth = (id) => {
        const monthValues = parseInt(id) ?? new Date().getMonth() + 1;
        const currentYears = new Date().getFullYear();
        return new Date(currentYears, monthValues - 1).toLocaleString(
            "default",
            { month: "short" }
        );
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
                <div className="bg-light rounded-lg w-full h-[375px] px-2 md:px-4 py-2 col-span-2 ">
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
                        CustomTick
                        CustomBar
                    />
                </div>

                <div className="bg-light rounded-lg w-full h-[375px] px-4 md:px-8 py-4">
                    <SummaryReportOverview
                        totalExpense={500000}
                        totalIncome={500000}
                        note={
                            "Oh no! looks like you went overboard with your expense, please make sure to properly balance your expense and income "
                        }
                    />
                </div>
                <div className="bg-light rounded-lg w-full h-[375px] px-4 md:px-8 py-4">
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
                    </div>
                    <div className="flex justify-center h-full pt-2 w-full md:w-[95%] mx-auto"></div>
                </div>
                <div className="bg-light rounded-lg w-full h-[375px] px-4 md:px-8 py-4 col-span-2 ">
                    <IncomeReportOverview 
                        generateMonthsArray={generateMonthsArray}
                        fillMissingMonths={fillMissingMonths}
                        monthly_income_data={monthly_income_data}
                        parseMonth={parseMonth}
                    />
                </div>
                <div className="bg-light rounded-lg w-full h-[375px] px-4 md:px-8 py-4 col-span-2 ">
                    <ExpenseReportOverview 
                        generateMonthsArray={generateMonthsArray}
                        fillMissingMonths={fillMissingMonths}
                        monthly_expense_data={monthly_expense_data}
                        parseMonth={parseMonth}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
