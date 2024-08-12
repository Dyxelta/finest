import MainSection from "@/Components/Transaction/AddTransaction/MainSection";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";

export default function AddTransactionPage({
    auth,
    wallets,
    expenseCategories,
    incomeCategories,
}) {
    const [selectedWallet, setSelectedWallet] = useState(wallets[0]);

    const walletOptions = wallets.map((wallet) => ({
        ...wallet,
        value: wallet?.id,
        label: wallet?.wallet_name,
    }));

    const categories = [
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

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Add Transaction" />

            <div className="flex flex-col-reverse md:flex-row w-full py-1 gap-4 ">
                <MainSection
                    selectedWallet={selectedWallet}
                    setSelectedWallet={setSelectedWallet}
                    walletOptions={walletOptions}
                    categories={categories}
                />
            </div>
        </AuthenticatedLayout>
    );
}
