import { RupiahFormatTooltip } from "@/Helpers/helperFormat";
import {
    Bar,
    BarChart,
    Cell,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

const ShowNetIncomeOverview = ({
    current_month_net_income,
    last_month_net_income,
}) => {
    const data = [
        {
            name: "Current Net Income",
            value: current_month_net_income,
        },
        {
            name: "Last Month Net Income",
            value: last_month_net_income,
        },
    ];

    return (
        <div className="flex justify-center h-full  w-full md:w-[95%] relative z-50">
            <ResponsiveContainer width="100%" height="75%">
                <BarChart
                    layout="vertical"
                    width={500}
                    height={120}
                    data={data}
                    margin={{
                        top: 20,
                        right: 0,
                        bottom: 20,
                        left: 0,
                    }}
                    barCategoryGap="10%"
                >
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "#EBF0F6",
                            borderRadius: "8px",

                            color: "#2D5074",
                        }}
                        content={<RupiahFormatTooltip />}
                    />

                    <XAxis type="number" className="sub-body lg:body" hide />
                    <YAxis
                        tickLine={false}
                        type="category"
                        width={90}
                        dataKey="name"
                        tick={{ fill: "#2D5074" }}
                        className="sub-body lg:body"
                    />
                    <Bar stackId="a" dataKey="value" barSize={40}>
                        {data.map((entry, index) => (
                            <Cell
                                fill={entry.value < 0 ? "#8B1E1E" : "#2D5074"}
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ShowNetIncomeOverview;
