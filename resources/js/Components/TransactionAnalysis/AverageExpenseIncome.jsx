import { formatToRupiah } from "@/Helpers/helperFormat";
import CustomTooltip from "@/Helpers/Tooltip";
import { MdOutlinePriorityHigh } from "react-icons/md";

const AverageExpenseIncome = ({
    average_transaction_last_six_month,
    lowest_transaction,
    highest_transaction,
}) => {

    return (
        <div className="h-full w-full flex flex-col md:flex-row justify-between gap-2 text-light ">
            <div className="bg-light w-full flex-1 rounded-md flex ">
                <div className="bg-primary flex w-fit  px-3 items-center justify-center rounded-md ">
                    <MdOutlinePriorityHigh size={24} />
                </div>
                <div className="text-primary flex flex-col justify-center px-4 py-2">
                    <h1 className="button md:header-5">
                        Average Total Expense{" "}
                        <CustomTooltip content="Shows the information of the average total expense based on all expense transaction records." />
                    </h1>
                    <h2 className="body md:header-5-light">
                        {formatToRupiah(
                            Math.abs(average_transaction_last_six_month?.average_total) ?? 0
                        )}
                    </h2>
                </div>
            </div>
            <div className="bg-light w-full flex-1 rounded-md flex ">
                <div className="bg-primary flex w-fit   px-3 items-center justify-center rounded-md ">
                    <MdOutlinePriorityHigh size={24} />
                </div>
                <div className="text-primary flex  flex-col justify-center px-4 py-2">
                    <h1 className="button md:header-5">
                        Highest Total Expense{" "}
                        <CustomTooltip content="Shows the information of the highest total expense based on all expense transaction records." />
                    </h1>
                    <h2 className="body md:header-5-light">
                        {formatToRupiah(Math.abs(highest_transaction) ?? 0)}
                    </h2>
                </div>
            </div>
            <div className="bg-light w-full flex-1 rounded-md flex">
                <div className="bg-primary flex w-fit   px-3 items-center justify-center rounded-md">
                    <MdOutlinePriorityHigh size={24} />
                </div>
                <div className="text-primary flex flex-col justify-center px-4 py-2">
                    <h1 className="button md:header-5">
                        Lowest Total Expense{" "}
                        <CustomTooltip content="Shows the information of the lowest total expense based on all expense transaction records." />
                    </h1>
                    <h2 className="body md:header-5-light">
                        {formatToRupiah(Math.abs(lowest_transaction) ?? 0)}
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default AverageExpenseIncome;
