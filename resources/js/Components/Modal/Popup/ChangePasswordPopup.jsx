import CustomField from "@/Components/CustomInput/CustomField";
import CustomLabel from "@/Components/CustomLabel";
import Loader from "@/Components/Loader";
import PrimaryButton from "@/Components/PrimaryButton";
import { showErrorModal, showSuccessModal } from "@/Helpers/utils";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import { Form, Formik } from "formik";
import { Fragment, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Button, FormGroup } from "reactstrap";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    wallet_name: Yup.string().required("Wallet name is required"),
    wallet_balance: Yup.number()
        .typeError("Balance must be number")
        .required("Wallet balance is required"),
    description: Yup.string(),
});

export default function ChangePasswordPopup({
    headerColor,
    show = false,
    maxWidth = "2xl",
    showCancel = true,

    onClose = () => {},
}) {
    const [loading, setLoading] = useState(false);
    const { setData, put } = useForm({
        current_password: "",
        new_password: "",
        confirm_password: "",
    });

    const openModal = (error) => {
        showErrorModal("Error", error);
    };

    const closeModal = () => {
        setLoading(false);
        onClose();
        showSuccessModal("Success", "Wallet has been created successfully");
    };

    const close = () => {
        setLoading(true);
        put(route("editPassword"), {
            onError: (errors) => {
                if (errors.current_password) {
                    openModal(errors.current_password);
                } else if (errors.new_password) {
                    openModal(errors.new_password);
                } else if (errors.confirm_password) {
                    openModal(errors.confirm_password);
                }
            },
            onSuccess: () => closeModal(),
        });
    };
    const empty = () => {
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
        <Transition show={show} as={Fragment} leave="duration-200 ease-in-out">
            <Dialog
                as="div"
                id="modal"
                className="fixed inset-0 flex overflow-y-auto px-4 py-6 sm:px-0 items-center z-50 transform transition-all"
                onClose={() => empty()}
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
                            <Button
                                className="bg-white-primary p-3 rounded-md text-primary header-4"
                                onClick={onClose}>
                                <IoIosArrowBack />
                            </Button>
                            <div className="flex flex-col">
                                <h1 className="text-primary header-4">
                                    Change Password
                                </h1>
                            </div>
                        </div>
                        <Formik
                            initialValues={{
                                current_password: "",
                                new_password: "",
                                confirm_password: "",
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
                                        <FormGroup className="flex-1">
                                            <CustomLabel
                                                labelFor="Current Password"
                                                className="button text-primary"
                                            />
                                            <CustomField
                                                id="current_password"
                                                name="current_password"
                                                placeholder="Enter your current password"
                                                type="password"
                                                className="w-full mt-1"
                                                onChange={(e) => {
                                                    setFieldValue(
                                                        "current_password",
                                                        e.target.value
                                                    );
                                                    setData(
                                                        "current_password",
                                                        e.target.value
                                                    );
                                                }}
                                            />
                                        </FormGroup>

                                        <FormGroup className="flex-1">
                                            <CustomLabel
                                                labelFor="New Password"
                                                className="button text-primary"
                                            />
                                            <CustomField
                                                id="new_password"
                                                name="new_password"
                                                placeholder="Enter your new password"
                                                type="password"
                                                className="w-full mt-1"
                                                onChange={(e) => {
                                                    setFieldValue(
                                                        "new_password",
                                                        e.target.value
                                                    );
                                                    setData(
                                                        "new_password",
                                                        e.target.value
                                                    );
                                                }}
                                            />
                                        </FormGroup>

                                        <FormGroup className="mt-1 w-full">
                                            <CustomLabel
                                                labelFor="Confirm Password"
                                                className="button text-primary"
                                            />
                                            <CustomField
                                                id="current_password"
                                                name="current_password"
                                                placeholder="Confirm your new password"
                                                type="password"
                                                className="w-full mt-1 resize-none"
                                                onChange={(e) => {
                                                    setFieldValue(
                                                        "current_password",
                                                        e.target.value
                                                    );
                                                    setData(
                                                        "current_password",
                                                        e.target.value
                                                    );
                                                }}
                                            />
                                        </FormGroup>

                                        <div className="p-4 w-full">
                                            <div className="w-full flex justify-end items-center">
                                                <PrimaryButton
                                                    type="submit"
                                                    className={`self-end mt-2  ${titleColor} !px-10 py-2 rounded-md body mr-2 transition-colors hover:bg-darker-primary duration-300 ease-in-out flex items-center`}
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
                                                        "Save"
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
