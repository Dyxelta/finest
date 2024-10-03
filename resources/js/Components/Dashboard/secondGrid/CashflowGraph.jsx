import {
    formatToRupiah,
    RupiahFormatTooltipPieChart,
} from "@/Helpers/helperFormat";
import CustomTooltip from "@/Helpers/Tooltip";
import React from "react";
import { CgNotes } from "react-icons/cg";
import { FaWallet } from "react-icons/fa";
import {
    PieChart,
    Pie,
    Sector,
    Cell,
    ResponsiveContainer,
    Tooltip,
    LabelList,
} from "recharts";
import { DateSchema } from "yup";

const adjustDataForMinPercentage = (income, expense, minPercentage = 0.1) => {
    const total = income + expense;
    const minValue = total * minPercentage;

    let adjustedIncome = income;
    let adjustedExpense = expense;

    if (expense < minValue) {
        adjustedExpense = minValue;
        adjustedIncome = total - adjustedExpense;
    } else if (income < minValue) {
        adjustedIncome = minValue;
        adjustedExpense = total - adjustedIncome;
    }

    return [
        { name: "Income Graph Overview", value: adjustedIncome },
        { name: "Expense Graph Overview", value: adjustedExpense },
    ];
};

const CashflowGraph = ({
    current_month_total_income,
    current_month_total_expense,
}) => {
    const data = adjustDataForMinPercentage(
        current_month_total_income,
        Math.abs(current_month_total_expense)
    );
    const COLORS = ["#1B3046","#2D5074"];
    return (
        <div className="py-1 px-4 z-50 relative text-primary">
            <div className="flex justify-end">
                <div className="w-2/3 p-0">
                    <ResponsiveContainer width="100%" height={180}>
                        <PieChart>
                            <Pie
                                dataKey="value"
                                isAnimationActive={false}
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={55}
                                outerRadius={75}
                                labelLine={false}
                                paddingAngle={2}
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip
                                content={<RupiahFormatTooltipPieChart />}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className="flex w-full justify-end z-50 items-center relative">
                <div className="flex items-center gap-1 lg:gap-2 mt-2">
                    <div className="sub-body-bold lg:button    bg-light rounded-md px-4 py-2 m">
                        Net Income Overview{" "}
                        <CustomTooltip content="Net Income Overview displays the net income for the selected month, along with the previous month's figure." />
                    </div>
                    <div className="sub-body-bold lg:button  bg-light rounded-full p-3 ">
                        {" "}
                        <CgNotes />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CashflowGraph;
