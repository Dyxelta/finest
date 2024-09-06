import React from "react";
import { CgNotes } from "react-icons/cg";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const IncomeReportOverview = ({
    generateMonthsArray,
    fillMissingMonths,
    monthly_income_data,
    parseMonth
}) => {
    const monthsArr = generateMonthsArray();
    const newMonthlydata = monthly_income_data.map((mon) => ({
        ...mon, 
        monthName: parseMonth(mon.month)
    }))
    console.log(newMonthlydata,"uifhsdghuisdfuihogsfd")
    const data = fillMissingMonths(monthsArr, newMonthlydata);
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
            <div className="flex justify-center h-full pt-2 w-full md:w-[95%] mx-auto">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                 

                        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </React.Fragment>
    );
};

export default IncomeReportOverview;
