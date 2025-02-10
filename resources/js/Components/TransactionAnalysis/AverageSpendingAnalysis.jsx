import { formatToRupiah } from "@/Helpers/helperFormat";
import {
    getProgressBarBorder,
    getProgressBarColor,
} from "@/Helpers/progressBar";
import { getRemainingDays } from "@/Helpers/remainingDays";
import CustomTooltip from "@/Helpers/Tooltip";
import { useEffect, useRef, useState } from "react";
import { CgNotes } from "react-icons/cg";

const AverageSpendingAnalysis = ({
    average_transaction_last_six_month,
    lowest_transaction,
    highest_transaction,
    total_transaction_this_month,
    currCategory,
}) => {
    console.log(currCategory, "uisdfhhuguiohuhiosdfg");
    const progressBarRef = useRef();
    const [length, setLength] = useState();
    useEffect(() => {
        if (progressBarRef.current) {
            const progressBarWidth = progressBarRef.current.offsetWidth;
            setLength(progressBarWidth);
        }
    }, []);

    const showAverageSpendingLimit = () => {
        const finalResult =
            Math.abs(average_transaction_last_six_month?.average_total) -
            Math.abs(total_transaction_this_month?.total_transaction);
        const getProgressBarPercentage =
            Math.abs(total_transaction_this_month?.total_transaction) /
            Math.abs(average_transaction_last_six_month?.average_total);

        console.log(
            average_transaction_last_six_month?.average_total,
            total_transaction_this_month?.total_transaction
        );
        const currProgressLength = length * getProgressBarPercentage;

        if (finalResult < 0) {
            return (
                <div className="flex items-end w-full flex-col body">
                    <div className="flex items-center justify-between w-full text-expense">
                        <div>
                            {formatToRupiah(
                                Math.abs(
                                    total_transaction_this_month?.total_transaction
                                )
                            )}{" "}
                            /{" "}
                            {formatToRupiah(
                                Math.abs(
                                    average_transaction_last_six_month?.average_total
                                )
                            )}
                        </div>
                        <div className="sub-body md:body">100%</div>
                    </div>
                    <div
                        className="border-expense border h-5 w-full rounded-full relative overflow-hidden mt-2"
                        ref={progressBarRef}
                    >
                        <div className="absolute left-0 bg-expense w-full h-full"></div>
                    </div>
                </div>
            );
        } else if (
            Math.abs(total_transaction_this_month?.total_transaction) <= 0
        ) {
            return (
                <div className="flex items-end w-full flex-col body">
                    <div className="flex items-center justify-between w-full">
                        <div className="text-primary">
                            {formatToRupiah(
                                Math.abs(
                                    total_transaction_this_month?.total_transaction
                                )
                            )}{" "}
                            /{" "}
                            {formatToRupiah(
                                Math.abs(
                                    average_transaction_last_six_month?.average_total
                                )
                            )}
                        </div>
                        <div className="sub-body md:body">0%</div>
                    </div>
                    <div
                        className="border-primary border h-5 w-full rounded-full relative overflow-hidden mt-2"
                        ref={progressBarRef}
                    >
                        <div className="absolute left-0 bg-primary w-0 h-full"></div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="flex w-full flex-col body">
                    <div className="flex items-center justify-between">
                        <div className="sub-body md:body">
                            {formatToRupiah(
                                Math.abs(
                                    total_transaction_this_month?.total_transaction
                                )
                            )}{" "}
                            /{" "}
                            {formatToRupiah(
                                Math.abs(
                                    average_transaction_last_six_month?.average_total
                                )
                            )}
                        </div>
                        <div className="sub-body md:body">
                            {(getProgressBarPercentage * 100).toFixed(2)}%
                        </div>
                    </div>
                    <div
                        className={`${getProgressBarBorder(
                            getProgressBarPercentage * 100
                        )} border h-3 md:h-5 w-full rounded-full relative overflow-hidden mt-2`}
                        ref={progressBarRef}
                    >
                        <div
                            className={`absolute left-0 ${getProgressBarColor(
                                getProgressBarPercentage * 100
                            )} h-full rounded-full`}
                            style={{
                                width: `${Math.ceil(currProgressLength)}px`,
                            }}
                        ></div>
                    </div>
                </div>
            );
        }
    };

    const AverageSpendingRecommendation = (values) => {
        const dayDifference = getRemainingDays();

        return values / dayDifference;
    };
    return (
        <div className="bg-light w-full flex-1 rounded-md flex flex-col py-3 px-3 md:px-6  text-primary">
            <div className="flex items-center gap-2 ">
                <div className="header-5">
                    {" "}
                    <CgNotes />
                </div>
                <div className="sub-body md:button lg:header-5">
                    This Month Analysis{" "}
                    <CustomTooltip content="Shows the information of the average total expense based on all expense transaction records." />
                </div>
            </div>
            <div className=" flex items-center justify-center gap-2 pt-2 md:p-1 ">
                <box-icon
                    type="solid"
                    name={currCategory?.icon}
                    color="#2D5074"
                ></box-icon>

                <span className="header-5">{currCategory?.category_name}</span>
            </div>
            <div className="flex  mt-2 flex-wrap w-full">
                <div className="flex gap-2 mb-2 w-full">
                    {showAverageSpendingLimit()}
                </div>
                <div className="flex gap-2  w-full flex-col lg:flex-row">
                    <div className="bg-background flex flex-row p-2 md:p-4 rounded-md justify-between mt-2 w-full gap-2 ">
                        <div className="flex flex-col ">
                            <div className="sub-body-bold md:button ">
                                Available Balance Left:
                            </div>

                            <div className="sub-body md:body ">
                                {Math.abs(
                                    average_transaction_last_six_month?.average_total
                                ) +
                                    total_transaction_this_month?.total_transaction >
                                0
                                    ? formatToRupiah(
                                          Math.abs(
                                              average_transaction_last_six_month?.average_total +
                                                  Math.abs(
                                                      total_transaction_this_month?.total_transaction
                                                  )
                                          )
                                      )
                                    : "0"}
                            </div>
                        </div>
                        <div className="flex flex-col ">
                            <div className="sub-body-bold md:button ">
                                Spending Limit:
                            </div>
                            <div className="sub-body md:body ">
                                {Math.abs(
                                    average_transaction_last_six_month?.average_total
                                ) +
                                    total_transaction_this_month?.total_transaction >
                                0
                                    ? formatToRupiah(
                                          AverageSpendingRecommendation(
                                              Math.round(
                                                  Math.abs(
                                                      average_transaction_last_six_month?.average_total +
                                                          Math.abs(
                                                              total_transaction_this_month?.total_transaction
                                                          )
                                                  )
                                              )
                                          )
                                      )
                                    : "0"}
                            </div>
                        </div>
                        <div className="flex flex-col ">
                            <div className="sub-body-bold md:button ">
                                Status:
                            </div>

                            <div className="sub-body md:body ">
                                {AverageSpendingRecommendation(
                                    total_transaction_this_month?.total_transaction -
                                        average_transaction_last_six_month?.average_total
                                ) < 0 ? (
                                    <span className="text-expense">
                                        Spending Limit Overspent
                                    </span>
                                ) : (
                                    "Within Spending Limit"
                                )}
                            </div>
                        </div>
                    </div>

                    {AverageSpendingRecommendation(
                        total_transaction_this_month?.total_transaction -
                            average_transaction_last_six_month?.average_total
                    ) < 0 ? (
                        <div className="p-2 md:p-4 rounded-md justify-between mt-2  w-full sub-body md:body">
                            <span className="sub-body-bold md:button">
                                Notes:{" "}
                            </span>
                            You have overspent by{" "}
                            <span className="text-expense">
                                {formatToRupiah(
                                    Math.round(
                                        total_transaction_this_month?.total_transaction -
                                            average_transaction_last_six_month?.average_total
                                    )
                                )}
                            </span>{" "}
                            and exceeded your
                            <span className="text-expense">
                                {" "}
                                Average Spending Limit!
                            </span>
                        </div>
                    ) : (
                        <div className="p-2 md:p-4 rounded-md justify-between mt-2 w-full sub-body md:body">
                            <span className="sub-body-bold md:button">
                                Notes:{" "}
                            </span>
                            Spend no more than{" "}
                            <span className="sub-body-bold md:button">
                                {formatToRupiah(
                                    AverageSpendingRecommendation(
                                        Math.round(
                                            Math.abs(
                                                average_transaction_last_six_month?.average_total +
                                                    Math.abs(
                                                        total_transaction_this_month?.total_transaction
                                                    )
                                            )
                                        )
                                    )
                                )}{" "}
                                per day
                            </span>{" "}
                            in order to avoid overspending your
                            <span className="sub-body-bold md:button">
                                {" "}
                                Average Spending Limit!
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AverageSpendingAnalysis;
