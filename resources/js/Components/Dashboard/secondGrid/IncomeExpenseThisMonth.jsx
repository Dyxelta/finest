import { formatToRupiah } from "@/Helpers/helperFormat";
import React from "react";
import { BsGraphUpArrow } from "react-icons/bs";

const IncomeExpenseThisMonth = ({ type, amount, icon }) => {
    return (
        <div className="p-2 w-full h-full flex flex-col justify-between z-50 relative">
            <div className="flex flex-col gap-2 p-2">
                <div className="body ">{type} This Month</div>
                <div className="button">{formatToRupiah(amount)}</div>
            </div>
            <div className="flex button justify-end w-full">
                <div className="bg-light rounded-full px-6 py-2 w-full text-center">
                    {type}
                </div>
                <div className="py-2 px-3 bg-light rounded-full  flex items-center justify-center text-[20px]">
                    {icon}
                </div>
            </div>
        </div>
    );
};

export default IncomeExpenseThisMonth;
