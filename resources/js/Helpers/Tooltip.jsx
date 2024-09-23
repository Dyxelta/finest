import { Button, Tooltip } from "@material-tailwind/react";
import React from "react";
import { FaCircleExclamation } from "react-icons/fa6";

const CustomTooltip = ({content}) => {
    return (
        <Tooltip content={content} className="bg-primary w-72">
            <Button className="p-0 m-0 body rounded-full border-2 shadow-none bg-primary w-fit h-fit">
                <div className="border border-primary w-fit h-fit rounded-full">
                    <FaCircleExclamation />
                </div>
            </Button>
        </Tooltip>
    );
};

export default CustomTooltip;
