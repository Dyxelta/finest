import "boxicons";
import { MdDashboard } from "react-icons/md";
import { CiSquarePlus, CiUser } from "react-icons/ci";
import { RxLoop } from "react-icons/rx";
import { BsGraphUp } from "react-icons/bs";
import { GrHistory } from "react-icons/gr";
import { LuClipboardList } from "react-icons/lu";
import { FaWallet, FaMoneyBillWave } from "react-icons/fa";
import { useState } from "react";
import { IoIosLogOut } from "react-icons/io";
import {
    TbCircleArrowUpRightFilled,
    TbCircleArrowUpLeftFilled,
} from "react-icons/tb";
import { Button } from "reactstrap";

import { Link } from "@inertiajs/react";

const Sidebar = ({ openNav, setOpenNav }) => {
    const changeWidth = [
        "max-w-[270px]",
        "left-[-82px] md:left-0 max-w-[80px]",
    ];
    const [activeMenu, setActiveMenu] = useState();
    const menuArray = [
        {
            Title: "Menus",
            Children: [
                {
                    Title: "Dashboard",
                    href: "",
                    icon: <MdDashboard size={24} />,
                },
            ],
        },
        {
            Title: "Transaction",
            Children: [
                {
                    Title: "Add Transaction",
                    href: "",
                    icon: <CiSquarePlus size={24} />,
                },
                {
                    Title: "Recurring Transaction",
                    href: "",
                    icon: <RxLoop size={22} />,
                },
                {
                    Title: "Financial Analysis",
                    href: "",
                    icon: <BsGraphUp size={22} />,
                },
                {
                    Title: "Transaction Records",
                    href: "",
                    icon: <GrHistory size={22} />,
                },
                {
                    Title: "Transaction Report",
                    href: "",
                    icon: <LuClipboardList size={24} />,
                },
            ],
        },
        {
            Title: "Personal",
            Children: [
                {
                    Title: "Wallet",
                    href: "",
                    icon: <FaWallet size={22} />,
                },
                {
                    Title: "Budget",
                    href: "",
                    icon: <FaMoneyBillWave size={22} />,
                },
            ],
        },
    ];
    return (
        <nav
            className={`fixed transition-all duration-500 ease-in-out h-screen ${
                openNav ? changeWidth[0] : changeWidth[1]
            } w-full bg-light font-roboto `}
        >
            <div className="h-screen w-full bg-light flex flex-col justify-between ">
                <div>
                    <div className="flex items-center gap-2 p-4 border-b-2 border-off-white relative">
                        <div className="p-[10px] bg-darker-primary w-fit rounded-md">
                            <CiUser size={24} color="#FDFDFD" />
                        </div>
                        <div
                            className={`transition-all ease-in-out overflow-hidden w-full ${
                                openNav
                                    ? "w-full opacity-100 delay-300  duration-500"
                                    : "w-[0] opacity-0 duration-100"
                            }`}
                            style={{
                                minWidth: openNav ? "max-content" : "auto",
                            }}
                        >
                            <div className="button">PisangBeruntung655</div>
                            <div className="sub-body-14 text-grey">
                                williamtan@gmail.com
                            </div>
                        </div>
                        <Button
                            onClick={() => setOpenNav(!openNav)}
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
                                        <div
                                            className={` relative group flex gap-2 text-primary ${
                                                openNav ? "py-3 px-4" : "p-3"
                                            }  rounded-md  hover:bg-off-white `}
                                        >
                                            <h2
                                                className={
                                                    openNav
                                                        ? "hidden"
                                                        : "w-0 opacity-0 overflow-hidden absolute  bg-white font-semibold whitespace-pre text-gray-900 rounded-xl drop-shadow-lg px-0 py-0 group-hover:px-4 group-hover:py-2 left-[68px] duration-100 group-hover:w-auto group-hover:opacity-100 transition-all bottom-1"
                                                }
                                            >
                                                {subMenu.Title}
                                            </h2>
                                            <div
                                                className={`transition-transform flex  duration-500 ease-in-out ${
                                                    openNav
                                                        ? "group-hover:translate-x-2"
                                                        : "justify-center items-center"
                                                } gap-2`}
                                            >
                                                <div>{subMenu.icon}</div>
                                                <div
                                                    className={`transition-all ease-in-out overflow-hidden ${
                                                        openNav
                                                            ? "max-w-full opacity-100 delay-300  duration-500"
                                                            : "max-w-[0] opacity-0 duration-100"
                                                    }`}
                                                    style={{
                                                        minWidth: openNav
                                                            ? "max-content"
                                                            : "max-content",
                                                    }}
                                                >
                                                    {subMenu.Title}
                                                </div>
                                            </div>
                                        </div>
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
