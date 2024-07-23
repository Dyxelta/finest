import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Button } from "reactstrap";
import { AiOutlineExclamationCircle } from "react-icons/ai";

export default function CustomModal({
    children,
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

    const maxWidthClass = {
        sm: "sm:max-w-sm",
        md: "sm:max-w-md",
        lg: "sm:max-w-lg",
        xl: "sm:max-w-xl",
        "2xl": "sm:max-w-2xl",
    }[maxWidth];

    const titleColor = {
        red: "bg-expense text-light",
        blue: "bg-primary text-light",
        green: "bg-income text-light",
    }[headerColor];

    return (
        <Transition show={show} as={Fragment} leave="duration-200 font-roboto">
            <Dialog
                as="div"
                id="modal"
                className="fixed inset-0 flex overflow-y-auto px-4 py-6 sm:px-0 items-center z-50 transform transition-all"
                onClose={close}
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
                        className={`mb-6 bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full sm:mx-auto ${maxWidthClass}`}
                    >
                        <div
                            className={`bg-gray-100 px-4 py-2 flex justify-between items-center border-b border-gray-200 ${titleColor}`}
                        >
                            <h2 className={`text-lg font-medium `}>{title}</h2>
                            <button
                                type="button"
                                className="text-gray-400 hover:text-gray-500"
                                onClick={close}
                            >
                                <span className="sr-only">Close</span>
                                <svg
                                    className="h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="white"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div className="p-4 w-full">
                            <span className="header-5-light" >
                             {content}
                            </span>
                            <div className="w-full mt-4 flex justify-end ">
                                {showButton && (
                                    <Button onClick={() => close()} className={`self-end mt-2 mb-1 ${titleColor} px-6 py-2 rounded-md body mr-4`}>Confirm</Button>
                                )}
                            </div>
                        </div>
                    </Dialog.Panel>
                </Transition.Child>
            </Dialog>
        </Transition>
    );
}
