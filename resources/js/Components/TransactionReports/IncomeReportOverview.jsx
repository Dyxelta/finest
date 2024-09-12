import { formatToRupiah, formatYAxis, parseMonth, RupiahFormatTooltip } from "@/Helpers/helperFormat";
import React from "react";
import { CgNotes } from "react-icons/cg";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

const IncomeReportOverview = ({
    generateMonthsArray,
    generate12MonthsChart,
    monthly_income_data,
}) => {
    const monthsArr = generateMonthsArray();
    const newMonthlydata = monthly_income_data.map((mon) => ({
        ...mon,

        monthName: parseMonth(mon.month),
    }));
    const data = generate12MonthsChart(monthsArr, newMonthlydata);

    return (
        <React.Fragment>
            <div className="flex w-full justify-between">
                <div className="flex items-center gap-2 ">
                    <div className="header-5">
                        {" "}
                        <CgNotes />
                    </div>
                    <div className="sub-body md:button lg:header-5">
                        Income Report Overview
                    </div>
                </div>
            </div>
            <div className="flex justify-center h-full pt-2 w-full md:w-[100%] mx-auto">
                <ResponsiveContainer width="100%" height="95%">
                    <LineChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 120,
                            bottom: 5,
                        }}
                    >
                        <Tooltip content={<RupiahFormatTooltip/>}/>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="monthName" />
                        <YAxis tickFormatter={formatYAxis} />
                        <Line
                            type="monotone"
                            dataKey="total_amount"
                            stroke="#317E3D"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </React.Fragment>
    );
};

export default IncomeReportOverview;
