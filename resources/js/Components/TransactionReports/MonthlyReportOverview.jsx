import CustomTooltip from "@/Helpers/Tooltip";
import { useChartMargin } from "@/Helpers/chartsHelper";
import { formatYAxis, RupiahFormatTooltip } from "@/Helpers/helperFormat";
import React from "react";
import { CgNotes } from "react-icons/cg";
import { TbMoodEmpty } from "react-icons/tb";
import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import CustomSelectInput from "../CustomInput/CustomSelectInput";

const FormatXAxis = ({ x, y, payload }) => {
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
            {
            lines.map((line, index) => (
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

const BarColor = (props) => {
    const { x, y, width, height, index } = props;
    const fillColor = index % 2 === 1 ? "#CAD8E7" : "#2D5074";

    if (isNaN(x) || isNaN(y) || isNaN(width) || isNaN(height)) {
        return null;
    }

    return <rect x={x} y={y} width={width} height={height} fill={fillColor} />;
};

const MonthlyReportOverview = ({
    category_transactions,
    walletOptions,
    currWallet,
    monthValue,
    monthName,
    getCurrentMonth,
    setData,
    setWait,
    MonthlyReportData,
}) => {
    return (
        <React.Fragment>
            <div className="flex flex-col md:flex-row w-full justify-between gap-4 ">
                <div className="flex items-center gap-2 ">
                    <div className="header-5">
                        <CgNotes />
                    </div>
                    <div className="sub-body md:button lg:header-5">
                        Monthly Report Overview{" "}
                        <CustomTooltip content="Monthly Report Overview displays the total expenses for each category in the selected month." />
                    </div>
                </div>
                <div className="flex items-center gap-2 ">
                    <div className="w-32 lg:w-52 text-[10px] lg:body">
                        <CustomSelectInput
                            placeholder="Select Wallet"
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
                            placeholder="Select Month"
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
            <div className="flex justify-center h-full pt-2 md:pt-8 w-full md:w-[95%] mx-auto">
                {category_transactions && category_transactions.length !== 0 ? (
                    <div className="w-[1200px] md:w-full overflow-x-scroll h-[90%] md:h-full custom-scrollbar">
                        <ResponsiveContainer width={1200} height="85%">
                            <BarChart
                                width={1200}
                                height={240}
                                data={MonthlyReportData}
                                margin={useChartMargin()}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    className=""
                                    dataKey="name"
                                    tick={<FormatXAxis />}
                                    interval={0}
                                />
                                <YAxis
                                    className="m-0 p-0 text-[8px] md:text-[10px] w-[30px] md:w-[50px] "
                                    width={40}
                                    tickFormatter={formatYAxis}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#EBF0F6",
                                        borderRadius: "8px",
                                        color: "#2D5074",
                                    }}
                                    content={<RupiahFormatTooltip />}
                                />
                                <Bar dataKey="value" shape={<BarColor />} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                ) : (
                    <div className="flex flex-col w-full h-full justify-center items-center text-primary rounded-xl gap-4">
                        <div className="text-[64px] md:text-[84px] lg:text-[110px]">
                            <TbMoodEmpty />
                        </div>
                        <div className="header-5 md:header-3">
                            You have no expenses for this month
                        </div>
                    </div>
                )}
            </div>
        </React.Fragment>
    );
};

export default MonthlyReportOverview;
