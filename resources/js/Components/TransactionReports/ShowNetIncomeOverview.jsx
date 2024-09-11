import { formatToRupiah } from "@/Helpers/helperFormat";
import {
    ComposedChart,
    Line,
    Area,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    BarChart,
} from "recharts";
const CustomizedLabel = (props) => {
    const { x, y, fill, value } = props;
    return (
        <text
            x={x+10}
            y={y+25}
            fontSize="16"
            fontFamily="sans-serif"
            fill="#ffffff"
            textAnchor="start"
        >
            {formatToRupiah(value)}
        </text>
    );
};

const data = [
    {
        name: "Current Net Income",
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: "Last Month Net Income",
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
];

const ShowNetIncomeOverview = () => {
    return (
        <div className="flex justify-center h-full pt-2 w-full md:w-[95%] ">
            <ResponsiveContainer width="100%" height="70%">
                <BarChart
                    layout="vertical"
                    width={500}
                    height={100}
                    data={data}
                    margin={{
                        top: 20,
                        right: 0,
                        bottom: 20,
                        left: 0,
                    }}
                    barCategoryGap="10px"
                >
                    <XAxis type="number" className="sub-body lg:body" hide/>
                    <YAxis
                    
                        tickLine={false}
                        type="category"
                        width={90}
                        dataKey="name"
                        className="sub-body lg:body"
                   
                    />

                    <Bar dataKey="pv" barSize={40} fill="#2D5074"  label={<CustomizedLabel />}/>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ShowNetIncomeOverview;
