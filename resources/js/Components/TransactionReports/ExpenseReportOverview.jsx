import {
    generateMonthsArray,
    generateMonthsChart,
    useChartMargin,
} from "@/Helpers/chartsHelper";
import {
    formatYAxis,
    parseMonth,
    RupiahFormatTooltip,
} from "@/Helpers/helperFormat";
import CustomTooltip from "@/Helpers/Tooltip";
import React from "react";
import { CgNotes } from "react-icons/cg";
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

const ExpenseReportOverview = ({ monthly_expense_data }) => {
    const monthsArr = generateMonthsArray();
    const newMonthlydata = monthly_expense_data.map((mon) => ({
        ...mon,
        total_amount: Math.abs(mon.total_amount),
        monthName: parseMonth(mon.month),
    }));

    const data = generateMonthsChart(monthsArr, newMonthlydata);
    return (
        <React.Fragment>
            <div className="flex w-full justify-between">
                <div className="flex items-center gap-2 ">
                    <div className="header-5">
                        {" "}
                        <CgNotes />
                    </div>
                    <div className="sub-body md:button lg:header-5">
                        Expense Report Overview{" "}
                        <CustomTooltip content="Expense Report Overview presents the monthly expense amount from all expense categories  over the past 12 months, starting from the current month." />
                    </div>
                </div>
            </div>
            <div className="flex justify-center h-full pt-4 w-full md:w-[100%] mx-auto">
                <ResponsiveContainer width="100%" height="95%">
                    <LineChart
                        width={500}
                        height={300}
                        data={data}
                        margin={
                            useChartMargin()
                        }
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="monthName" />
                        <YAxis tickFormatter={formatYAxis} />

                        <Tooltip content={<RupiahFormatTooltip />} />

                        <Line
                            type="monotone"
                            dataKey="total_amount"
                            stroke="#C02317"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </React.Fragment>
    );
};

export default ExpenseReportOverview;
