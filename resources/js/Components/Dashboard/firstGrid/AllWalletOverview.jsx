import { usePieChartInnerRadius, usePieChartOuterRadius } from "@/Helpers/chartsHelper";
import {
    formatToRupiah,
    RupiahFormatTooltipPieChart,
} from "@/Helpers/helperFormat";
import CustomTooltip from "@/Helpers/Tooltip";
import { FaWallet } from "react-icons/fa";
import {
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip
} from "recharts";

const AllWalletOverview = ({ total_balance, wallets }) => {
    const walletLength = wallets.length ?? 0;

    const walletChartData =
        wallets?.map((wallet) => ({
            value: wallet?.wallet_balance,
            name: wallet?.wallet_name,
            length: walletLength,
        })) ?? [];

    const COLORS = ["#2D5074", "#1B3046"];
    return (
        <div className="py-1 px-2 z-50 relative text-primary">
            <div className="button md:header-5 flex justify-between w-full font-roboto  z-50 mt-1">
                <div>
                    All Wallet Overview{" "}
                    <CustomTooltip content="All Wallet Overview displays balance of each wallet and the total balance of all wallet" />
                </div>
                <div className="p-2 bg-light rounded-full flex justify-center items-center">
                    <FaWallet />
                </div>
            </div>
            <div className="flex ">
                <div className="w-1/2 p-0">
                    <ResponsiveContainer width="100%" height={180}>
                        <PieChart>
                            <Pie
                                dataKey="length"
                                isAnimationActive={false}
                                data={walletChartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={usePieChartInnerRadius()}
                                outerRadius={usePieChartOuterRadius()}
                                labelLine={false}
                                paddingAngle={2}
                            >
                                {walletChartData.map((entry, index) => (
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
                <div className="w-1/2 flex flex-col mt-auto mb-4">
                    <div className="button ">Total Balance: </div>
                    <div className="sub-body lg:sub-body-14">
                        {formatToRupiah(total_balance)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllWalletOverview;
