
import EditSection from "@/Components/Transaction/EditTransaction/EditSection";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";

export default function AddTransactionPage({
    auth,
    wallets,
    expenseCategories,
    incomeCategories,
    transaction,
}) {
    const [selectedWallet, setSelectedWallet] = useState(transaction?.wallet);

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
            <Head title="Edit Transaction" />

            <div className="flex flex-col-reverse md:flex-row w-full py-1 gap-4 ">
                <EditSection
                    transaction={transaction}
                    selectedWallet={selectedWallet}
                    setSelectedWallet={setSelectedWallet}
                    walletOptions={walletOptions}
                    categories={categories}
                />
            </div>
        </AuthenticatedLayout>
    );
}
