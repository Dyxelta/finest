import { formatToRupiah } from "@/Helpers/helperFormat";
import React, { useEffect, useRef, useState } from "react";
import { CgNotes } from "react-icons/cg";

const SummaryReportOverview = ({ summary_report }) => {
    const progressBarRef = useRef(null);
    const [length, setLength] = useState();
    useEffect(() => {
        if (progressBarRef.current) {
            const progressBarWidth = progressBarRef.current.offsetWidth;
            setLength(progressBarWidth);
        }
    }, []);

    const totalAbsoluteResult =
        summary_report?.income + Math.abs(summary_report?.expense);

    const getProgressLength = (value) => {
        return Math.ceil((value / totalAbsoluteResult) * length);
    };

    const getPercentageLength = (value) => {
        return Math.ceil((value / totalAbsoluteResult) * 100);
    };
    return (
        <React.Fragment>
            <div className="flex flex-col w-full gap-4">
                <div className="flex items-center gap-2">
                    <div className="header-5">
                        <CgNotes />
                    </div>
                    <div className="sub-body md:button lg:header-5">
                        Summary Report
                    </div>
                </div>
            </div>
            <div className="flex flex-col h-full  w-full gap-2">
                <div className="rounded-xl bg-background py-2 md:py-4 px-2 md:px-4 mt-1 md:mt-6">
                    <div className="flex justify-between items-center button">
                        <div className="sub-body-bold md:body">Total Income</div>
                        <div className="sub-body-bold md:body">
                            {formatToRupiah(summary_report?.income)}
                        </div>
                    </div>
                    <div
                        className="border-primary border h-4 md:h-5 w-full rounded-full relative overflow-hidden mt-2 bg-lighter-primary"
                        ref={progressBarRef}
                    >
                        <div
                            className="absolute left-0 bg-primary h-full rounded-full  "
                            style={{
                                width: `${getProgressLength(
                                    summary_report?.income
                                )}px`,
                            }}
                        ></div>
                        <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-light sub-body">
                            {getPercentageLength(summary_report?.income)}%
                        </div>
                    </div>
                </div>

                <div className="rounded-xl bg-background py-2 md:py-4 px-2 md:px-4 md:mb-4 lg:mb-6">
                    <div className="flex justify-between items-center button">
                        <div className="sub-body-bold md:body">Total Expense</div>
                        <div className="sub-body-bold md:body">
                            {formatToRupiah(summary_report?.expense)}
                        </div>
                    </div>
                    <div className="border-primary border h-4 md:h-5 w-full rounded-full relative overflow-hidden mt-2 bg-lighter-primary">
                        <div
                            className="absolute left-0 bg-primary h-full rounded-full  "
                            style={{
                                width: `${getProgressLength(
                                    summary_report?.expense
                                )}px`,
                            }}
                        ></div>
                        <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-light sub-body">
                            {getPercentageLength(summary_report?.expense)}%
                        </div>
                    </div>
                </div>

                <div>
                    <span className="sub-body-bold lg:button text-primary mx-1">
                        Note:{" "}
                        {getPercentageLength(summary_report?.expense) > 50 ? (
                            <>
                                <span className="text-expense">Oh No!</span>{" "}
                                <span className="sub-body lg:body">
                                    looks like you went overboard with your
                                    expense, please make sure to properly
                                    balance your expense and income
                                </span>
                            </>
                        ) : (
                            <>
                                <span className="text-expense">
                                    Well done!{" "}
                                </span>
                                <span className="sub-body lg:body">
                                    Your income exceeds your expenses. Keep up
                                    the great financial management!
                                </span>
                            </>
                        )}
                    </span>
                </div>
            </div>
        </React.Fragment>
    );
};

export default SummaryReportOverview;
