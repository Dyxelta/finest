import CustomField from "@/Components/CustomInput/CustomField";
import CustomLabel from "@/Components/CustomLabel";
import { Dialog, Transition } from "@headlessui/react";
import { Link } from "@inertiajs/react";
import { Form, Formik } from "formik";
import { Fragment } from "react";
import { FaWallet } from "react-icons/fa";
import { Button, FormGroup } from "reactstrap";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    wallet_name: Yup.string().required("Wallet name is required"),
    wallet_balance: Yup.number().required("Wallet balance is required"),
    description: Yup.string(),
});

export default function AddWalletPopup({
    children,
    headerColor,
    show = false,
    maxWidth = "2xl",
    content,
    onClose = () => {},
    showButton = false,
}) {
    const close = () => {
      
    };

    const maxWidthClass = {
        sm: "sm:max-w-sm",
        md: "sm:max-w-md",
        lg: "sm:max-w-lg",
        xl: "sm:max-w-xl",
        "2xl": "sm:max-w-2xl",
    }[maxWidth];

    const titleColor = {
        red: "bg-red-500 text-light",
        blue: "bg-blue-500 text-light",
        green: "bg-green-500 text-light",
    }[headerColor];

    return (
        <Transition show={show} as={Fragment} leave="duration-200 ease-in-out">
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
                        className={`py-2 px-4 mb-6 bg-light rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full mx-auto ${maxWidthClass}`}
                    >
                        <div
                            className={`text-light px-2 py-3 flex items-center gap-2 border-b border-grey ${titleColor}`}
                        >
                            <div className="bg-lighter-primary p-3 rounded-md text-primary">
                                <FaWallet size={24} />
                            </div>
                            <div className="flex flex-col">
                                <h1 className="text-primary header-5">
                                    Add Wallet
                                </h1>
                                <h5 className="text-light-grey body">
                                    Add New Wallet
                                </h5>
                            </div>
                        </div>
                        <Formik
                            initialValues={{
                                wallet_name: "",
                                wallet_balance: "",
                                description: "",
                            }}
                            validationSchema={validationSchema}
                            onSubmit={close}
                        >
                            {({
                                errors,
                                touched,
                                setFieldValue,
                                handleSubmit,
                            }) => (
                                <Form
                                    onSubmit={handleSubmit}
                                    className="font-roboto flex flex-col justify-center  w-full h-full"
                                >
                                    <div className="flex flex-col justify-between bg-light px-2 sm:px-4 pt-3 md:pt-3 pb-2 md:pb-3 w-full rounded-md ">
                                        <FormGroup className="w-full sm:flex  gap-2">
                                            <FormGroup className="flex-1">
                                                <CustomLabel
                                                    labelFor="Wallet Name"
                                                    className="button text-primary"
                                                />
                                                <CustomField
                                                    id="wallet_name"
                                                    name="wallet_name"
                                                    placeholder="Wallet Name"
                                                    type="text"
                                                    className="w-full mt-1"
                                                    onChange={(e) => {
                                                        setFieldValue(
                                                            "wallet_name",
                                                            e.target.value
                                                        );
                                                    }}
                                                />
                                            </FormGroup>

                                            <FormGroup className="flex-1">
                                                <CustomLabel
                                                    labelFor="Initial Wallet Balance"
                                                    className="button text-primary"
                                                />
                                                <CustomField
                                                    id="wallet_balance"
                                                    name="wallet_balance"
                                                    placeholder="Wallet Balance"
                                                    type="number"
                                                    className="w-full mt-1"
                                                    onChange={(e) => {
                                                        setFieldValue(
                                                            "wallet_balance",
                                                            e.target.value
                                                        );
                                                    }}
                                                />
                                            </FormGroup>
                                        </FormGroup>

                                        <FormGroup className="mt-3 md:mt-4 w-full">
                                            <CustomLabel
                                                labelFor="Description"
                                                className="button text-primary"
                                            />
                                            <CustomField
                                                id="description"
                                                name="description"
                                                placeholder="Description"
                                                component="textarea"
                                                className="w-full mt-1 resize-none"
                                                rows="4"
                                                cols="50"
                                                onChange={(e) => {
                                                    setFieldValue(
                                                        "description",
                                                        e.target.value
                                                    );
                                                }}
                                            />
                                        </FormGroup>

                                        <div className="p-4 w-full">
                                            <div className="w-full mt-4 flex justify-end">
                                                {showButton && (
                                                    <Button
                                                        onClick={close}
                                                        className={`self-end mt-2 mb-1 ${titleColor} px-6 py-2 rounded-md body mr-4`}
                                                    >
                                                        Confirm
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </Dialog.Panel>
                </Transition.Child>
            </Dialog>
        </Transition>
    );
}
