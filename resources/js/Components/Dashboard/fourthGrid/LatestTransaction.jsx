import PrimaryButton from "@/Components/PrimaryButton";
import { formatDate, formatToRupiah } from "@/Helpers/helperFormat";
import { Link } from "@inertiajs/react";
import React from "react";
import { GrHistory } from "react-icons/gr";
import { TbArrowNarrowRight, TbMoodEmpty } from "react-icons/tb";
import { Table } from "reactstrap";

const ViewTable = ({ transaction }) => {
    return (
        <tr className="bg-background py-2 mt-1 rounded-xl w-full flex justify-between items-center text-dark">
            <td className="py-2 px-4 text-center w-[300px]">
                {transaction?.category?.category_name}
            </td>
            <td className="py-2 px-4 text-center  w-[300px]">
                {transaction?.transaction_note}
            </td>
            <td className="py-2 px-4 text-center  w-[250px]">
                {formatToRupiah(transaction?.transaction_amount)}
            </td>
            <td className="py-2 px-4 text-center w-[250px]">
                {formatDate(transaction?.transaction_date)}
            </td>
        </tr>
    );
};

const LatestTransaction = ({ transactions }) => {
    return (
        <div>
            <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                    <div className="p-2 bg-primary text-light rounded-md">
                        <GrHistory size={24} />
                    </div>
                    <span className="text-primary header-5">
                        Latest Transaction
                    </span>
                </div>
                <Link href={route("transactionPage")}>
                    <PrimaryButton className="flex items-center gap-2 py-2 px-6 bg-primary text-light rounded-md">
                        View More <TbArrowNarrowRight />
                    </PrimaryButton>
                </Link>
            </div>
            <Table className="min-w-full rounded-xl ">
                <thead>
                    <tr className=" mt-4 rounded-xl w-full flex justify-between items-center bg-background ">
                        <th className="py-2 px-4 text-center w-[300px]  button">
                            Transaction Category
                        </th>
                        <th className="py-2 px-4 text-center w-[300px] button">
                            Note
                        </th>
                        <th className="py-2 px-4 text-center w-[250px] button">
                            Amount
                        </th>
                        <th className="py-2 px-4 text-center w-[250px] button">
                            Date
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {transactions && transactions.length !== 0 ? (
                        transactions
                            .slice(0, 5)
                            .map((transaction, index) => (
                                <ViewTable
                                    key={transaction.id}
                                    transaction={transaction}
                                    index={index}
                                />
                            ))
                    ) : (
                        <div className="flex flex-col w-full h-full  justify-center items-center text-primary  mt-20 rounded-xl gap-4">
                            <div className="text-[64px] md:text-[84px] lg:text-[110px]">
                                <TbMoodEmpty />
                            </div>
                            <div className="header-5 md:header-3">
                                No Transactions Yet...
                            </div>
                        </div>
                    )}
                </tbody>
            </Table>
        </div>
    );
};

export default LatestTransaction;
