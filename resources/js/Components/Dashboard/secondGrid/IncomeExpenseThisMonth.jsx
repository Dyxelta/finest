import { formatToRupiah } from "@/Helpers/helperFormat";

const IncomeExpenseThisMonth = ({ type, amount, icon }) => {
    return (
        <div className="p-2 w-full h-full flex flex-col z-50 relative">
            <div className="flex justify-end w-full  gap-2 p-2">
                <div className=" flex items-center justify-center text-[14px] md:text-[24px] ">
                    {icon}
                </div>
                <div className=" w-full m-auto button ">{type} This Month</div>
            </div>
            <div className="flex flex-col gap-2 p-2">
                <div className="sub-body-bold xl:button">
                    {formatToRupiah(amount)}
                </div>
            </div>
        </div>
    );
};

export default IncomeExpenseThisMonth;
