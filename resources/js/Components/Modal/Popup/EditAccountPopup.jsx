import CustomDatePicker from "@/Components/CustomInput/CustomDatePicker";
import CustomField from "@/Components/CustomInput/CustomField";
import CustomLabel from "@/Components/CustomLabel";
import Loader from "@/Components/Loader";
import PrimaryButton from "@/Components/PrimaryButton";
import { formatDate } from "@/Helpers/helperFormat";
import { showErrorModal, showSuccessModal } from "@/Helpers/utils";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import { Form, Formik } from "formik";
import { Fragment, useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Button, FormGroup } from "reactstrap";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    username: Yup.string()
        .min(5, "Username contains 5-25 letters")
        .max(25, "Username contains 5-25 letters")
        .matches(/^[a-zA-Z0-9]*$/, "Username must be alphanumeric")
        .required("Username is required"),
});

export default function EditAccountPopup({
    headerColor,
    show = false,
    maxWidth = "2xl",
    showCancel = true,
    user,
    onClose = () => {},
}) {
    const [loading, setLoading] = useState(false);
    const { setData, put, data } = useForm({
        username: user?.username,
        email: user?.email,
    });


    useEffect(() => {
        setData({
            username: user?.username,
            email: user?.email,
        });
    }, [user]);

    const [error, setError] = useState();

    const openModal = () => {
        showErrorModal("Error", error);
    };

    const closeModal = () => {
        setLoading(false);
        onClose();
        showSuccessModal("Success", "Wallet has been edited successfully");
    };

    const close = () => {
        setLoading(true);
        put(route("editWallet"), {
            onError: (errors) => {
                if (errors.username) {
                    openModal();
                    setError(errors.username);
                } else if (errors.email) {
                    openModal();
                    setError(errors.email);
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
                            <Button
                                className="bg-white-primary p-3 rounded-md text-primary header-4"
                                onClick={onClose}
                            >
                                <IoIosArrowBack />
                            </Button>
                            <div className="flex flex-col">
                                <h1 className="text-primary header-4">
                                    My Account
                                </h1>
                            </div>
                        </div>
   
                        <Formik
                            initialValues={{
                                username: user?.username || "",
                                email: user?.email || "",
                                createdDate: formatDate(user?.created_at),
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
                                        <FormGroup className="flex-1">
                                            <CustomLabel
                                                labelFor="Username"
                                                className="button text-primary"
                                            />
                                            <CustomField
                                                id="username"
                                                name="username"
                                                placeholder="Fill your username"
                                                type="text"
                                                className="w-full mt-1"
                                                values={values?.username}
                                                onChange={(e) => {
                                                    setFieldValue(
                                                        "username",
                                                        e.target.value
                                                    );
                                                    setData(
                                                        "username",
                                                        e.target.value
                                                    );
                                                }}
                                            />
                                        </FormGroup>

                                        <FormGroup className="flex-1">
                                            <CustomLabel
                                                labelFor="Email"
                                                className="button text-primary"
                                            />
                                            <CustomField
                                                id="email"
                                                name="email"
                                                placeholder="Fill your email"
                                                type="text"
                                                className="w-full mt-1"
                                                values={values?.email}
                                                onChange={(e) => {
                                                    setFieldValue(
                                                        "email",
                                                        e.target.value
                                                    );
                                                    setData(
                                                        "email",
                                                        e.target.value
                                                    );
                                                }}
                                            />
                                        </FormGroup>
                                        <FormGroup className="flex-1">
                                            <CustomLabel
                                                labelFor="Created Date"
                                                className="button text-primary"
                                            />
                                            <CustomDatePicker
                                                className="w-fit"
                                                calendarWidth="md:w-64 lg:w-96"
                                                placeholder="Select Date"
                                                selected={
                                                    values?.createdDate
                                                }
                                                onChange={(e) => {
                                                    setFieldValue(
                                                        "createdDate",
                                                        e
                                                    );
                                                    setData(
                                                        "transaction_date",
                                                        moment(e).format(
                                                            "YYYY-MM-DD"
                                                        )
                                                    );
                                                }}
                                                disabled={true}
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
