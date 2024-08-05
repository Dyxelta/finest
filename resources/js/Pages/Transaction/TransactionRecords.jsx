import HeaderInfo from "@/Components/Transaction/HeaderInfo";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import PaginationTransaction from "@/Components/Transaction/PaginationTransaction";
import { formatDate, formatToRupiah } from "@/Helpers/helperFormat";
import { Head, useForm } from "@inertiajs/react";
import { Option, Select } from "@material-tailwind/react";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { BiSolidPencil } from "react-icons/bi";
import { FaRegTrashCan } from "react-icons/fa6";
import { HiMiniEllipsisVertical } from "react-icons/hi2";
import { TbMoodEmpty } from "react-icons/tb";
import { Table } from "reactstrap";

const ViewTable = ({ transaction, onOpen, isOpen, index, pagination }) => {
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
            <td className="py-2 px-4 text-center  w-[150px]">
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
                        className={`absolute z-50 w-[100px] right-[45px] transition-opacity duration-300 delay-300 ${
                            isOpen
                                ? "opacity-100"
                                : "opacity-0 pointer-events-none"
                        }`}
                    >
                        <div className="py-2 bg-white border rounded-md flex flex-col gap-2 shadow-lg">
                            <div className="px-2 w-full flex items-center gap-2">
                                <BiSolidPencil size={16} /> Edit
                            </div>
                            <hr />
                            <div className="px-2 w-full flex items-center gap-2 text-expense">
                                <FaRegTrashCan size={16} /> Delete
                            </div>
                        </div>
                    </div>
                )}
            </td>
        </tr>
    );
};

export default function TransactionRecordsPage({ auth, transactions, wallets, currMonth }) {
    const [pagination, setPagination] = useState(1);
    const [category, setCategory] = useState("Income");
    const [selectedWallet, setSelectedWallet] = useState("All1");

    let getCurrentStartSlice = 1 * ((pagination - 1) * 10);
    let getCurrentEndSlice = pagination * 10;

    const allWallet = {
        id: "All1",
        wallet_name: "All Wallet",
    };
    const initialWallets = [allWallet, ...wallets];

    const { post, get, setData, data } = useForm({
        month: "",
    });

    const monthValue = parseInt(currMonth) ?? new Date().getMonth() + 1;

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
                month: monthName,
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

    const getFilteredTransactions = transactions.filter((transaction) =>
        selectedWallet === "All1"
            ? transaction &&
              (category === "Income"
                  ? transaction.category.category_is_income === 1
                  : transaction.category.category_is_income === 0)
            : transaction.wallet_id === selectedWallet &&
              (category === "Income"
                  ? transaction.category.category_is_income === 1
                  : transaction.category.category_is_income === 0)
    );

    const [wait, setWait] = useState(false);

    useEffect(() => {
        const waitSetMonthData = () => {
            if (wait) {
                try {
                    get(route("transactionPage"));
                } catch (error) {
                    console.error("Error setting data:", error);
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
                <HeaderInfo transactions={transactions} />
                <Formik
                    initialValues={{
                        defaultMonthValue: monthValue || "",
                        defaultWallet: "All1",
                    }}
                    onSubmit={close}
                    enableReinitialize={true}
                >
                    {({ setFieldValue, values }) => (
                        <>
                            <div className="bg-white pt-3 mt-1 rounded-xl px-4 lg:px-10 flex flex-col-reverse md:flex-row md:justify-between">
                                <div className="flex items-center gap-4 md:gap-8 relative w-fit px-2 mt-4 md:mt-0">
                                    <div
                                        className={`body md:header-5 pb-1 transition-all duration-500 ${
                                            category === "Income"
                                                ? "text-primary"
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
                                        className={`body md:header-5 pb-1 transition-all duration-500 ${
                                            category === "Expense"
                                                ? "text-primary"
                                                : "hover:text-grey"
                                        }`}
                                        onClick={() => {
                                            setCategory("Expense");
                                            setPagination(1);
                                        }}
                                    >
                                        Expense
                                    </div>
                                    <div
                                        className={`w-1/2 absolute bottom-0 left-0 ${
                                            category === "Income"
                                                ? "translate-x-0"
                                                : "translate-x-full"
                                        } transition-transform border-primary border-2 rounded-md duration-300`}
                                    ></div>
                                </div>

                                <div className="pb-1 flex flex-col md:flex-row gap-2 justify-between ">
                                    <div className="w-52">
                                        <Select
                                            label="Select Month"
                                            value={monthValue}
                                            onChange={(val) => {
                                                setFieldValue(
                                                    "defaultMonthValue",
                                                    val
                                                );
                                                setData("month", val);
                                                setWait(true);
                                                setPagination(1);
                                            }}
                                        >
                                            {getCurrentMonth().map((month) => (
                                                <Option
                                                    key={month.value}
                                                    value={month.value}
                                                >
                                                    {month.month}
                                                </Option>
                                            ))}
                                        </Select>
                                    </div>

                                    <div className="w-52 mt-4 md:mt-0">
                                        <Select
                                            label="Select Wallet"
                                            value={values.defaultWallet}
                                            onChange={(val) => {
                                                setSelectedWallet(val);
                                                setPagination(1);
                                            }}
                                        >
                                            {initialWallets?.map(
                                                (wallet, index) => (
                                                    <Option
                                                        key={index}
                                                        value={wallet.id}
                                                    >
                                                        {wallet.wallet_name}
                                                    </Option>
                                                )
                                            )}
                                        </Select>
                                    </div>
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
                                                <th className="py-2 px-4 text-center w-[150px]">
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
                                            transactions.length !== 0 ? (
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
                                                <div className="flex flex-col w-full h-[300px] md:h-[400px] justify-center items-center text-primary bg-blue-gray-50 border mt-2 rounded-xl gap-4">
                                                    <div className="text-[64px] md:text-[84px] lg:text-[110px]">
                                                        <TbMoodEmpty />
                                                    </div>
                                                    <div className="header-5 md:header-3">
                                                        No Transactions Yet...
                                                    </div>
                                                </div>
                                            )}
                                            {getFilteredTransactions.length ===
                                                0 && (
                                                <div className="flex flex-col w-full h-[300px] md:h-[400px] justify-center items-center text-primary bg-blue-gray-50 border mt-2 rounded-xl gap-4">
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
                                <div className="w-full flex justify-end">
                                    <PaginationTransaction
                                        pageLength={Math.ceil(
                                            getFilteredTransactions.length / 10
                                        )}
                                        setPagination={setPagination}
                                        pagination={pagination}
                                    />
                                </div>
                            </div>
                        </>
                    )}
                </Formik>
            </div>
        </AuthenticatedLayout>
    );
}
