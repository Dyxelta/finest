
import FirstSection from '@/Components/Transaction/AddTransaction/FirstSection';
import SecondSection from '@/Components/Transaction/AddTransaction/SecondSection';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function AddTransactionPage({ auth, wallets, expenseCategories,incomeCategories }) {
    const [selectedWallet, setSelectedWallet] = useState(wallets[0])
    console.log(wallets, incomeCategories, expenseCategories,"uisdghfuisdgufugisdfugsdfus")
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Add Transaction" />

            <div className='flex flex-col-reverse md:flex-row w-full py-1 gap-4 '>
                <FirstSection classname="w-2/3" selectedWallet={selectedWallet} setSelectedWallet={setSelectedWallet} wallets={wallets}/>
                <SecondSection classname="w-1/3" selectedWallet={selectedWallet} />
            </div>
           
        </AuthenticatedLayout>
    );
}
