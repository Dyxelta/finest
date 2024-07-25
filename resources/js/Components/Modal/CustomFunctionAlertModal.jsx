import { AiOutlineExclamationCircle } from "react-icons/ai";
import { Button } from "reactstrap";

export default function CustomShowAlertModal({
    title,
    headerColor,
    maxWidth = "md",
    content,
    onClose = () => {},
    showButton,

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
            <AiOutlineExclamationCircle
                size={120}
                className={`${titleColor} mb-4`}
            />
            <h2 className={`text-[32px] font-[600] ${titleColor}`}>
                {title}
            </h2>
            <div className="p-4 w-full">
                <span className="header-5-light text-black">{content}</span>
                <div className="w-full mt-4">
                    {showButton && (
                        <Button
                            onClick={onClose}
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