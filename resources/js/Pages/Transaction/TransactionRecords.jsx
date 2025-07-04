import HeaderInfo from "@/Components/Transaction/HeaderInfo";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import PaginationTransaction from "@/Components/Transaction/PaginationTransaction";
import { formatDate, formatToRupiah } from "@/Helpers/helperFormat";
import { Head, Link, useForm } from "@inertiajs/react";

import { Formik } from "formik";
import { useEffect, useState } from "react";
import { BiSolidPencil } from "react-icons/bi";
import { FaRegTrashCan } from "react-icons/fa6";
import { HiMiniEllipsisVertical } from "react-icons/hi2";
import { TbMoodEmpty } from "react-icons/tb";
import { Button, Table } from "reactstrap";

import CustomSelectInput from "@/Components/CustomInput/CustomSelectInput";
import { showErrorModal, showSuccessModal } from "@/Helpers/utils";

const ViewTable = ({ transaction, onOpen, isOpen, index, pagination }) => {
    const { delete: destroy } = useForm();

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
            "Warning",
            "Are you sure you want to delete this Transaction?",
            () => onClose(),
            undefined,
            true,
            true,
            true
        );
    };
    return (
        <tr className="bg-white pt-2 mt-1 rounded-xl w-full flex justify-between items-center text-primary">
            <td className="py-2 px-4 text-center w-[100px]">
                {index + (pagination - 1) * 10 + 1}
            </td>
            <td className="py-2 px-4 text-center w-[200px]">
                {transaction?.category?.category_name}
            </td>
            <td className="py-2 px-4 text-center  w-[300px]">
                {transaction?.transaction_note}
            </td>
            <td
                className={`py-2 px-4 text-center  w-[300px] ${
                    transaction?.transaction_amount < 0
                        ? "text-expense"
                        : "text-income"
                }`}
            >
                {formatToRupiah(transaction?.transaction_amount)}
            </td>
            <td className="py-2 px-4 text-center w-[150px]">
                {formatDate(transaction?.transaction_date)}
            </td>
            <td className="py-2 px-4 text-center w-[150px] relative">
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
    const [pagination, setPagination] = useState(1);
    const [category, setCategory] = useState("All");
    const [selectedWallet, setSelectedWallet] = useState("All Wallet");

    let getCurrentStartSlice = 1 * ((pagination - 1) * 10);
    let getCurrentEndSlice = pagination * 10;

    const allWallet = {
        id: "All Wallet",
        wallet_name: "All Wallet",
    };
    const initialWallets = [allWallet, ...wallets];

    const { get, setData } = useForm({
        month: "",
    });

    const monthValue = parseInt(currMonth) ?? new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const monthName = new Date(currentYear, monthValue - 1).toLocaleString(
        "default",
        { month: "long" }
    );

    const getCurrentMonth = () => {
        const currentMonth = new Date().getMonth();

        const months = [];
        for (let i = 0; i < 12; i++) {
            const month = currentMonth - i;
            const currentYear = new Date().getFullYear();
            const year = currentYear - Math.floor((11 - month) / 12);
            const adjustedMonth = (month + 12) % 12;
            const monthName = new Date(year, adjustedMonth).toLocaleString(
                "default",
                { month: "long" }
            );
            months.push({
                label: monthName,
                value: adjustedMonth + 1,
            });
        }

        return months;
    };

    const [openTransactionId, setOpenTransactionId] = useState(null);

    const handleOpen = (transactionId) => {
        setOpenTransactionId(
            transactionId === openTransactionId ? null : transactionId
        );
    };

    const getFilteredTransactions = transactions.filter((transaction) => {

        if (selectedWallet === "All Wallet" && category === "All") {
            return true;
        }

        if (selectedWallet !== "All Wallet" && category === "All") {
            return transaction.wallet_id === selectedWallet;
        }

        if (selectedWallet === "All Wallet") {
            return category === "Income"
                ? transaction.category.category_is_income === 1
                : transaction.category.category_is_income === 0;
        }
     
        return (
            transaction.wallet_id === selectedWallet &&
            (category === "Income"
                ? transaction.category.category_is_income === 1
                : transaction.category.category_is_income === 0)
        );
    });

    const walletOptions = initialWallets.map((wallet) => ({
        value: wallet?.id,
        label: wallet?.wallet_name,
    }));

    const [wait, setWait] = useState(false);

    useEffect(() => {
        const waitSetMonthData = () => {
            if (wait) {
                try {
                    get(route("transactionPage"));
                } catch (error) {
                    console.error("Error:", error);
                } finally {
                    setWait(false);
                }
            }
        };

        waitSetMonthData();
    }, [wait]);

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
                <HeaderInfo
                    transactions={transactions}
                    selectedWallet={selectedWallet}
                />
                <Formik
                    initialValues={{
                        defaultMonthValue: monthValue || "",
                        defaultWallet: "All Wallet",
                    }}
                    onSubmit={close}
                    enableReinitialize={true}
                >
                    {({ setFieldValue, values }) => (
                        <>
                            <div className="bg-white pt-3 mt-1 rounded-xl px-4 lg:px-10 flex flex-col-reverse md:flex-row md:justify-between">
                                <div className="flex items-center gap-4 md:gap-8 relative w-fit px-2 mt-4 md:mt-0">
                                    <div
                                        className={`flex-1 text-center body md:header-5 pb-1  cursor-pointer ${
                                            category === "All"
                                                ? "text-primary border-b-2 border-primary"
                                                : "hover:text-grey"
                                        }`}
                                        onClick={() => {
                                            setCategory("All");
                                            setPagination(1);
                                        }}
                                    >
                                        All
                                    </div>
                                    <div
                                        className={`flex-1 text-center body md:header-5 pb-1  cursor-pointer ${
                                            category === "Income"
                                                ? "text-primary border-b-2 border-primary"
                                                : "hover:text-grey"
                                        }`}
                                        onClick={() => {
                                            setCategory("Income");
                                            setPagination(1);
                                        }}
                                    >
                                        Income
                                    </div>
                                    <div
                                        className={`flex-1 text-center body md:header-5 pb-1  cursor-pointer ${
                                            category === "Expense"
                                                ? "text-primary border-b-2 border-primary"
                                                : "hover:text-grey"
                                        }`}
                                        onClick={() => {
                                            setCategory("Expense");
                                            setPagination(1);
                                        }}
                                    >
                                        Expense
                                    </div>
                 
                                
                                </div>

                                <div className="pb-1 flex flex-col md:flex-row gap-2 justify-between ">
                                    <div className="w-52">
                                        <CustomSelectInput
                                            placeholder={"Select Month"}
                                            defaultValue={
                                                values?.defaultMonthValue
                                                    ? {
                                                          value: monthValue,
                                                          label: monthName,
                                                      }
                                                    : {
                                                          value: "",
                                                          label: "",
                                                      }
                                            }
                                            options={getCurrentMonth()}
                                            onChange={(e) => {
                                                setFieldValue(
                                                    "defaultMonthValue",
                                                    e.value
                                                );
                                                setData("month", e.value);
                                                setWait(true);
                                                setPagination(1);
                                            }}
                                        />
                                    </div>

                                    <div className="w-52 mt-4 md:mt-0">
                                        <CustomSelectInput
                                            placeholder={"Select Wallet"}
                                            defaultValue={
                                                values?.defaultWallet
                                                    ? {
                                                          value: values?.defaultWallet,
                                                          label: values?.defaultWallet,
                                                      }
                                                    : {
                                                          value: "",
                                                          label: "",
                                                      }
                                            }
                                            options={walletOptions}
                                            onChange={(e) => {
                                                setSelectedWallet(e.value);
                                                setPagination(1);
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="w-full relative">
                                <div className="overflow-x-auto ">
                                    <Table className="min-w-full rounded-xl mb-20">
                                        <thead>
                                            <tr className="bg-white pt-2 mt-1 rounded-xl w-full flex justify-between items-center text-primary">
                                                <th className="py-2 px-4 text-center w-[100px]  ">
                                                    No
                                                </th>
                                                <th className="py-2 px-4 text-center w-[200px]  ">
                                                    Transaction Category
                                                </th>
                                                <th className="py-2 px-4 text-center w-[300px] ">
                                                    Note
                                                </th>
                                                <th className="py-2 px-4 text-center w-[300px]">
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
                                        <tbody>
                                            {transactions &&
                                            getFilteredTransactions.length !==
                                                0 ? (
                                                getFilteredTransactions
                                                    .slice(
                                                        getCurrentStartSlice,
                                                        getCurrentEndSlice
                                                    )
                                                    .map(
                                                        (
                                                            transaction,
                                                            index
                                                        ) => (
                                                            <ViewTable
                                                                key={
                                                                    transaction.id
                                                                }
                                                                transaction={
                                                                    transaction
                                                                }
                                                                onOpen={
                                                                    handleOpen
                                                                }
                                                                isOpen={
                                                                    openTransactionId ===
                                                                    transaction.id
                                                                }
                                                                index={index}
                                                                pagination={
                                                                    pagination
                                                                }
                                                            />
                                                        )
                                                    )
                                            ) : (
                                                <div className="flex flex-col w-full h-[300px] md:h-[400px] justify-center items-center text-primary border mt-2 rounded-xl gap-4">
                                                    <div className="text-[64px] md:text-[84px] lg:text-[110px]">
                                                        <TbMoodEmpty />
                                                    </div>
                                                    <div className="header-5 md:header-3">
                                                        No {category}{" "}
                                                        Transactions Yet...
                                                    </div>
                                                </div>
                                            )}
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                            <div className="w-full flex justify-end">
                                <PaginationTransaction
                                    pageLength={Math.ceil(
                                        getFilteredTransactions.length / 10
                                    )}
                                    setPagination={setPagination}
                                    pagination={pagination}
                                />
                            </div>
                        </>
                    )}
                </Formik>
            </div>
        </AuthenticatedLayout>
    );
}
