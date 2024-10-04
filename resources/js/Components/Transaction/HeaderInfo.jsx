import { formatToRupiah } from "@/Helpers/helperFormat";
import { Link } from "@inertiajs/react";
import { BsBoxArrowInLeft, BsBoxArrowRight } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";
import { GrTransaction } from "react-icons/gr";
import { MdHistory } from "react-icons/md";
import PrimaryButton from "../PrimaryButton";

const HeaderInfo = ({ transactions, selectedWallet }) => {

    const getHeaderInfoTransaction = selectedWallet === "All Wallet" ? transactions : transactions.filter((transaction) => transaction?.wallet?.id === selectedWallet )
    const calculateTotalIncome = (transactions) => {
        return getHeaderInfoTransaction.length !== 0
            ? formatToRupiah(
                  transactions
                      .filter(
                          (transaction) =>
                              transaction.category.category_is_income === 1
                      )
                      .reduce((total, transaction) => {
                          return total + transaction.transaction_amount;
                      }, 0)
              )
            : "No Transaction Yet";
    };

    const calculateTotalExpense = (transactions) => {
        return getHeaderInfoTransaction.length !== 0
            ? formatToRupiah(
                  transactions
                      .filter(
                          (transaction) =>
                              transaction.category.category_is_income === 0
                      )
                      .reduce((total, transaction) => {
                          return total + transaction.transaction_amount;
                      }, 0)
              )
            : "No Transaction Yet";
    };

    const arrayInfo = [
        {
            title: "Total Transactions",
            content: transactions?.length || "No Transaction Yet",
            icon: <GrTransaction />,
        },
        {
            title: "Total Income Amount",
            content: calculateTotalIncome(transactions || []),
            icon: <BsBoxArrowInLeft />,
        },
        {
            title: "Total Expense Amount",
            content: calculateTotalExpense(transactions || []),
            icon: <BsBoxArrowRight />,
        },
    ];

    return (
        <div className="w-full bg-light rounded-xl py-3">
            <div className="px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-0">
                {arrayInfo.map((arr, index) => (
                    <div className="flex  items-center gap-3" key={index}>
                        <div className="text-white bg-primary rounded-xl p-3 text-[16px] md:text-[26px]">
                            {arr?.icon}
                        </div>
                        <div className="text-primary">
                            <div className="body md:header-5-light">
                                {arr?.title}
                            </div>
                            <div className="button md:header-5">
                                {arr?.content}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <hr className="w-full border my-3" />
            <div className="flex  w-full justify-between">
                <div className="flex items-center px-2 md:px-4 gap-2 md:gap-3">
                    <div className="bg-lighter-primary rounded-xl text-primary p-2 md:p-3 text-[16px] md:text-[26px]">
                        <MdHistory />
                    </div>
                    <div className="">
                        <h1 className="body md:header-5 text-primary ">
                            Transaction Records
                        </h1>
                        <h6 className="sub-body-bold text-grey md:button">
                            View your past transaction here
                        </h6>
                    </div>
                </div>
                <Link
                    href={route("addTransaction")}
                    className="flex items-center px-2 md:px-4 gap-1 md:gap-3"
                >
                    <PrimaryButton
                        className=" w-full gap-2 rounded-lg py-3 px-1 sm:px-4 md:px-8 button flex items-center"
                        type="submit"
                    >
                        <div className="text-[14px] md:text-[20px]">
                            <FiPlus />
                        </div>
                        <div className="hidden md:block">Add Transaction</div>
                    </PrimaryButton>
                </Link>
            </div>
        </div>
    );
};

export default HeaderInfo;
