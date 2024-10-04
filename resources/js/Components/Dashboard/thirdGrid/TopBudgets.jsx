import { Link } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";
import { FaMoneyBillWave } from "react-icons/fa";
import { TbArrowNarrowRight } from "react-icons/tb";
import "boxicons";
import { formatToRupiah } from "@/Helpers/helperFormat";
import CustomTooltip from "@/Helpers/Tooltip";
const TopBudgets = ({ top_budgets }) => {
    const progressBarRef = useRef(null);
    const [length, setLength] = useState();

    useEffect(() => {
        if (progressBarRef.current) {
            const progressBarWidth = progressBarRef.current.offsetWidth;
            setLength(progressBarWidth);
        }
    }, []);

    const showSpendingLimit = (budget) => {
        const getLength = length * (budget?.percentage / 100);
        if (budget.percentage > 100) {
            return (
                <div className="flex items-end w-full flex-col body">
                    <div
                        className="border-primary border h-3 w-full rounded-full relative overflow-hidden mt-2 bg-background"
                        ref={progressBarRef}
                    >
                        <div className="absolute left-0 bg-primary w-full h-full rounded-full"></div>
                    </div>
                </div>
            );
        } else if (budget.percentage < 0) {
            return (
                <div className="flex items-end w-full flex-col body">
                    <div
                        className="border-primary border h-3 w-full rounded-full relative overflow-hidden mt-2 bg-background"
                        ref={progressBarRef}
                    >
                        <div
                            className="absolute left-0 bg-primary h-full rounded-full"
                            style={{ width: "0px" }}
                        ></div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="flex items-end w-full flex-col body">
                    <div
                        className="border-primary border h-3 w-full rounded-full relative overflow-hidden mt-2 bg-background"
                        ref={progressBarRef}
                    >
                        <div
                            className="absolute left-0 bg-primary h-full rounded-full"
                            style={{ width: getLength }}
                        ></div>
                    </div>
                </div>
            );
        }
    };
    return (
        <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col">
                <div className="flex items-center header-5 gap-2">
                    <div className="p-2 bg-background text-[28px] rounded-md">
                        <FaMoneyBillWave />
                    </div>
                    Top Budgets Overview
                    <CustomTooltip content="Top Budgets Overview displays your top 5 budgets with the most expenses" />
                </div>
                <div className="mt-3 flex flex-col gap-2 px-2">
                    {Object.values(top_budgets).map((budget) => (
                        <div className=" border-b border-primary pb-2 border-dashed">
                            <div className="flex justify-between">
                                <div className="flex button gap-2 items-center">
                                    <box-icon
                                        name={budget?.category.icon}
                                        type="solid"
                                        color={"#2D5074"}
                                        size="20px"
                                    />
                                    {budget?.budget_name}
                                </div>
                                <div>
                                    {budget?.percentage <= 100
                                        ? Math.round(budget?.percentage)
                                        : 100}{" "}
                                    %
                                </div>
                            </div>
                            <div>{showSpendingLimit(budget)}</div>
                            <div className="flex justify-between sub-body-14 mt-2">
                                {formatToRupiah(
                                    Math.abs(budget?.total_transaction_amount)
                                )}{" "}
                                / {formatToRupiah(budget?.budget_amount)}
                            </div>
                        </div>
                    ))}
                   
                    
                </div>
            </div>
            <div className="flex gap-2 items-center justify-center w-full hover:translate-x-2 duration-300 transition-all ease-in">
                <Link href={route("budgetPage")}>
                    <div className="flex items-center body">
                        View More <TbArrowNarrowRight />
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default TopBudgets;
