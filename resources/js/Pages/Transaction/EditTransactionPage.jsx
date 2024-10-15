import EditSection from "@/Components/Transaction/EditTransaction/EditSection";
import { getCategoriesOptions, getWalletOptionsWithId } from "@/Helpers/options";
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

    const walletOptions = getWalletOptionsWithId(wallets)

    const categories = getCategoriesOptions(expenseCategories, incomeCategories)

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
