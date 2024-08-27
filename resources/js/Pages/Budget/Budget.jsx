import CategoryCard from "@/Components/Budget/CategoryCard";
import HeaderInfo from "@/Components/Budget/HeaderInfo";
import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Head } from "@inertiajs/react";

import "boxicons";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { FiPlus } from "react-icons/fi";
import { HiPencil } from "react-icons/hi2";
import { LuDices } from "react-icons/lu";
import { MdOutlineRecommend } from "react-icons/md";
import { Button } from "reactstrap";
import { PiChartPieSliceLight } from "react-icons/pi";
import AddBudgetPopup from "@/Components/Modal/Popup/AddBudgetPopup";
import EditBudgetPopup from "@/Components/Modal/Popup/EditBudgetPopup";

export default function BudgetPage({
    auth,
    budgets,
    wallets,
    expenseCategories,
    incomeCategories,
}) {

    const [showAddBudgetPopup, setShowAddBudgetPopup] = useState(false);
    const [showEditBudgetPopup, setShowEditBudgetPopup] = useState(false);

    const [selectedWallet, setSelectedWallet] = useState(
        wallets[0].wallet_name
    );

    const categoryOptions = [
        {
            label: "Expense",
            options: expenseCategories.map((expense) => ({
                value: expense?.category_name,
                label: expense?.category_name,
            })),
        },
        {
            label: "Income",
            options: incomeCategories.map((income) => ({
                value: income?.category_name,
                label: income?.category_name,
            })),
        },
    ];

    const [showInitialBudget, setShowInitialBudget] = useState(budgets[0]);

    let totalExpenseBudgetAmount = budgets.reduce((total, budget) => {
        return total + budget?.budget_amount;
    }, 0);

    let totalIncomeBudgetAmount = budgets.reduce((total, budget) => {
        return total + budget?.budget_amount;
    }, 0);

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

    const walletOptions = wallets.map((wallet) => ({
        value: wallet?.wallet_name,
        label: wallet?.wallet_name,
    }));
   
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

            <HeaderInfo
                walletOptions={walletOptions}
                selectedWallet={selectedWallet}
                setSelectedWallet={setSelectedWallet}
                totalExpenseBudgetAmount={totalExpenseBudgetAmount}
                totalIncomeBudgetAmount={totalIncomeBudgetAmount}
            />
            <div className="w-full bg-light rounded-xl py-2 text-primary px-4 md:px-12  md:py-3 mt-2">
                <div className="text-primary header-5 mb-2">Category </div>
                <motion.div
                    ref={carousel}
                    className="w-full flex items-center gap-4 overflow-x-auto whitespace-nowrap custom-scrollbar "
                >
                    {budgets?.map((budget) => (
                        <CategoryCard
                            budget={budget}
                            showInitialBudget={showInitialBudget}
                            setShowInitialBudget={setShowInitialBudget}
                        />
                    ))}
                </motion.div>
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
                            <AddBudgetPopup show={showAddBudgetPopup} categoryOptions={categoryOptions} onClose={() => setShowAddBudgetPopup(false)}/>
                        </PrimaryButton>
                    </div>
                </div>
            </div>
            <EditBudgetPopup show={showEditBudgetPopup} categoryOptions={categoryOptions} onClose={() => setShowEditBudgetPopup(false)}/>
            <div className="grid grid-cols-2 gap-4">
                <div
                    className="w-full bg-light rounded-md py-2 text-primary  md:py-3 mt-2 border-l-4 border-primary
                h-[270px]"
                >
                    <div className="flex  border-light-grey h-full ">
                        <div className="flex border-r-2 h-full px-2">
                            <div className="my-auto bg-primary p-3 rounded-full text-light header-5">
                                <LuDices />
                            </div>
                        </div>
                        <div className="flex flex-col w-full h-full px-8 py-2">
                            <div className="grid grid-cols-3  gap-x-4 gap-y-2 h-full">
                                <div>
                                    <div className="button">Budget Name :</div>
                                    <div>{showInitialBudget?.budget_name}</div>
                                </div>
                                <div>
                                    <div className="button">Category :</div>
                                    <div>{showInitialBudget?.budget_name}</div>
                                </div>
                                <div>
                                    <div className="button">Limit :</div>
                                    <div>{showInitialBudget?.budget_name}</div>
                                </div>
                                <div className="col-span-3">
                                    <div className="button">
                                        Short Description :
                                    </div>
                                    <div>{showInitialBudget?.budget_name}</div>
                                </div>
                            </div>
                            <div className="w-full flex justify-end">
                                <div className="flex gap-2 md:gap-4 h-fit">
                                    <Button className="border-2 border-expense p-2 md:p-3 rounded-full w-fit h-fit">
                                        <FaRegTrashCan
                                            className="text-expense"
                                            size={17}
                                        />
                                    </Button>
                                    <Button
                                        className="bg-primary text-light rounded-full p-2 md:p-3 w-fit h-fit"
                                        onClick={() => setShowEditBudgetPopup(true)}
                                    >
                                        <HiPencil size={18} />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="w-full bg-light rounded-md py-2 text-primary  md:py-3 mt-2 border-l-4 border-primary
                h-[270px]"
                >
                    <div className="flex  border-light-grey h-full w-full">
                        <div className="flex border-r-2 h-full px-2">
                            <div className="my-auto bg-primary p-3 rounded-full text-light header-5">
                                <MdOutlineRecommend />
                            </div>
                        </div>
                        <div className="flex flex-col w-full h-full px-8 py-1 gap-2">
                            <div className="rounded-lg overflow-hidden w-full  border border-primary flex flex-col ">
                                <div className="px-4 py-2 bg-primary w-full">
                                    <span className="button text-light w-full">
                                        Recommendation
                                    </span>
                                </div>

                                <div className="px-5 py-2 h-full flex-col body">
                                    Looks like your budget is still on the right
                                    track ! Spend no more than{" "}
                                    <span className="button">
                                        {" "}
                                        Rp 5.000 per day
                                    </span>{" "}
                                    in order to avoid overspending your{" "}
                                    <span className="button">
                                        budget limit!
                                    </span>
                                </div>
                            </div>
                            <div className="rounded-lg overflow-hidden w-full  border border-primary flex flex-col ">
                                <div
                                    className="px-5 py-2 h-full flex 
                                items-center gap-2  button"
                                >
                                    <div className="header-5">
                                    <PiChartPieSliceLight />
                                    </div>
                                    Spending Limit
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
