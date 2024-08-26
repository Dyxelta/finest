import CategoryCard from "@/Components/Budget/CategoryCard";
import HeaderInfo from "@/Components/Budget/HeaderInfo";
import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Head } from "@inertiajs/react";

import "boxicons";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { LuDices } from "react-icons/lu";

export default function BudgetPage({
    auth,
    budgets,
    wallets,
    expenseCategories,
    incomeCategories,
}) {
    const [selectedWallet, setSelectedWallet] = useState(
        wallets[0].wallet_name
    );

    const mergedCategories = [...expenseCategories, ...incomeCategories];

    const [category, setCategory] = useState(mergedCategories[0].category_name);

    let totalAmount = budgets.reduce((total, budget) => {
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
                category={category}
                setSelectedWallet={setSelectedWallet}
                amount={totalAmount}
            />
            <div className="w-full bg-light rounded-xl py-2 text-primary px-4 md:px-12  md:py-3 mt-2">
                <div className="text-primary header-5">Category </div>
                <motion.div
                    ref={carousel}
                    className="w-full flex items-center gap-4 overflow-x-auto whitespace-nowrap custom-scrollbar "
                >
                    {mergedCategories.map((category) => {
                        <CategoryCard budget={category} />;
                    })}
                </motion.div>
            </div>
            <div className="w-full bg-light rounded-md py-2 text-primary px-4 md:px-12  md:py-3 mt-2 border-l-4 border-primary">
                <div className="text-primary flex justify-between items-center">
                    <div className="header-5 ">Budget Details</div>
                    <div className="">
                        <PrimaryButton
                            className=" w-fit gap-2 rounded-lg py-3 px-1 sm:px-4 md:px-8 button flex items-center"
                            type="submit"
                        >
                            <div className="text-[14px] md:text-[20px]">
                                <FiPlus />
                            </div>
                            <div className="hidden md:block button">
                                Add Budget
                            </div>
                        </PrimaryButton>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div
                    className="w-full bg-light rounded-md py-2 text-primary  md:py-3 mt-2 border-l-4 border-primary
                h-[200px]"
                >
                    <div className="flex  border-light-grey h-full ">
                        <div className="flex border-r-2 h-full px-2">
                            <div className="my-auto bg-primary p-3 rounded-full text-light ">
                                <LuDices />
                            </div>
                        </div>
                        <div className="flex flex-wrap">
                            
                        </div>
                    </div>
                </div>
                <div className="w-full bg-light rounded-md py-2 text-primary px-4 md:px-12  md:py-3 mt-2 border-l-4 border-primary"></div>
            </div>
        </AuthenticatedLayout>
    );
}
