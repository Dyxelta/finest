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

const IncomeReportOverview = ({ monthly_income_data }) => {
    const monthsArr = generateMonthsArray();
    const newMonthlydata = monthly_income_data.map((mon) => ({
        ...mon,

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
                        Income Report Overview{" "}
                        <CustomTooltip content="Income Report Overview presents the monthly income amount from all income categories  over the past 12 months, starting from the current month." />
                    </div>
                </div>
            </div>
            <div className="flex justify-center h-full pt-4 w-full md:w-[100%] mx-auto">
                <div className="w-[1200px] overflow-x-scroll">
                    <ResponsiveContainer width={1200} height="95%">
                        <LineChart
                            width={1200}
                            height={300}
                            data={data}
                            margin={useChartMargin()}
                        >
                            <Tooltip content={<RupiahFormatTooltip />} />
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="monthName" />
                            <YAxis
                                tickFormatter={formatYAxis}
                                className="text-[9px] "
                            />
                            <Line
                                type="monotone"
                                dataKey="total_amount"
                                stroke="#2D7030"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </React.Fragment>
    );
};

export default IncomeReportOverview;
