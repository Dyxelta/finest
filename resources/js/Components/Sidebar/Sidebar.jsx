import { Link, usePage } from "@inertiajs/react";
import { Collapse } from "@material-tailwind/react";
import "boxicons";
import { useState } from "react";
import { BiSolidPencil } from "react-icons/bi";
import { BsGraphUp } from "react-icons/bs";
import { CiLock, CiSquarePlus, CiUser } from "react-icons/ci";
import { FaMoneyBillWave, FaWallet } from "react-icons/fa";
import { GrHistory } from "react-icons/gr";
import { IoIosArrowDown, IoIosLogOut } from "react-icons/io";
import { LuClipboardList } from "react-icons/lu";
import { MdDashboard } from "react-icons/md";
import { RxLoop } from "react-icons/rx";
import {
    TbCircleArrowUpLeftFilled,
    TbCircleArrowUpRightFilled,
} from "react-icons/tb";
import { Button } from "reactstrap";
import ChangePasswordPopup from "../Modal/Popup/ChangePasswordPopup";
import EditAccountPopup from "../Modal/Popup/EditAccountPopup";

const Sidebar = ({ openNav, setOpenNav }) => {
    const changeWidth = [
        "max-w-[270px]",
        "left-[-82px] md:left-0 max-w-[80px]",
    ];
    const { user } = usePage().props.auth;
    const [openProfile, setOpenProfile] = useState(false);
    const [openEditProfile, setOpenEditProfile] = useState(false);
    const [openChangePassword, setOpenChangePassword] = useState(false);
    const menuArray = [
        {
            Title: "Menus",
            Children: [
                {
                    Title: "Dashboard",
                    href: "dashboard",
                    icon: <MdDashboard size={24} />,
                },
            ],
        },
        {
            Title: "Transaction",
            Children: [
                {
                    Title: "Add Transaction",
                    href: "addTransaction",
                    icon: <CiSquarePlus size={24} />,
                },
                {
                    Title: "Recurring Transaction",
                    href: "recurringTransactionPage",
                    icon: <RxLoop size={22} />,
                },
                {
                    Title: "Financial Analysis",
                    href: "transactionAnalysisPage",
                    icon: <BsGraphUp size={22} />,
                },
                {
                    Title: "Transaction Records",
                    href: "transactionPage",
                    icon: <GrHistory size={22} />,
                },
                {
                    Title: "Transaction Report",
                    href: "transactionReportPage",
                    icon: <LuClipboardList size={24} />,
                },
            ],
        },
        {
            Title: "Personal",
            Children: [
                {
                    Title: "Wallet",
                    href: "walletPage",
                    icon: <FaWallet size={22} />,
                },
                {
                    Title: "Budget",
                    href: "budgetPage",
                    icon: <FaMoneyBillWave size={22} />,
                },
            ],
        },
    ];

    return (
        <nav
            className={`fixed transition-all duration-500 ease-in-out h-screen z-50 ${
                openNav ? changeWidth[0] : changeWidth[1]
            } w-full bg-light font-roboto `}
        >
            <div className="h-screen w-full bg-light flex flex-col justify-between border-r">
                <div className="w-full">
                    <div className="relative w-full">
                        <div className="flex items-center gap-2 p-4 border-b-2 border-off-white relative justify-between w-full">
                            <div
                                className="flex items-center gap-2  border-off-white relative w-full"
                                onClick={() =>
                                    setOpenProfile(
                                        openNav ? !openProfile : false
                                    )
                                }
                            >
                                <div className="p-[10px] bg-darker-primary w-fit rounded-md">
                                    <CiUser size={24} color="#FDFDFD" />
                                </div>
                                <div
                                    className={`transition-all ease-in-out overflow-hidden w-full ${
                                        openNav
                                            ? "opacity-100 delay-300 duration-500"
                                            : "opacity-0 duration-100"
                                    }`}
                                    style={{
                                        width: openNav ? "auto" : "0",
                                        minWidth: openNav
                                            ? "max-content"
                                            : "auto",
                                    }}
                                >
                                    <div className="truncate sub-body-14-bold max-w-full w-[150px]">
                                        {user?.username}
                                    </div>
                                    <div className="sub-body-14 text-grey max-w-full">
                                        {user?.email}
                                    </div>
                                </div>
                                <div
                                    className={`mr-2 text-[18px] transition-all duration-300 opacity-0 ml-auto ${
                                        openProfile ? "rotate-0" : "rotate-180"
                                    } ${openNav && "delay-200 opacity-100"}`}
                                >
                                    {openNav && <IoIosArrowDown />}
                                </div>
                            </div>

                            <Button
                                onClick={() => {
                                    setOpenNav(!openNav);
                                    setOpenProfile(false);
                                }}
                                className={`text-darker-primary absolute top-[50%] ${
                                    openNav
                                        ? "right-[-20px]"
                                        : "right-[-50px] md:right-[-20px]"
                                } translate-y-[-50%] p-1 bg-white rounded-full border-e-2 `}
                            >
                                {openNav ? (
                                    <TbCircleArrowUpRightFilled size={30} />
                                ) : (
                                    <TbCircleArrowUpLeftFilled size={30} />
                                )}
                            </Button>
                        </div>

                        <div className="absolute z-50 w-full mt-1 text-primary">
                            <Collapse open={openProfile}>
                                <div className=" mx-auto w-[90%] border shadow-xl mb-8 bg-light rounded-xl">
                                    <Button
                                        className="px-5 py-3 w-full flex items-center gap-2 hover:bg-gray-100 hover:opacity-70 duration-300 transition-all sub-body-14"
                                        onClick={() => setOpenEditProfile(true)}
                                    >
                                        <BiSolidPencil size={16} /> Edit Profile
                                        <EditAccountPopup
                                            show={openEditProfile}
                                            maxWidth="md"
                                            onClose={() =>
                                                setOpenEditProfile(false)
                                            }
                                            user={user}
                                            showCancel={false}
                                        />
                                    </Button>

                                    <hr />
                                    <Button
                                        className="px-5  py-3 w-full flex items-center gap-2 hover:bg-gray-100 hover:opacity-70 duration-300 transition-all sub-body-14"
                                        onClick={() =>
                                            setOpenChangePassword(true)
                                        }
                                    >
                                        <CiLock size={18} />
                                        Change Password
                                        <ChangePasswordPopup
                                            show={openChangePassword}
                                            maxWidth="md"
                                            onClose={() =>
                                                setOpenChangePassword(false)
                                            }
                                            user={user}
                                            showCancel={false}
                                        />
                                    </Button>
                                </div>
                            </Collapse>
                        </div>
                    </div>
                    <div className="px-4">
                        {menuArray.map((menu, index) => (
                            <div className={`${openNav ? "pt-1" : ""}`}>
                                <div
                                    className={`transition-opacity duration-300 ease-in-out cursor-default ${
                                        openNav
                                            ? "opacity-100"
                                            : "opacity-0 w-0"
                                    } text-grey`}
                                >
                                    {menu.Title}
                                </div>
                                {index !== 0 && (
                                    <div
                                        className={`transition-opacity duration-100 ease-in-out ${
                                            openNav
                                                ? "opacity-0 "
                                                : "opacity-100 delay-300"
                                        }`}
                                    >
                                        <hr className="border-primary" />
                                    </div>
                                )}
                                <div className=" py-1 flex flex-col gap-1 pt-2 ">
                                    {menu.Children.map((subMenu, index) => (
                                        <Link
                                            href={route(subMenu?.href)}
                                            className={` relative group flex gap-2 text-primary ${
                                                openNav ? "py-3 px-4" : "p-3"
                                            }  rounded-md  hover:bg-off-white `}
                                        >
                                            <h2
                                                className={
                                                    openNav
                                                        ? "hidden"
                                                        : " w-0 opacity-0 overflow-hidden absolute  bg-white font-semibold whitespace-pre text-gray-900 rounded-xl drop-shadow-lg px-0 py-0 group-hover:px-4 group-hover:py-2 left-[68px] duration-100 group-hover:w-auto group-hover:opacity-100 transition-all bottom-1"
                                                }
                                            >
                                                {subMenu.Title}
                                            </h2>
                                            <div
                                                className={` transition-transform flex  duration-500 ease-in-out ${
                                                    openNav
                                                        ? "group-hover:translate-x-2"
                                                        : "justify-center items-center"
                                                } gap-2`}
                                            >
                                                <div>{subMenu.icon}</div>
                                                <div
                                                    className={`transition-all ease-in-out overflow-hidden  ${
                                                        openNav
                                                            ? " max-w-full opacity-100 delay-300  duration-500"
                                                            : " max-w-[0] opacity-0 duration-100"
                                                    }`}
                                                    style={{
                                                        minWidth: openNav
                                                            ? "max-content"
                                                            : "max-content",
                                                    }}
                                                >
                                                    {openNav
                                                        ? subMenu.Title
                                                        : ""}
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <Link
                    method="GET"
                    href={route("logout")}
                    as="button"
                    className={`text-expense py-4 flex items-center button px-8  border-t-2 border-off-white transition-transform duration-500 ease-in-out hover:translate-x-2 text-left`}
                >
                    <div>
                        <IoIosLogOut size={24} />
                    </div>
                    <div
                        className={`transition-all ease-in-out ${
                            openNav
                                ? "w-full opacity-100 pl-4 delay-300"
                                : "w-0 opacity-0 overflow-hidden "
                        }`}
                        style={{
                            whiteSpace: "nowrap",
                        }}
                    >
                        Log Out
                    </div>
                </Link>
            </div>
        </nav>
    );
};

export default Sidebar;
