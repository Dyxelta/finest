import {
    renderPercentage,
    usePieChartInnerRadius,
    usePieChartOuterRadius,
} from "@/Helpers/chartsHelper";
import { RupiahFormatTooltipPieChart } from "@/Helpers/helperFormat";
import CustomTooltip from "@/Helpers/Tooltip";
import { useState } from "react";
import { CgNotes } from "react-icons/cg";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const CashflowGraph = ({
    current_month_total_income,
    current_month_total_expense,
}) => {
    const data = [
        { name: "Income Overview", value: current_month_total_income },
        {
            name: "Expense Overview",
            value: Math.abs(current_month_total_expense),
        },
    ];

    const [activeIndex, setActiveIndex] = useState(null);

    const onPieEnter = (_, index) => {
        setActiveIndex(index);
    };

    const COLORS = ["#2D7030", "#A52A2A"];
    return (
        <div className="py-1 px-4 z-50 relative text-primary">
            <div className="flex w-full z-50 items-center relative">
                <div className="flex items-center gap-1 lg:gap-2 mt-2">
                    <div className="button lg:header-5 ">
                        {" "}
                        <CgNotes />
                    </div>
                    <div className="button lg:header-5 py-2">
                        Cashflow Graph{" "}
                        <CustomTooltip content="Cashflow Graph display the graph percentage of income and expense of this month" />
                    </div>
                </div>
            </div>
            <div className="flex ">
                <div className="w-2/3 p-0">
                    <ResponsiveContainer width="100%" height={180}>
                        <PieChart>
                            <Pie
                                dataKey="value"
                                isAnimationActive={false}
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={usePieChartInnerRadius()}
                                outerRadius={usePieChartOuterRadius()}
                                labelLine={false}
                                paddingAngle={2}
                                minAngle={6}
                                label={(props) =>
                                    renderPercentage({
                                        ...props,
                                        activeIndex,
                                    })
                                }
                                onMouseEnter={onPieEnter}
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
        </div>
    );
};

export default CashflowGraph;
