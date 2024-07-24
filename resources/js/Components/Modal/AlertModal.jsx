import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Button } from "reactstrap";
import { AiOutlineExclamationCircle } from "react-icons/ai";

export default function AlertModal({
    title,
    headerColor,
    show = false,
    maxWidth = "2xl",
    content,
    onClose = () => {},
    showButton = false,
}) {
    const close = () => {
        onClose();
    };

    const removeClose = () => {

    }
    
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
        green: "bg-income",
    }[headerColor];

    const titleColor = {
        red: "text-expense ",
        blue: "text-primary ",
        green: "text-income ",
    }[headerColor];

    return (
        <Transition show={show} as={Fragment} leave="duration-200 font-roboto">
            <Dialog
                as="div"
                id="modal"
                className="fixed inset-0 flex overflow-y-auto px-4 py-6 sm:px-0 items-center z-50 transform transition-all"
                onClose={removeClose}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="absolute inset-0 bg-gray-500/75" />
                </Transition.Child>

                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <Dialog.Panel
                        className={`mb-4 bg-light rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full sm:mx-auto flex flex-col justify-center items-center py-4 text-center ${maxWidthClass}`}
                    >
                        <AiOutlineExclamationCircle
                            size={120}
                            className={`${titleColor}`}
                        />
                        <h2 className={`text-[32px] font-[600] ${titleColor}`}>{title}</h2>
                        <div className="p-4 w-full">
                            <span
                                className="header-5-light text-grey"
                                dangerouslySetInnerHTML={{
                                    __html: content,
                                }}
                            ></span>
                            <div className="w-full mt-4 ">
                                {showButton && (
                                    <Button
                                        onClick={() => close()}
                                        className={`self-end mt-2 mb-1 ${bgColor} px-6 py-2 rounded-md body hover:opacity-90 transition-opacity duration-300`}
                                    >
                                        Confirm
                                    </Button>
                                )}
                            </div>
                        </div>
                    </Dialog.Panel>
                </Transition.Child>
            </Dialog>
        </Transition>
    );
}
