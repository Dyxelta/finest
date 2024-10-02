import AlertModal from "@/Components/Modal/AlertModal";
import AddWalletPopup from "@/Components/Modal/Popup/AddWalletPopup";
import { ReusableDecorBackground } from "@/Helpers/reusableDecorBackground";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { useState } from "react";
import DecorBG1 from "../../../public/image/public/DecorBG1.png";
import DecorBG2 from "../../../public/image/public/DecorBG2.png";
import AllWalletOverview from "@/Components/Dashboard/firstGrid/AllWalletOverview";
import { FaWallet } from "react-icons/fa";
import ShowNetIncomeOverview from "@/Components/Dashboard/firstGrid/ShowNetIncomeOverview";
import CustomTooltip from "@/Helpers/Tooltip";
import { CgNotes } from "react-icons/cg";
import CashflowGraph from "@/Components/Dashboard/secondGrid/CashflowGraph";
import { GrHistory } from "react-icons/gr";
import { Button } from "reactstrap";
import { TbArrowNarrowLeft, TbArrowNarrowRight } from "react-icons/tb";
import PrimaryButton from "@/Components/PrimaryButton";
import LatestTransaction from "@/Components/Dashboard/fourthGrid/LatestTransaction";
import IncomeExpenseThisMonth from "@/Components/Dashboard/secondGrid/IncomeExpenseThisMonth";
import { BsGraphDownArrow, BsGraphUpArrow } from "react-icons/bs";

export default function Dashboard({
    auth,
    wallets,
    transactions,
    summary_report_data,
    current_month_net_income,
    last_month_net_income,
    current_month_total_income,
    current_month_total_expense,
    total_balance,
    top_budgets,
}) {
    const [checkWallet, setCheckWallet] = useState(
        wallets && wallets.length !== 0 ? false : true
    );
    const [Popup, setPopup] = useState();
console.log(top_budgets,"huiguhsogduihgsfdig")
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

            <div className="grid grid-cols-7 grid-rows-2 w-full  gap-2 sm:px-8 text-primary z-0 relative font-roboto">
                <div className="col-span-5 grid grid-cols-8  gap-2 relative">
                    <div className="col-span-4 relative bg-light p-2 rounded-md">
                        <ReusableDecorBackground
                            DecorBG={DecorBG1}
                            className=" absolute right-[-110px] top-[-80px] w-[250px] h-[300px] -z-0"
                        >
                            <AllWalletOverview
                                total_balance={total_balance}
                                wallets={wallets}
                            />
                        </ReusableDecorBackground>
                    </div>
                    <div className="col-span-4 relative bg-light p-2 rounded-md">
                        <ReusableDecorBackground
                            DecorBG={DecorBG1}
                            className="absolute top-[-130px] left-[-80px] w-[250px] h-[300px] -z-0 rotate-[270deg]"
                        >
                            <div className="flex w-full justify-end z-50 items-center px-1 lg:px-4 relative">
                                <div className="flex items-center gap-1 lg:gap-2 mt-2">
                                    <div className="sub-body-bold lg:button    bg-light rounded-md px-4 py-2 m">
                                        Net Income Overview{" "}
                                        <CustomTooltip content="Net Income Overview displays the net income for the selected month, along with the previous month's figure." />
                                    </div>
                                    <div className="sub-body-bold lg:button  bg-light rounded-full p-3 ">
                                        {" "}
                                        <CgNotes />
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center w-full md:w-[95%] mx-auto relative px-2 h-full mt-2">
                                <ShowNetIncomeOverview
                                    current_month_net_income={
                                        current_month_net_income
                                    }
                                    last_month_net_income={
                                        last_month_net_income
                                    }
                                />
                            </div>
                        </ReusableDecorBackground>
                    </div>
                </div>
                <div className="col-span-2  row-span-2 bg-light rounded-md p-2">
                    <ReusableDecorBackground>
                        
                    </ReusableDecorBackground>
                </div>
                <div className="col-span-5 bg-light rounded-md grid grid-cols-9 p-2 gap-2 ">
                    {" "}
                    <div className="col-span-5  grid grid-cols-4  grid-rows-5">
                        <div className="col-span-4 row-span-1 header-5 flex items-center gap-2">
                            <div className="rounded-md bg-background p-2 ">
                                <FaWallet />
                            </div>
                            <div>
                                Cashflow Overview{" "}
                                <CustomTooltip content="Net Income Overview displays the net income for the selected month, along with the previous month's figure." />
                            </div>
                        </div>
                        <div className="col-span-4 flex row-span-4 gap-2">
                            {" "}
                            <div className="flex-1 relative">
                                <ReusableDecorBackground
                                    DecorBG={DecorBG2}
                                    className=" absolute right-[-120px] bottom-[-180px] min-w-[400px] h-[300px] -z-0"
                                >
                                    <IncomeExpenseThisMonth
                                        type={"Income"}
                                        amount={current_month_total_income}
                                        icon={<BsGraphUpArrow />}
                                    />
                                </ReusableDecorBackground>
                            </div>
                            <div className="flex-1 relative">
                                <ReusableDecorBackground
                                    DecorBG={DecorBG2}
                                    className=" absolute right-[-120px] bottom-[-180px] min-w-[400px] h-[300px] -z-0"
                                >
                                    <IncomeExpenseThisMonth
                                        type={"Expense"}
                                        amount={Math.abs(
                                            current_month_total_expense
                                        )}
                                        icon={<BsGraphDownArrow />}
                                    />
                                </ReusableDecorBackground>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-4 relative  rounded-md">
                        <ReusableDecorBackground
                            DecorBG={DecorBG1}
                            className=" absolute left-[-90px] top-[-85px] w-[250px] h-[300px] -z-0 rotate-[265deg]"
                        >
                            <CashflowGraph
                                current_month_total_income={
                                    current_month_total_income
                                }
                                current_month_total_expense={
                                    current_month_total_expense
                                }
                            />
                        </ReusableDecorBackground>
                    </div>
                </div>

                <AlertModal
                    show={checkWallet}
                    maxWidth="md"
                    headerColor={"blue"}
                    title={"Alert "}
                    content={
                        "It seems you have no wallet!<br />You need at least one wallet to continue.<br />Let's create one now!"
                    }
                    showButton={true}
                    onClose={() => {
                        setPopup(true);
                        setCheckWallet(false);
                    }}
                />
                <AddWalletPopup
                    show={Popup}
                    showCancel={false}
                    headerColor={"blue"}
                    onClose={() => {
                        setPopup(false);
                    }}
                />
            </div>
            <div className="mt-2  sm:px-8  h-fit">
                <div className=" bg-light p-3 rounded-md h-fit ">
                    <LatestTransaction transactions={transactions} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
