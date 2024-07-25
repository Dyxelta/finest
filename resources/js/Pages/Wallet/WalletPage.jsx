import AddWalletPopup from "@/Components/Modal/Popup/AddWalletPopup";
import { showErrorModal, showSuccessModal } from "@/Helpers/utils";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";
import { Plus } from "react-feather";
import { BiDetail } from "react-icons/bi";
import { FaWallet } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { HiPencil } from "react-icons/hi2";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Button } from "reactstrap";

export default function Dashboard({ auth, wallets }) {
    const [selectedWallet, setSelectedWallet] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState();
    const [openAddWallet, setOpenAddWallet] = useState(false);

    const {
        data,
        setData,
        delete: destroy,
    } = useForm({
        id: "",
    });

    const SlideLeft = () => {
        let Slider = document.getElementById("Slider");
        Slider.scrollLeft = Slider.scrollLeft - 500;
    };

    const SlideRight = () => {
        let Slider = document.getElementById("Slider");
        Slider.scrollLeft = Slider.scrollLeft + 500;
    };

    const handleDelete = () => {
        if (selectedWallet) {
            if (wallets.length == 1) {
                showErrorModal(
                    "Error",
                    "You cannot destroy your main wallet",
                    undefined,
                    undefined,
                    true,
                    true
                );
            } else {
                const onClose = () => {
                    destroy(route("deleteWallet", selectedWallet.id), {
                        onSuccess: () => {
                            setSelectedWallet(null);
                            showSuccessModal(
                                "Success",
                                "Wallet has been deleted successfully"
                            );
                        },
                        onError: () => {
                            showErrorModal("Error", "something went wrong");
                        },
                    });
                };

                showErrorModal(
                    "Error",
                    "Are you sure to delete this wallet? ",
                    onClose(),
                    undefined,
                    true,
                    true
                );
            }
        } else {
            showErrorModal(
                "Error",
                "No Wallet Selected!",
                undefined,
                undefined,
                true,
                true
            );
        }
    };

    console.log(selectedIndex, "selectedIndex");

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
            <div className="flex h-[560px] md:h-[280px] gap-8 flex-col md:flex-row ">
                <div className="h-full w-full bg-primary rounded-md flex-1 rounded-e-3xl flex ">
                    <div className="w-2/3 pl-6 md:pl-12 py-2 flex flex-col justify-center text-light">
                        <div className="header-1 mb-1">
                            View Your <br />
                            Wallet
                        </div>
                        <div className="sub-body-14 pr-6">
                            With our innovative platform, managing your finances
                            has never been easier. View your wallet, where you
                            can track your spending, set budgets, and monitor
                            your savings all at once!
                        </div>
                    </div>
                    <Button
                        className="w-1/3 h-full bg-white border-dashed border-2 border-dark rounded-3xl flex justify-center items-center"
                        onClick={() => setOpenAddWallet(!openAddWallet)}
                    >
                        <Plus />
                    </Button>
                </div>
                <div className="h-full relative flex items-center flex-1 md:max-w-[50%]">
                    {wallets.length === 3 && (
                        <div className="absolute top-[50%] translate-y-[-50%] left-[-15px] p-2 bg-primary rounded-full z-50 text-light border-white border">
                            <IoIosArrowBack onClick={SlideLeft} size={24} />
                        </div>
                    )}
                    <div
                        id="Slider"
                        className="inline-flex w-full h-full scrollbar-hide whitespace-nowrap scroll-smooth overflow-y-hidden"
                    >
                        {wallets.map((wallet, index) => (
                            <div
                                key={index}
                                className={` min-w-[240px] h-full flex items-end rounded-3xl mx-2 transition-all duration-300 ${
                                    selectedIndex === index
                                        ? "bg-lighter-primary text-light"
                                        : "bg-lighter-primary text-primary"
                                }`}
                            >
                                <div
                                    className={`h-3/4 flex w-full flex-col justify-between bg-light rounded-3xl py-2 px-6 relative ${
                                        selectedIndex === index
                                            ? "bg-primary text-light"
                                            : "bg-light text-primary"
                                    }`}
                                >
                                    <div>
                                        <div
                                            className={`${
                                                selectedIndex === index
                                                    ? "bg-white text-primary"
                                                    : "bg-primary text-light"
                                            } flex justify-center items-center p-8 rounded-full absolute top-[-60px] left-[50%] transform -translate-x-1/2 w-fit`}
                                        >
                                            <FaWallet size={40} />
                                        </div>
                                        <div className="flex w-full items-center justify-between">
                                            <div className="header-3">{`W${index}`}</div>
                                            <div
                                                className={`bg-white rounded-full w-6 h-6 border-4 ${
                                                    selectedIndex === index
                                                        ? "border-white"
                                                        : "border-primary"
                                                }`}
                                            ></div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div className="header-5 text-center">
                                            {wallet.wallet_name}
                                        </div>
                                        <div
                                            className={`sub-body-14 ${
                                                selectedIndex === index
                                                    ? "text-white"
                                                    : "text-grey"
                                            } text-center`}
                                        >
                                            {wallet.wallet_description}
                                        </div>
                                    </div>
                                    <div
                                        className={`w-full py-2 ${
                                            selectedIndex === index
                                                ? "border-light"
                                                : "border-primary"
                                        }`}
                                    >
                                        <Button
                                            className={`transition-all duration-500 mx-auto py-2 w-full rounded-lg ${
                                                selectedIndex === index
                                                    ? "bg-light text-primary hover:bg-lighter-primary"
                                                    : "bg-primary text-light hover:bg-darker-primary"
                                            }`}
                                            onClick={() => {
                                                setSelectedIndex(index);
                                                setSelectedWallet(wallet);
                                                setData("id", wallet.id);
                                            }}
                                        >
                                            Details
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {wallets.length === 3 && (
                        <div
                            onClick={SlideRight}
                            className="absolute top-[50%] translate-y-[-50%] right-[-15px] p-2 bg-primary rounded-full z-50 text-light border-white border"
                        >
                            <IoIosArrowForward size={24} />
                        </div>
                    )}
                </div>
            </div>
            <div className="flex mt-4 h-[560px] md:h-[280px] gap-8 ">
                <div className="h-full border-l-4 border-primary px-4 py-3 bg-light flex-1 w-full flex justify-between">
                    <div className="flex h-fit items-center text-light gap-2">
                        <div className="p-3 bg-primary rounded-md ">
                            <BiDetail size={24} />
                        </div>
                        <h6 className="text-primary header-3-light">Details</h6>
                    </div>
                    <div className="flex gap-4 h-fit">
                        <Button
                            className="border-2 border-expense p-3 rounded-full"
                            onClick={() => handleDelete()}
                        >
                            <FaRegTrashCan className="text-expense" size={20} />
                        </Button>
                        <Button className="bg-primary text-light rounded-full p-3 ">
                            <HiPencil size={20} />
                        </Button>
                    </div>
                </div>
                <div className="h-full border-l-4 border-primary px-4 py-3 bg-light flex-1 w-full flex justify-between"></div>
            </div>

            <AddWalletPopup
                show={openAddWallet}
                headerColor={"blue"}
                onClose={() => {
                    setOpenAddWallet(false);
                }}
            />
        </AuthenticatedLayout>
    );
}
