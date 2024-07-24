
import AlertModal from '@/Components/Modal/AlertModal';
import AddWalletPopup from '@/Components/Modal/Popup/AddWalletPopup';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Dashboard({ auth,  wallets }) {
    const [checkWallet, setCheckWallet] = useState(wallets && wallets.length !== 0 ? false : true)
    const [Popup, setPopup] = useState()
 

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />
            <AlertModal show={checkWallet} maxWidth='md' headerColor={'blue'} title={'Alert '}  content={"It seems you have no wallet!<br />You need at least one wallet to continue.<br />Let's create one now!"}  showButton={true} onClose={() => {
                setPopup(true)
                setCheckWallet(false)
                }}/>
            <AddWalletPopup show={Popup} headerColor={'blue'}  onClose={() => {
                setPopup(false)
            }}/>
        </AuthenticatedLayout>
    );
}
