import CategoryCard from "@/Components/Budget/CategoryCard";
import HeaderInfo from "@/Components/Budget/HeaderInfo";
import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Head, useForm } from "@inertiajs/react";

import AddBudgetPopup from "@/Components/Modal/Popup/AddBudgetPopup";
import EditBudgetPopup from "@/Components/Modal/Popup/EditBudgetPopup";
import "boxicons";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { FiPlus } from "react-icons/fi";
import { GrInfo } from "react-icons/gr";
import { HiPencil } from "react-icons/hi2";
import { LuDices } from "react-icons/lu";
import { PiChartPieSliceLight } from "react-icons/pi";
import { Button } from "reactstrap";
import { showErrorModal, showSuccessModal } from "@/Helpers/utils";
import { formatToRupiah } from "@/Helpers/helperFormat";
import { getRemainingDays } from "@/Helpers/remainingDays";
import {
    getProgressBarBorder,
    getProgressBarColor,
} from "@/Helpers/progressBar";
import { TbMoodEmpty } from "react-icons/tb";

export default function BudgetPage({
    auth,
    budgets,
    wallets,
    expenseCategories,
    incomeCategories,
    id_wallet,
}) {
    const [showAddBudgetPopup, setShowAddBudgetPopup] = useState(false);
    const [showEditBudgetPopup, setShowEditBudgetPopup] = useState(false);
    const [showInitialBudget, setShowInitialBudget] = useState(
        budgets?.length !== 0 ? budgets[0] : []
    );
    const selectedCategory =
        showInitialBudget !== null
            ? expenseCategories.find(
                  (cat) => showInitialBudget?.category_id === cat.id
              )
            : [];
    const [selectedWallet, setSelectedWallet] = useState();

    const categoryOptions = [
        {
            label: "Expense",
            options: expenseCategories
                .filter(
                    (category) =>
                        !budgets.some(
                            (budget) => category.id === budget.category_id
                        )
                )
                .map((expense) => ({
                    value: expense?.id,
                    label: expense?.category_name,
                })),
        },
    ];

    let totalExpenseBudgetAmount = budgets.reduce((total, budget) => {
        return total + budget?.budget_amount;
    }, 0);

    let totalIncomeBudgetAmount = budgets.reduce((total, budget) => {
        return total + budget?.budget_amount;
    }, 0);

    useEffect(() => {
        if (id_wallet) {
            const idwallet = parseInt(id_wallet);
            const matchingWallet =
                wallets.find((wallet) => wallet.id === idwallet) ?? wallets[0];
            setSelectedWallet(matchingWallet);
        }
    }, [id_wallet]);

    const carousel = useRef(null);
    const [length, setLength] = useState();

    useEffect(() => {
        if (progressBarRef.current) {
            const progressBarWidth = progressBarRef.current.offsetWidth;
            setLength(progressBarWidth);
        }

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

    const walletOptions = wallets.map((wallet) => ({
        value: wallet?.id,
        label: wallet?.wallet_name,
    }));

    const [isDeleting, setIsDeleting] = useState(false);

    const { delete: destroy, setData } = useForm({
        id: budgets?.length !== 0 ? budgets[0].id : "",
    });

    const handleDelete = () => {
        if (showInitialBudget.length !== 0) {
            if (!isDeleting) {
                const onClose = () => {
                    setIsDeleting(true);
                    destroy(route("deleteBudget", showInitialBudget.id), {
                        onSuccess: () => {
                            setShowInitialBudget(null);
                            setIsDeleting(false);
                            showSuccessModal(
                                "Success",
                                "Budget has been deleted successfully"
                            );
                        },
                        onError: () => {
                            setIsDeleting(false);
                            showErrorModal("Error", "Something went wrong");
                        },
                    });
                };

                showErrorModal(
                    "Warning",
                    "Are you sure you want to delete this budget?",
                    () => onClose(),
                    undefined,
                    true,
                    true,
                    true
                );
            } else {
                return;
            }
        } else {
            showErrorModal(
                "Error",
                "No Budget Selected!",
                undefined,
                undefined,
                true,
                true,
                false
            );
        }
    };

    const progressBarRef = useRef(null);
    const countRecommendedBudgetAmount = () => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();

        const transactions =
            showInitialBudget?.category?.transactions?.filter((transaction) => {
                const createdAt = new Date(transaction.transaction_date);
                return (
                    createdAt.getFullYear() === currentYear &&
                    createdAt.getMonth() === currentMonth &&
                    transaction.wallet_id === selectedWallet?.id
                );
            }) || [];

        const dayDifference = getRemainingDays();

        if (transactions.length !== 0) {
            const totalSpending = transactions.reduce((total, transaction) => {
                return total + Math.abs(transaction.transaction_amount);
            }, 0);

            const finalResult =
                showInitialBudget?.budget_amount - totalSpending;

            if (finalResult < 0) {
                return (
                    <div className="px-4 py-1 h-full flex-col sub-body md:body">
                        <div>
                            You’ve exceeded your budget for{" "}
                            {selectedCategory?.category_name} by{" "}
                            <span className="text-expense sub-body-bold md:button">
                                {formatToRupiah(Math.abs(finalResult))}
                            </span>{" "}
                            this month.
                        </div>
                        <div>
                            <span className="sub-body-bold md:button text-primary">
                                Note:{" "}
                            </span>
                            Consider reducing your spending in other categories
                            for the remainder of the month to stay on track.
                        </div>
                    </div>
                );
            } else {
                const averageDailySpending = finalResult / dayDifference;
                return (
                    <div className="px-5 py-2 h-full flex-col sub-body md:body">
                        Looks like your budget is still on the right track !
                        <br />
                        <span className="sub-body-bold md:button ">
                            Note:{" "}
                        </span>{" "}
                        Spend no more than{" "}
                        <span className="sub-body-bold md:button">
                            {" "}
                            {formatToRupiah(
                                Math.floor(averageDailySpending)
                            )}{" "}
                            per day
                        </span>{" "}
                        in order to avoid overspending your{" "}
                        <span className="sub-body-bold md:button">
                            budget limit!
                        </span>
                    </div>
                );
            }
        } else {
            const averageDailySpending =
                showInitialBudget?.budget_amount / dayDifference;

            return (
                <div className="px-5 py-2 h-full flex-col sub-body md:body">
                    Looks like your budget is still on the right track !
                    <br />
                    <span className="sub-body-bold md:button ">
                        Note:{" "}
                    </span>{" "}
                    Spend no more than{" "}
                    <span className="sub-body-bold md:button">
                        {" "}
                        {formatToRupiah(Math.floor(averageDailySpending))} per
                        day
                    </span>{" "}
                    in order to avoid overspending your{" "}
                    <span className="sub-body-bold md:button">
                        budget limit!
                    </span>
                </div>
            );
        }
    };

    const showSpendingLimit = () => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();

        const transactions =
            showInitialBudget?.category?.transactions?.filter((transaction) => {
                const createdAt = new Date(transaction.transaction_date);
                return (
                    createdAt.getFullYear() === currentYear &&
                    createdAt.getMonth() === currentMonth &&
                    transaction.wallet_id === selectedWallet?.id
                );
            }) || [];

        if (transactions.length !== 0) {
            const totalSpending = transactions.reduce((total, transaction) => {
                return total + Math.abs(transaction.transaction_amount);
            }, 0);

            const finalResult =
                showInitialBudget?.budget_amount - totalSpending;
            const getProgressBarPercentage =
                totalSpending / showInitialBudget?.budget_amount;
            const currProgressLength = length * getProgressBarPercentage;

            if (finalResult < 0) {
                return (
                    <div className="flex items-end w-full flex-col body">
                        <div className="text-expense">
                            {formatToRupiah(totalSpending)} /{" "}
                            {formatToRupiah(showInitialBudget?.budget_amount)}
                        </div>
                        <div
                            className="border-expense border h-5 w-full rounded-full relative overflow-hidden mt-2"
                            ref={progressBarRef}
                        >
                            <div className="absolute left-0 bg-expense w-full h-full"></div>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div className="flex items-end w-full flex-col body">
                        <div className="sub-body md:body">
                            {formatToRupiah(totalSpending)} /{" "}
                            {formatToRupiah(showInitialBudget?.budget_amount)}
                        </div>
                        <div
                            className={`${getProgressBarBorder(
                                getProgressBarPercentage * 100
                            )} border h-3 md:h-5 w-full rounded-full relative overflow-hidden mt-2`}
                            ref={progressBarRef}
                        >
                            <div
                                className={`absolute left-0 ${getProgressBarColor(
                                    getProgressBarPercentage * 100
                                )} h-full rounded-full`}
                                style={{
                                    width: `${Math.ceil(currProgressLength)}px`,
                                }}
                            ></div>
                        </div>
                    </div>
                );
            }
        } else {
            return (
                <div className="flex items-end w-full flex-col body">
                    <div className="">
                        0 / {formatToRupiah(showInitialBudget?.budget_amount)}
                    </div>
                    <div
                        className="border-primary border h-5 w-full rounded-full relative overflow-hidden mt-2"
                        ref={progressBarRef}
                    >
                        <div
                            className="absolute left-0 bg-primary h-full"
                            style={{ width: "0px" }}
                        ></div>
                    </div>
                </div>
            );
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Transaction Records
                </h2>
            }
        >
            <Head title="Budget" />

            <HeaderInfo
                walletOptions={walletOptions}
                selectedWallet={selectedWallet}
                setSelectedWallet={setSelectedWallet}
                totalExpenseBudgetAmount={totalExpenseBudgetAmount}
                totalIncomeBudgetAmount={totalIncomeBudgetAmount}
            />
            <div className="w-full bg-light rounded-xl py-2 text-primary px-4 md:px-12  md:py-3 mt-2">
                <div className="text-primary header-5 mb-2">Category </div>
                {budgets && budgets.length !== 0 ? (
                    <motion.div
                        ref={carousel}
                        className="w-full flex items-center gap-4 overflow-x-auto whitespace-nowrap custom-scrollbar "
                    >
                        {budgets?.map((budget) => (
                            <CategoryCard
                                budget={budget}
                                showInitialBudget={showInitialBudget}
                                setShowInitialBudget={setShowInitialBudget}
                                setData={setData}
                            />
                        ))}
                    </motion.div>
                ) : (
                    <div className="flex flex-col w-full py-2  text-primary mt-2 rounded-xl gap-4">
                        <div className="header-5 md:header-4">
                            No Budget Yet...
                        </div>
                    </div>
                )}
            </div>
            <div className="w-full bg-light rounded-md py-2 text-primary px-4 md:px-12  md:py-3 mt-2 border-l-4 border-primary">
                <div className="text-primary flex justify-between items-center">
                    <div className="header-4 ">Budget Details</div>
                    <div className="">
                        <PrimaryButton
                            className=" w-fit gap-2 rounded-lg py-3 px-1 sm:px-4 md:px-8 button flex items-center"
                            type="submit"
                            onClick={() => setShowAddBudgetPopup(true)}
                        >
                            <div className="text-[14px] md:text-[20px]">
                                <FiPlus />
                            </div>
                            <div className="hidden md:block button">
                                Add Budget
                            </div>
                            <AddBudgetPopup
                                show={showAddBudgetPopup}
                                categoryOptions={categoryOptions}
                                onClose={() => setShowAddBudgetPopup(false)}
                                selectedWallet={selectedWallet}
                            />
                        </PrimaryButton>
                    </div>
                </div>
            </div>
            <EditBudgetPopup
                show={showEditBudgetPopup}
                categoryOptions={categoryOptions}
                onClose={() => setShowEditBudgetPopup(false)}
                walletOptions={walletOptions}
                showInitialBudget={showInitialBudget}
                selectedWallet={selectedWallet}
                expenseCategories={expenseCategories}
                selectedCategory={selectedCategory}
            />
            {showInitialBudget && showInitialBudget.length !== 0 ? (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-2 lg:gap-4">
                    <div
                        className="w-full bg-light rounded-md py-2 text-primary  md:py-3 mt-2 border-l-4 border-primary
               h-[290px]"
                    >
                        <div className="flex  border-light-grey h-full ">
                            <div className="flex border-r-2 h-full px-1 md:px-2">
                                <div className="my-auto  p-2 md:p-3 text-primary header-3">
                                    <LuDices />
                                </div>
                            </div>
                            <div className="flex flex-col w-full h-full px-2 md:px-8 py-2">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 h-full">
                                    <div>
                                        <div className="button col-span-1 ">
                                            Budget Name :
                                        </div>
                                        <div>
                                            {showInitialBudget?.budget_name}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="button">Category :</div>
                                        <div>
                                            {selectedCategory?.category_name}
                                        </div>
                                    </div>
                                    <div className=" col-span-1 sm:col-span-2">
                                        <div className="button">Limit :</div>
                                        <div>
                                            {formatToRupiah(
                                                showInitialBudget?.budget_amount
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-span-1 sm:col-span-2 md:col-span-3">
                                        <div className="button">
                                            Short Description :
                                        </div>
                                        <div>
                                            {
                                                showInitialBudget?.budget_description
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full flex justify-end">
                                    <div className="flex gap-2 md:gap-4 h-fit">
                                        <Button
                                            className="border-2 border-expense p-2 md:p-3 rounded-full w-fit h-fit"
                                            onClick={() => handleDelete()}
                                        >
                                            <FaRegTrashCan
                                                className="text-expense"
                                                size={17}
                                            />
                                        </Button>
                                        <Button
                                            className="bg-primary text-light rounded-full p-2 md:p-3 w-fit h-fit"
                                            onClick={() =>
                                                setShowEditBudgetPopup(true)
                                            }
                                        >
                                            <HiPencil size={18} />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full bg-light rounded-md py-2 text-primary  md:py-3 mt-2 border-l-4 border-primary h-[290px] ">
                        <div className="flex  border-light-grey h-full w-full ">
                            <div className="flex border-r-2 h-full px-1 md:px-2">
                                <div className="my-auto p-2 md:p-3 text-primary header-3">
                                    <GrInfo />
                                </div>
                            </div>
                            <div className="flex flex-col w-full h-full px-2 md:px-4 py-1 gap-2 justify-center">
                                <div className="rounded-lg overflow-hidden w-full  border border-primary flex flex-col ">
                                    <div className="px-4 py-2 bg-primary w-full">
                                        <span className="button text-light w-full">
                                            Recommendation
                                        </span>
                                    </div>
                                    {countRecommendedBudgetAmount()}
                                </div>
                                <div className="rounded-lg overflow-hidden w-full  border border-primary flex flex-col px-5 py-2">
                                    <div
                                        className="  h-full flex 
                                items-center gap-2  button"
                                    >
                                        <div className="header-5">
                                            <PiChartPieSliceLight />
                                        </div>
                                        Spending Limit
                                    </div>
                                    {showSpendingLimit()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className=" bg-light flex flex-col w-full h-[300px] md:h-[400px] justify-center items-center text-primary  border mt-2 rounded-xl gap-4">
                    <div className="text-[64px] md:text-[84px] lg:text-[110px]">
                        <TbMoodEmpty />
                    </div>
                    <div className="header-5 md:header-3">
                        you have not selected any budget...
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
