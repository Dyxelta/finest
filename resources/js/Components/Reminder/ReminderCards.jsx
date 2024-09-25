import moment from "moment";
import React from "react";
import { HiBell } from "react-icons/hi";

const ReminderCards = ({reminder}) => {
    const isWarning = reminder.message.includes("Budget Limit Warning!")

    return (
        <div className="flex mt-2 gap-2 border-b border-primary pb-2 mx-auto w-[90%]">
            <div className={`text-primary text-[24px] border ${isWarning ? 'border-warning': 'border-expense'} rounded-full h-fit  p-1 mt-2`}>
                <HiBell color={isWarning ? '#ECE41D' : '#C02317'}/>
            </div>
            <div className="flex flex-col items-start w-full">
                <div className="text-grey sub-body ">{moment(reminder.created_at).format("DD MMMM YYYY")}</div>
                <div className={`sub-body-14-bold ${isWarning ? "text-warning" : "text-expense"}`}>{isWarning ? "Budget Limit Warning!" : "Budget Limit Over!"}</div>
                <div className="sub-body">{isWarning ? reminder.message.replace("Budget Limit Warning!", "") : reminder.message.replace("Budget Limit Over!", "")}</div>
            </div>
        </div>
    );
};

export default ReminderCards;
