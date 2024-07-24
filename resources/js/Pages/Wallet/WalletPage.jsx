import AlertModal from "@/Components/Modal/AlertModal";
import AddWalletPopup from "@/Components/Modal/Popup/AddWalletPopup";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import { Plus } from "react-feather";

export default function Dashboard({ auth, wallets }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />
            <div className="flex h-[280px] gap-8">
                <div className="h-full w-full bg-primary rounded-md flex-1 rounded-e-3xl flex ">
                    <div className="w-2/3 pl-6 md:pl-12 py-2 flex flex-col justify-center text-light">
                        <div className="header-1 mb-1">View Your <br/>Wallet</div>
                        <div className="sub-body-14 pr-6">With our innovative platform, managing your finances has never been easier. View your wallet, where you can track your spending, set budgets, and monitor your savings all at once!.</div>
                    </div>
                    <div className="w-1/3 h-full bg-white border-dashed border-2 border-dark rounded-3xl  flex justify-center items-center">
                        <Plus/>
                    </div>
                </div>
                <div className="flex-1"></div>
            </div>
        </AuthenticatedLayout>
    );
}
