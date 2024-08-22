import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { formatDate, formatToRupiah } from "@/Helpers/helperFormat";
import { Head, Link, useForm } from "@inertiajs/react";

import { BiSolidPencil } from "react-icons/bi";
import { FaRegTrashCan } from "react-icons/fa6";
import { HiMiniEllipsisVertical } from "react-icons/hi2";
import { Button, Table } from "reactstrap";

import HeaderInfo from "@/Components/RecurringTransaction/HeaderInfo";
import { showErrorModal, showSuccessModal } from "@/Helpers/utils";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { CgNotes } from "react-icons/cg";
import PrimaryButton from "@/Components/PrimaryButton";
import { FiPlus } from "react-icons/fi";
import "boxicons";

const ViewTable = ({ transaction, onOpen, isOpen, index, pagination }) => {
    const { delete: destroy, data, setData } = useForm({ id: "" });

    const deleteTransaction = (id) => {
        const onClose = () => {
            destroy(route("deleteTransaction", id), {
                onSuccess: () => {
                    showSuccessModal(
                        "Success",
                        "Transaction has been deleted successfully"
                    );
                },
                onError: () => {
                    showErrorModal("Error", "Something went wrong");
                },
            });
        };

        showErrorModal(
            "Error",
            "Are you sure you want to delete this Transaction?",
            () => onClose(),
            undefined,
            true,
            true
        );
    };
    return (
        <tr className="bg-white pt-2 mt-1 rounded-xl w-full flex justify-between items-center text-primary">
            <td className="py-2 px-4 text-center w-[100px]">
                {index + (pagination - 1) * 10 + 1}
            </td>
            <td className="py-2 px-4 text-center w-[300px]">
                {transaction?.category?.category_name}
            </td>
            <td className="py-2 px-4 text-center  w-[300px]">
                {transaction?.transaction_note}
            </td>
            <td className="py-2 px-4 text-center  w-[200px]">
                {formatToRupiah(transaction?.transaction_amount)}
            </td>
            <td className="py-2 px-4 text-center w-[150px]">
                {formatDate(transaction?.transaction_date)}
            </td>
            <td className="py-2 px-4 text-center w-[150px]">
                <button onClick={() => onOpen(transaction.id)}>
                    <HiMiniEllipsisVertical size={20} />
                </button>
                {isOpen && (
                    <div
                        className={`absolute z-50 w-[100px] right-[25px] transition-opacity duration-300 delay-300 ${
                            isOpen
                                ? "opacity-100"
                                : "opacity-0 pointer-events-none"
                        }`}
                    >
                        <div className=" bg-white border rounded-md flex flex-col  shadow-lg">
                            <Link
                                href={route(
                                    "editTransactionPage",
                                    transaction?.id
                                )}
                            >
                                <Button
                                    type="button"
                                    className="py-2 px-2 w-full flex items-center gap-2 hover:bg-gray-100 hover:opacity-70 duration-300 transition-all sub-body-14"
                                >
                                    <BiSolidPencil size={16} /> Edit
                                </Button>
                            </Link>
                            <hr />
                            <Button
                                className="py-2 px-2 w-full flex items-center gap-2 text-expense hover:bg-gray-100 hover:opacity-70 duration-300 transition-all sub-body-14"
                                onClick={() => {
                                    setData("id", transaction?.id);
                                    deleteTransaction(transaction?.id);
                                }}
                            >
                                <FaRegTrashCan size={16} /> Delete
                            </Button>
                        </div>
                    </div>
                )}
            </td>
        </tr>
    );
};

export default function TransactionRecordsPage({
    auth,
    transactions,
    wallets,
    expenseCategories,
    incomeCategories,
}) {
    const [category, setCategory] = useState(0);

    const carousel = useRef(null);

    useEffect(() => {
        const handleScroll = (e) => {
            if (carousel.current) {
                e.preventDefault();

                carousel.current.scrollLeft += e.deltaY;
            }
        };


        if (carousel.current) {
            carousel.current.addEventListener("wheel", handleScroll);
        }

        return () => {
            if (carousel.current) {
                carousel.current.removeEventListener("wheel", handleScroll);
            }
        };
    }, []);

    const mergedCategories = [...expenseCategories, ...incomeCategories];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Transaction Records
                </h2>
            }
        >
            <Head title="Transaction Records" />
            <div className="w-full">
                <HeaderInfo transactions={transactions} wallets={wallets} />

                <>
                    <div className=" pt-3 mt-1  w-full  flex flex-col-reverse md:flex-row md:justify-between overflow-hidden">
                        <motion.div
                            ref={carousel}
                            className="w-full flex items-center gap-4 overflow-x-auto whitespace-nowrap custom-scrollbar "
                        >
                            {mergedCategories.map((cat, index) => (
                                <div
                                    key={index}
                                    className={`px-3 py-2 ${
                                        category === index
                                            ? "bg-white"
                                            : "bg-gray-300"
                                    } flex items-center min-w-[220px] rounded-t-xl gap-2`}
                                    onClick={() => setCategory(index)}
                                >
                                    <div
                                        className={`p-2 ${
                                            category === index
                                                ? " bg-primary text-light"
                                                : "bg-lighter-primary text-primary "
                                        } flex justify-center items-center w-[40px] h-[40px] rounded-md`}
                                    >
                                        <box-icon
                                            name={cat.icon}
                                            type="solid"
                                            color={
                                                category === index
                                                    ? "white"
                                                    : "#2D5074"
                                            }
                                        ></box-icon>
                                    </div>
                                    <div>
                                        <div className="text-primary">
                                            {cat.category_name}
                                        </div>
                                        <div className="text-grey sub-body-14">
                                            {cat.category_is_income
                                                ? "Income"
                                                : "Expense"}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                    <div className="w-full bg-white px-4 md:px-6 py-3 flex justify-between rounded-b-xl">
                        <div className="flex items-center gap-3">
                            <div className="bg-primary p-3 header-5 text-light rounded-md w-fit">
                                <CgNotes />
                            </div>
                            <div className="text-primary header-5">
                                Transaction Details
                            </div>
                        </div>
                        <div>
                            <PrimaryButton
                                className=" w-full gap-2 rounded-lg py-3 px-1 sm:px-4 md:px-8 button flex items-center"
                                type="submit"
                            >
                                <div className="text-[14px] md:text-[20px]">
                                    <FiPlus />
                                </div>
                                <div className="hidden md:block button">
                                    Add Recurring Transaction
                                </div>
                            </PrimaryButton>
                        </div>
                    </div>
                    <div className="w-full relative">
                        <div className="overflow-x-auto ">
                            <Table className="min-w-full rounded-xl ">
                                <thead>
                                    <tr className="bg-white pt-2 mt-1 rounded-xl w-full flex justify-between items-center text-primary">
                                        <th className="py-2 px-4 text-center w-[100px]  ">
                                            No
                                        </th>
                                        <th className="py-2 px-4 text-center w-[300px]  ">
                                            Transaction Category
                                        </th>
                                        <th className="py-2 px-4 text-center w-[300px] ">
                                            Note
                                        </th>
                                        <th className="py-2 px-4 text-center w-[200px]">
                                            Amount
                                        </th>
                                        <th className="py-2 px-4 text-center w-[150px]">
                                            Date
                                        </th>
                                        <th className="py-2 px-4 text-center w-[150px] ">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </Table>
                        </div>
                    </div>
                </>
            </div>
        </AuthenticatedLayout>
    );
}
