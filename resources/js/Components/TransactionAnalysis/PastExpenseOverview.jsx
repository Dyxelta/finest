import {
    generate6MonthsArray,
    generateMonthsChart,
    useChartMargin,
} from "@/Helpers/chartsHelper";
import {
    formatYAxis,
    parseMonth,
    RupiahFormatTooltip,
} from "@/Helpers/helperFormat";
import CustomTooltip from "@/Helpers/Tooltip";
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

const PastExpenseOverview = ({ monthly_total_transaction }) => {
    console.log(monthly_total_transaction);
    const monthsArr = generate6MonthsArray();
    const newMonthlydata = monthly_total_transaction.map((mon) => ({
        ...mon,
        total_amount: Math.abs(mon.total_amount),
        monthName: parseMonth(mon.month),
    }));

    const data = generateMonthsChart(monthsArr, newMonthlydata);

    return (
        <div className="bg-light p-2 md:p-4 rounded-md text-primary">
            <div className="flex w-full justify-between">
                <div className="flex items-center gap-2 ">
                    <div className="header-5">
                        {" "}
                        <CgNotes />
                    </div>
                    <div className="sub-body md:button lg:header-5">
                        Past Expense Overview{" "}
                        <CustomTooltip content="Past Expense Overview shows the information of the amount of expense based of the expense transaction for each month for the past 6 month" />
                    </div>
                </div>
            </div>
            <div className="flex justify-center h-[350px] pt-4 w-full md:w-[100%] mx-auto">
                <div className="w-[1200px] overflow-x-scroll custom-scrollbar">
                    <ResponsiveContainer width={1200} height="95%">
                        <LineChart
                            width={1200}
                            height={300}
                            data={data}
                            margin={useChartMargin()}
                        >
                            <Tooltip content={<RupiahFormatTooltip />} />
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="monthName"
                                className="text-[10px] hidden lg:block"
                            />
                            <YAxis
                                tickFormatter={formatYAxis}
                                className="text-[9px] hidden lg:block"
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
        </div>
    );
};

export default PastExpenseOverview;
