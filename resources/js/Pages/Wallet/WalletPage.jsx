import AddWalletPopup from "@/Components/Modal/Popup/AddWalletPopup";
import EditWalletPopup from "@/Components/Modal/Popup/EditWalletPopup";

import { formatDate, formatToRupiah } from "@/Helpers/helperFormat";
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
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import logo from "../../../../public/image/app/Logo.png";
import Left from "../../../../public/image/wallet/Left.png";
import Right from "../../../../public/image/wallet/Right.png";

export default function Dashboard({ auth, wallets }) {
    const [selectedWallet, setSelectedWallet] = useState(wallets[0] ?? null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [openAddWallet, setOpenAddWallet] = useState(false);
    const [openEditWallet, setOpenEditWallet] = useState(false);

    const { setData, delete: destroy } = useForm({ id: "" });

    const [isDeleting, setIsDeleting] = useState(false);

    const SlideLeft = () => {
        let Slider = document.getElementById("Slider");
        Slider.scrollLeft = Slider.scrollLeft - 500;
    };

    const SlideRight = () => {
        let Slider = document.getElementById("Slider");
        Slider.scrollLeft = Slider.scrollLeft + 500;
    };

    const calculateTotalTransaction = (transactions) => {
        return transactions.reduce((total, transaction) => {
            return total + transaction.transaction_amount;
        }, 0);
    };

    const handleDelete = () => {
        if (selectedWallet) {
            if (wallets.length === 1) {
                showErrorModal(
                    "Error",
                    "You cannot delete your main wallet",
                    undefined,
                    undefined,
                    true,
                    true
                );
            } else if (!isDeleting) {
                const onClose = () => {
                    setIsDeleting(true);
                    destroy(route("deleteWallet", selectedWallet.id), {
                        onSuccess: () => {
                            setSelectedWallet(null);
                            setSelectedIndex(null);
                            setIsDeleting(false);
                            showSuccessModal(
                                "Success",
                                "Wallet has been deleted successfully"
                            );
                        },
                        onError: () => {
                            setIsDeleting(false);
                            showErrorModal("Error", "Something went wrong");
                        },
                    });
                };

                showErrorModal(
                    "Error",
                    "Are you sure you want to delete this wallet?",
                    () => onClose(),
                    undefined,
                    true,
                    true
                );
            } else {
                return;
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
            <div className="flex h-[370px] md:h-[400px] lg:h-[250px] gap-4 lg:gap-8 flex-col-reverse lg:flex-row ">
                <div className="h-fit lg:h-full w-full bg-primary rounded-md  lg:flex-1 rounded-e-3xl flex ">
                    <div className="w-2/3 sm:w-3/4 pl-3 lg:pl-6  xl:pl-12 py-4 lg:py-2 flex flex-col justify-center text-light">
                        <div className="header-5 sm:header-3 lg:header-2 mb-1">
                            Add Your <br />
                            Wallet
                        </div>
                        <div className="sub-body lg:sub-body-14 pr-6 hidden lg:flex">
                            With just a few simple steps, you can create a new
                            wallet to track your spending, set budgets, and
                            monitor savings. Simply enter the wallet's name,
                            description, and starting balance, and oversee your
                            financial activities.
                        </div>
                    </div>
                    <Button
                        className="w-1/3 sm:w-1/4 h-full bg-white border-dashed border-2 border-dark rounded-3xl flex justify-center items-center"
                        onClick={() => setOpenAddWallet(!openAddWallet)}
                    >
                        <Plus />
                    </Button>
                </div>
                <div className="h-full relative flex items-center flex-1 lg:max-w-[50%]">
                    <div className="absolute top-[50%] translate-y-[-50%] left-[-15px] p-2 bg-primary rounded-full z-10 text-light border-white border">
                        <IoIosArrowBack onClick={SlideLeft} size={20} />
                    </div>
                    <div
                        id="Slider"
                        className="inline-flex w-full h-full scrollbar-hide whitespace-nowrap scroll-smooth overflow-y-hidden"
                    >
                        {wallets?.map((wallet, index) => (
                            <div
                                key={index}
                                className={`min-w-[200px] md:min-w-[200px] h-full flex items-end rounded-3xl mx-2 transition-all duration-300 ${
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
                                            } flex justify-center items-center p-6 rounded-full absolute top-[-40px] left-[50%] transform -translate-x-1/2 w-fit`}
                                        >
                                            <FaWallet size={40} />
                                        </div>
                                        <div className="flex w-full items-center justify-between">
                                            <div className="header-3"></div>
                                            <div
                                                className={` rounded-full w-6 h-6 border-4 ${
                                                    selectedIndex === index
                                                        ? "border-white bg-primary"
                                                        : "border-primary bg-white"
                                                }`}
                                            ></div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div className="button md:header-5 text-center">
                                            {wallet?.wallet_name}
                                        </div>
                                        <div
                                            className={`sub-body md:sub-body-14 ${
                                                selectedIndex === index
                                                    ? "text-white"
                                                    : "text-grey"
                                            } text-center`}
                                        >
                                            {wallet?.wallet_description}
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
                                            {selectedIndex === index
                                                ? "Selected"
                                                : "View"}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div
                        onClick={SlideRight}
                        className="absolute top-[50%] translate-y-[-50%] right-[-15px] p-2 bg-primary rounded-full z-10 text-light border-white border"
                    >
                        <IoIosArrowForward size={20} />
                    </div>
                </div>
            </div>
            <div className="flex flex-col md:flex-row  mt-4 h-[400px] md:h-[200px] gap-4 lg:gap-8">
                <div className="flex-1 w-full border-l-4 border-primary px-4 py-3 bg-light">
                    <div className=" flex justify-between">
                        <div className="flex h-fit items-center text-light gap-2">
                            <div className="p-2 bg-primary rounded-md ">
                                <BiDetail size={22} />
                            </div>
                            <h6 className="text-primary header-5-light md:header-3-light">
                                Details
                            </h6>
                        </div>
                        <div className="flex gap-2 md:gap-4 h-fit">
                            <Button
                                className="border-2 border-expense p-2 md:p-3 rounded-full w-fit h-fit"
                                onClick={handleDelete}
                            >
                                <FaRegTrashCan
                                    className="text-expense"
                                    size={17}
                                />
                            </Button>
                            <Button
                                className="bg-primary text-light rounded-full p-2 md:p-3 w-fit h-fit"
                                onClick={() => {
                                    if (!selectedWallet) {
                                        showErrorModal(
                                            "Error",
                                            "Please select a wallet to edit",
                                            undefined,
                                            undefined,
                                            true,
                                            true
                                        );
                                    } else {
                                        setOpenEditWallet(true);
                                    }
                                }}
                            >
                                <HiPencil size={18} />
                            </Button>
                        </div>
                    </div>
                    <div className="text-primary mt-2">
                        <h5 className="body ">Total Balance</h5>
                        <h5 className="header-5 ">
                            {formatToRupiah(selectedWallet?.wallet_balance)}
                        </h5>
                    </div>
                    <div className="text-primary mt-2">
                        <h5 className="body">Created Date</h5>

                        <h5 className="header-5 ">
                            {formatDate(selectedWallet?.created_at)}
                        </h5>
                    </div>
                </div>

                <div className="h-full flex-1 flex-col w-full flex justify-between gap-2 text-light">
                    <div className="bg-light w-full flex-1 rounded-md flex">
                        <div className="bg-primary flex w-fit h-full  px-2 items-center justify-center rounded-md">
                            <FaArrowTrendUp size={24} />
                        </div>
                        <div className="text-primary flex h-full flex-col justify-center px-4">
                            <h1 className="body ">Total Income</h1>
                            <h2 className="header-5 ">
                                {selectedWallet?.transactions &&
                                selectedWallet?.transactions.length !== 0
                                    ? formatToRupiah(
                                          calculateTotalTransaction(
                                              selectedWallet?.transactions
                                          )
                                      )
                                    : "No Income Transaction yet"}
                            </h2>
                        </div>
                    </div>
                    <div className="bg-light w-full flex-1 rounded-md flex">
                        <div className="bg-primary flex w-fit h-full  px-2 items-center justify-center rounded-md">
                            <FaArrowTrendDown size={24} />
                        </div>
                        <div className="text-primary flex h-full flex-col justify-center px-4">
                            <h1 className="body">Total Expense</h1>
                            <h2 className="header-5">
                                {selectedWallet?.transactions &&
                                selectedWallet?.transactions.length !== 0
                                    ? formatToRupiah(
                                          calculateTotalTransaction(
                                              selectedWallet?.transactions
                                          )
                                      )
                                    : "No Expense Transaction yet"}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center items-center  mt-4 h-[200px] gap-4 lg:gap-8 bg-light relative text-primary">
                <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8 px-10 md:px-14 lg:px-20 text-center md:text-start">
                    <img
                        src={logo}
                        alt="Logo"
                        className="w-[80px] h-[80px] lg:w-[150px] lg:h-[150px]"
                    />
                    <div className="flex flex-col">
                        <div className="body lg:header-4-light">
                            Take control of your finances effortlessly
                        </div>
                        <div className=" w-full md:max-w-[360px] header-5 md:header-3 lg:header-2 ">
                            Simplify Your Finances, Amplify Your Life
                        </div>
                    </div>
                </div>
                <img
                    src={Left}
                    alt="Logo"
                    className="w-[50px] md:w-[140px] lg:w-[200px] xl:w-[350px] h-full absolute top-0 left-0"
                />
                <img
                    src={Right}
                    alt="Logo"
                    className="w-[50px] md:w-[140px] lg:w-[200px] xl:w-[350px] h-full absolute top-0 right-0"
                />
            </div>
            <AddWalletPopup
                show={openAddWallet}
                headerColor={"blue"}
                onClose={() => setOpenAddWallet(false)}
            />
            <EditWalletPopup
                show={openEditWallet}
                wallet={selectedWallet ?? []}
                headerColor={"blue"}
                onClose={() => setOpenEditWallet(false)}
            />
        </AuthenticatedLayout>
    );
}
