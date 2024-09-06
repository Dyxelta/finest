import { formatToRupiah } from "@/Helpers/helperFormat";
import React, { useEffect, useRef, useState } from "react";
import { CgNotes } from "react-icons/cg";


const SummaryReportOverview = ({ totalIncome, totalExpense, note }) => {
    const progressBarRef = useRef(null);
    const [length, setLength] = useState();
    useEffect(() => {
        if (progressBarRef.current) {
            const progressBarWidth = progressBarRef.current.offsetWidth;
            setLength(progressBarWidth);
        }
    }, []);

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
                <div className="w-full button md:header-5 border-b border-primary py-1">
                    Total Balance:
                </div>
            </div>
            <div className="flex flex-col h-full pt-2 w-full gap-2">
                <div className="rounded-xl bg-background py-4 px-4">
                    <div className="flex justify-between items-center button">
                        <div>Total Income</div>
                        <div className="body">
                            {formatToRupiah(totalIncome)}
                        </div>
                    </div>
                    <div
                        className="border-primary border h-3 md:h-5 w-full rounded-full relative overflow-hidden mt-2"
                        ref={progressBarRef}
                    >
                        <div
                            className="absolute left-0 bg-primary h-full rounded-full"
                            style={{
                                width: `${Math.ceil(120)}px`,
                            }}
                        ></div>
                    </div>
                </div>

                <div className="rounded-xl bg-background py-4 px-4">
                    <div className="flex justify-between items-center button">
                        <div>Total Expense</div>
                        <div className="body">
                            {formatToRupiah(totalExpense)}
                        </div>
                    </div>
                    <div
                        className="border-primary border h-3 md:h-5 w-full rounded-full relative overflow-hidden mt-2"
                        ref={progressBarRef}
                    >
                        <div
                            className="absolute left-0 bg-primary h-full rounded-full"
                            style={{
                                width: `${Math.ceil(120)}px`,
                            }}
                        ></div>
                    </div>
                </div>

                {note && (
                    <div>
                        <span className="sub-body-bold md:button text-primary">
                            Note:{" "}
                        </span>
                        {note}
                    </div>
                )}
            </div>
        </React.Fragment>
    );
};

export default SummaryReportOverview;
