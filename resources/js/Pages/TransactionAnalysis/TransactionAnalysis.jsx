import AverageExpenseIncome from "@/Components/TransactionAnalysis/AverageExpenseIncome";
import AverageSpendingAnalysis from "@/Components/TransactionAnalysis/AverageSpendingAnalysis";
import HeaderInfo from "@/Components/TransactionAnalysis/HeaderInfo";
import PastExpenseOverview from "@/Components/TransactionAnalysis/PastExpenseOverview";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function TransactionReportPage({
    auth,
    wallets,
    expenseCategories,
    currWallet,
    currCategory,
    monthly_total_transaction,
    average_transaction_last_six_month,
    total_transaction_this_month,
    highest_transaction,
    lowest_transaction,
}) {
    const allWallet = {
        wallet_name: "All Wallet",
    };

    const initialWallets = [allWallet, ...wallets];
    const { get, setData,data } = useForm({
        category_name: currCategory?.category_name,
        wallet_name: currWallet,
    });

    const [wait, setWait] = useState(false);
    useEffect(() => {
        const getTransactions = () => {
            if (wait) {
                try {
                    get(route("transactionAnalysisPage"));
                } catch (error) {
                    console.error("Error setting data:", error);
                } finally {
                    setWait(false);
                }
            }
        };

        getTransactions();
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
            <Head title="Transaction Reports" />
            <div className="w-full">
                <HeaderInfo
                    monthly_total_transaction={monthly_total_transaction}
                    expenseCategories={expenseCategories}
                    initialWallets={initialWallets}
                    currWallet={currWallet}
                    currCategory={currCategory}
                    setData={setData}
                    setWait={setWait}
                />
                <div className="flex flex-col gap-4">
                    <div>
                        <PastExpenseOverview monthly_total_transaction={monthly_total_transaction}/>
                    </div>
                    <div>
                        <AverageExpenseIncome
                            average_transaction_last_six_month={
                                average_transaction_last_six_month
                            }
                            lowest_transaction={lowest_transaction}
                            highest_transaction={highest_transaction}
                        />
                    </div>
                    <div>
                        <AverageSpendingAnalysis
                            average_transaction_last_six_month={
                                average_transaction_last_six_month
                            }
                            lowest_transaction={lowest_transaction}
                            highest_transaction={highest_transaction}
                            total_transaction_this_month={
                                total_transaction_this_month
                            }
                            currCategory={currCategory}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
