import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { formatDate, formatToRupiah } from "@/Helpers/helperFormat";
import { Head, Link, useForm } from "@inertiajs/react";

import { BiSolidPencil } from "react-icons/bi";
import { FaRegTrashCan } from "react-icons/fa6";
import { HiMiniEllipsisVertical } from "react-icons/hi2";
import { Button, Table } from "reactstrap";

import HeaderInfo from "@/Components/RecurringTransaction/HeaderInfo";
import { showErrorModal, showSuccessModal } from "@/Helpers/utils";
import { Formik } from "formik";

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
    currMonth,
}) {
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
                <Formik onSubmit={close} enableReinitialize={true}>
                    {({ setFieldValue, values }) => (
                        <>
                            <div className="bg-white pt-3 mt-1 rounded-xl px-4 lg:px-10 flex flex-col-reverse md:flex-row md:justify-between"></div>
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
                    )}
                </Formik>
            </div>
        </AuthenticatedLayout>
    );
}
