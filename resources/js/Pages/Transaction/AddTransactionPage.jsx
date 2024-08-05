
import FirstSection from '@/Components/Transaction/AddTransaction/FirstSection';
import SecondSection from '@/Components/Transaction/AddTransaction/SecondSection';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function AddTransactionPage({ auth, wallets, categories }) {
    const [selectedWallet, setSelectedWallet] = useState()
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Add Transaction" />

            <div className='flex flex-col-reverse md:flex-row w-full  py-2 gap-4'>
                <FirstSection classname="w-2/3"/>
                <SecondSection classname="w-1/3" selectedWallet={selectedWallet} setSelectedWallet={setSelectedWallet}/>
            </div>
           
        </AuthenticatedLayout>
    );
}
