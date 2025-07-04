import { AiOutlineExclamationCircle } from "react-icons/ai";
import { Button } from "reactstrap";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

export default function CustomShowAlertModal({
    title,
    headerColor,
    maxWidth = "md",
    content,
    onClose = () => {},
    showButton,
    success,
    showCancel,
    exit
}) {
    const maxWidthClass = {
        sm: "sm:max-w-sm",
        md: "sm:max-w-md",
        lg: "sm:max-w-lg",
        xl: "sm:max-w-xl",
        "2xl": "sm:max-w-2xl",
    }[maxWidth];

    const bgColor = {
        red: "bg-expense text-light",
        blue: "bg-primary text-light",
    }[headerColor];

    const titleColor = {
        red: "text-expense ",
        blue: "text-primary ",
    }[headerColor];

    return (
        <div
            className={` rounded-lg overflow-hidden transform transition-all sm:w-full sm:mx-auto flex flex-col justify-center items-center py-4 text-center ${maxWidthClass}`}
        >
            {success ? (
                <IoIosCheckmarkCircleOutline
                    size={140}
                    className={`${titleColor} mb-4`}
                />
            ) : (
                <AiOutlineExclamationCircle
                    size={120}
                    className={`${titleColor} mb-4`}
                />
            )}
            <h2 className={`text-[32px] font-[600] ${titleColor}`}>{title}</h2>
            <div className="p-4 w-full">
                <span className="header-5-light text-black">{content}</span>
                <div className="w-full mt-4 flex items-center gap-4 justify-center">
                    {showCancel && (
                        <Button
                            onClick={() => exit()}
                            className={`self-end mt-2 mb-1  outline-expense outline-1 px-6 py-2 rounded-md body hover:opacity-90 transition-opacity duration-300 text-expense`}
                        >
                            Cancel
                        </Button>
                    )}
                    {showButton && (
                        <Button
                            onClick={() => onClose()}
                            className={`self-end mt-2 mb-1 ${bgColor} px-8 py-2 rounded-md body hover:opacity-90 transition-opacity duration-300`}
                        >
                            Confirm
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
