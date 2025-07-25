import CustomField from "@/Components/CustomInput/CustomField";
import CustomNumberInput from "@/Components/CustomInput/CustomNumberInput";
import CustomLabel from "@/Components/CustomLabel";
import ErrorMessageInput from "@/Components/Errors/ErrorMessage";
import Loader from "@/Components/Loader";
import PrimaryButton from "@/Components/PrimaryButton";
import { handleRefresh } from "@/Helpers/helperFormat";
import { showErrorModal, showSuccessModal } from "@/Helpers/utils";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import { Form, Formik } from "formik";
import { Fragment, useEffect, useState } from "react";
import { FaWallet } from "react-icons/fa";
import { Button, FormGroup } from "reactstrap";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    wallet_name: Yup.string()
        .required("Wallet name is required")
        .max(30, "Maximum 30 Characters"),
    wallet_balance: Yup.number()
        .typeError("Balance must be number")
        .required("Wallet balance is required"),
    description: Yup.string().max(150, "Maximum 150 Characters"),
});

export default function EditWalletPopup({
    headerColor,
    show = false,
    maxWidth = "2xl",
    showCancel = true,
    wallet,
    onClose = () => {},
}) {
    const [loading, setLoading] = useState(false);
    const { setData, put, data } = useForm({
        id: wallet?.id,
        wallet_name: wallet?.wallet_name,
        wallet_balance: wallet?.wallet_balance,
        wallet_description: wallet?.wallet_description,
    });

    useEffect(() => {
        setData({
            id: wallet?.id,
            wallet_name: wallet?.wallet_name,
            wallet_balance: wallet?.wallet_balance,
            wallet_description: wallet?.wallet_description,
        });
    }, [wallet]);

    const [error, setError] = useState();

    const openModal = () => {
        setLoading(false);
        showErrorModal("Error", error);
    };

    const closeModal = () => {
        setLoading(false);
        onClose();
        showSuccessModal("Success", "Wallet has been edited successfully", () =>
            handleRefresh()
        );
    };

    const close = () => {
        setLoading(true);
        put(route("editWallet"), {
            onError: (errors) => {
                if (errors.wallet_name) {
                    openModal();
                    setError(errors.wallet_name);
                } else if (errors.wallet_balance) {
                    openModal();
                    setError(errors.wallet_balance);
                } else if (errors.wallet_description) {
                    openModal();
                    setError(errors.wallet_description);
                }
            },
            onSuccess: () => closeModal(),
        });
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
        <Transition show={show} as={Fragment} leave="duration-200 ease-in-out">
            <Dialog
                as="div"
                id="modal"
                className="fixed inset-0 flex overflow-y-auto px-4 py-6 sm:px-0 items-center z-50 transform transition-all"
                onClose={() => onClose()}
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
                            className={`text-light px-2 py-3 flex items-center gap-2 border-b border-grey`}
                        >
                            <div className="bg-lighter-primary p-3 rounded-md text-primary">
                                <FaWallet size={24} />
                            </div>
                            <div className="flex flex-col">
                                <h1 className="text-primary header-4">
                                    Edit Wallet
                                </h1>
                                <h5 className="text-grey sub-body-14">
                                    Edit your existing wallet
                                </h5>
                            </div>
                        </div>
                        <Formik
                            initialValues={{
                                wallet_name: wallet?.wallet_name || "",
                                wallet_balance:
                                    Math.abs(wallet?.wallet_balance) || "",
                                wallet_description:
                                    wallet?.wallet_description || "",
                            }}
                            validationSchema={validationSchema}
                            onSubmit={close}
                            enableReinitialize={true}
                        >
                            {({
                                errors,
                                touched,
                                setFieldValue,
                                values,
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
                                                    placeholder="Name of the wallet"
                                                    type="text"
                                                    className="w-full mt-1"
                                                    values={values?.wallet_name}
                                                    onChange={(e) => {
                                                        setFieldValue(
                                                            "wallet_name",
                                                            e.target.value
                                                        );
                                                        setData(
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
                                                <CustomNumberInput
                                                    value={
                                                        values.wallet_balance
                                                    }
                                                    id="wallet_balance"
                                                    name="wallet_balance"
                                                    placeholder="Input the amount"
                                                    className="w-full mt-1"
                                                    onChange={(value) => {
                                                        setFieldValue(
                                                            "wallet_balance",
                                                            value
                                                        );
                                                        setData(
                                                            "wallet_balance",
                                                            value
                                                        );
                                                    }}
                                                />
                                                <ErrorMessageInput name="wallet_balance" />
                                            </FormGroup>
                                        </FormGroup>

                                        <FormGroup className="  w-full">
                                            <CustomLabel
                                                labelFor="Description"
                                                className="button text-primary"
                                                isRequired={false}
                                            />
                                            <CustomField
                                                id="wallet_description"
                                                name="wallet_description"
                                                placeholder="Describe your wallet "
                                                component="textarea"
                                                className="w-full mt-1 resize-none"
                                                rows="4"
                                                cols="50"
                                                onChange={(e) => {
                                                    setFieldValue(
                                                        "wallet_description",
                                                        e.target.value
                                                    );
                                                    setData(
                                                        "wallet_description",
                                                        e.target.value
                                                    );
                                                }}
                                            />
                                        </FormGroup>

                                        <div className="p-4 w-full">
                                            <div className="w-full flex justify-end items-center">
                                                {showCancel && (
                                                    <Button
                                                        onClick={onClose}
                                                        className={`self-end mt-2  border-expense border px-6 py-[7px] rounded-md body mr-4 text-expense transition-colors duration-500 hover:bg-expense hover:text-light`}
                                                    >
                                                        Cancel
                                                    </Button>
                                                )}
                                                <PrimaryButton
                                                    type="submit"
                                                    className={`self-end mt-2  ${titleColor} !px-10 py-2 rounded-md body mr-2 transition-colors hover:bg-darker-primary duration-300 ease-in-out`}
                                                    disabled={loading}
                                                    loading={loading}
                                                >
                                                    {loading ? (
                                                        <div className="flex items-center">
                                                            <Loader
                                                                className={`w-[30px] h-6 mr-1`}
                                                            />
                                                            <span>
                                                                Loading...
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        "Submit"
                                                    )}
                                                </PrimaryButton>
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
