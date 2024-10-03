import CustomDatePicker from "@/Components/CustomInput/CustomDatePicker";
import CustomField from "@/Components/CustomInput/CustomField";
import CustomSelectCategories from "@/Components/CustomInput/CustomSelectCategories";
import CustomSelectInput from "@/Components/CustomInput/CustomSelectInput";
import CustomLabel from "@/Components/CustomLabel";
import ErrorMessageInput from "@/Components/Errors/ErrorMessage";
import Loader from "@/Components/Loader";
import PrimaryButton from "@/Components/PrimaryButton";
import { showErrorModal, showSuccessModal } from "@/Helpers/utils";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import { Form, Formik } from "formik";
import moment from "moment";
import { Fragment, useState } from "react";
import { TbReceipt } from "react-icons/tb";
import { Button, FormGroup } from "reactstrap";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    wallet_name: Yup.string().required("Wallet name is required"),
    category_name: Yup.string().required("Category name is required"),
    recurring_transaction_amount: Yup.number().required(
        "Transaction amount is required"
    ),
    recurring_transaction_date: Yup.date().required(
        "Transaction date is required"
    ),
    recurring_transaction_note: Yup.string().max(150, "Maximum 150 Characters"),
});

export default function AddRecurringTransactionPopup({
    headerColor,
    show = false,
    maxWidth = "2xl",
    showCancel = true,
    categoryOptions,
    walletOptions,
    onClose = () => {},
}) {
    const [loading, setLoading] = useState(false);
    const { setData, post, data } = useForm({
        wallet_name: "",
        category_name: "",
        recurring_transaction_amount: "",
        recurring_transaction_date: "",
        recurring_transaction_note: "",
    });

    const openModal = (error) => {
        setLoading(false);
        showErrorModal("Error", error);
    };

    const closeModal = () => {
        setLoading(false);
        onClose();
        showSuccessModal(
            "Success",
            "Recurring Transaction has been created successfully"
        );
    };

    const close = () => {
        setLoading(true);
        post(route("createRecurringTransaction"), {
            onError: (errors) => {
                if (errors.wallet_name) {
                    openModal(errors.wallet_name);
                } else if (errors.category_name) {
                    openModal(errors.category_name);
                } else if (errors.recurring_transaction_amount) {
                    openModal(errors.recurring_transaction_amount);
                } else if (errors.recurring_transaction_date) {
                    openModal(errors.recurring_transaction_date);
                } else if (errors.recurring_transaction_note) {
                    openModal(errors.recurring_transaction_note);
                }
            },
            onSuccess: () => closeModal(),
        });
    };
    const empty = () => {};

    const maxWidthClass = {
        sm: "sm:max-w-sm",
        md: "sm:max-w-md",
        lg: "sm:max-w-lg",
        xl: "sm:max-w-xl",
        "2xl": "sm:max-w-2xl",
    }[maxWidth];

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
                            <div className="bg-lighter-primary p-3 rounded-md text-primary">
                                <TbReceipt size={32} />
                            </div>
                            <div className="flex flex-col">
                                <h1 className="text-primary header-4">
                                    Insert Recurring Transaction
                                </h1>
                                <h5 className="text-grey sub-body-14">
                                    Add your recurring transaction
                                </h5>
                            </div>
                        </div>

                        <Formik
                            initialValues={{
                                wallet_name: "",
                                category_name: "",
                                recurring_transaction_amount: "",
                                recurring_transaction_date: "",
                                recurring_transaction_note: "",
                            }}
                            enableReinitialize={true}
                            validationSchema={validationSchema}
                            onSubmit={() => close()}
                        >
                            {({
                                errors,
                                touched,
                                setFieldValue,
                                values,
                                handleSubmit,
                            }) => (
                                <Form onSubmit={handleSubmit}>
                                    <FormGroup className="w-full sm:flex gap-2 mt-4">
                                        <FormGroup className="flex-1">
                                            <CustomLabel
                                                labelFor="Select Wallet"
                                                className="button text-primary"
                                            />
                                            <CustomSelectInput
                                                placeholder={"Select Wallet"}
                                                options={walletOptions}
                                                onChange={(e) => {
                                                    setFieldValue(
                                                        "wallet_name",
                                                        e.value
                                                    );
                                                    setData(
                                                        "wallet_name",
                                                        e.value
                                                    );
                                                }}
                                                className={"mt-[7px]"}
                                            />
                                            <ErrorMessageInput name="wallet_name" />
                                        </FormGroup>

                                        <FormGroup className="flex-1">
                                            <CustomLabel
                                                labelFor="Amount"
                                                className="button text-primary"
                                            />
                                            <CustomField
                                                id="transaction_amount"
                                                name="recurring_transaction_amount"
                                                placeholder="Input the amount"
                                                type="number"
                                                className="w-full mt-1"
                                                onChange={(e) => {
                                                    setFieldValue(
                                                        "recurring_transaction_amount",
                                                        e.target.value
                                                    );
                                                    setData(
                                                        "recurring_transaction_amount",
                                                        e.target.value
                                                    );
                                                }}
                                            />
                                        </FormGroup>
                                    </FormGroup>

                                    <FormGroup className="w-full sm:flex gap-2 mt-4">
                                        <FormGroup>
                                            <CustomLabel
                                                labelFor="Date"
                                                className="button text-primary"
                                            />
                                            <CustomDatePicker
                                                className="w-fit"
                                                calendarWidth="w-66 md:w-80"
                                                placeholder="Select Date"
                                                selected={
                                                    values?.recurring_transaction_date
                                                }
                                                onChange={(e) => {
                                                    setFieldValue(
                                                        "recurring_transaction_date",
                                                        e
                                                    );
                                                    setData(
                                                        "recurring_transaction_date",
                                                        moment(e).format(
                                                            "YYYY-MM-DD"
                                                        )
                                                    );
                                                }}
                                            />
                                            <ErrorMessageInput name="recurring_transaction_date" />
                                        </FormGroup>

                                        <FormGroup className="flex-1">
                                            <CustomLabel
                                                labelFor="Transaction Category"
                                                className="button text-primary"
                                            />
                                            <CustomSelectCategories
                                                options={categoryOptions}
                                                onChange={(e) => {
                                                    setFieldValue(
                                                        "category_name",
                                                        e.value
                                                    );
                                                    setData(
                                                        "category_name",
                                                        e.value
                                                    );
                                                }}
                                            />
                                            <ErrorMessageInput name="category_name" />
                                        </FormGroup>
                                    </FormGroup>

                                    <FormGroup>
                                        <CustomLabel
                                            labelFor="Note"
                                            className="button text-primary"
                                            isRequired={false}
                                        />
                                        <CustomField
                                            id="recurring_transaction_note"
                                            name="recurring_transaction_note"
                                            placeholder="Write a note for your transaction"
                                            component="textarea"
                                            className="w-full mt-1 resize-none"
                                            rows="4"
                                            cols="50"
                                            onChange={(e) => {
                                                setFieldValue(
                                                    "recurring_transaction_note",
                                                    e.target.value
                                                );
                                                setData(
                                                    "recurring_transaction_note",
                                                    e.target.value
                                                );
                                            }}
                                        />
                                        <ErrorMessageInput name="recurring_transaction_note" />
                                    </FormGroup>
                                    <div className="p-4 w-full">
                                        <div className="w-full flex justify-end items-center">
                                            {showCancel && (
                                                <Button
                                                    className={`self-end mt-2  border-expense border px-6 py-[7px] rounded-md body mr-4 text-expense transition-colors duration-500 hover:bg-expense hover:text-light`}
                                                    onClick={() => onClose()}
                                                >
                                                    Cancel
                                                </Button>
                                            )}

                                            <PrimaryButton
                                                type="submit"
                                                className={`self-end mt-2 bg-primary !px-10 py-2 rounded-md body mr-2 transition-colors hover:bg-darker-primary duration-300 ease-in-out flex items-center`}
                                                disabled={loading}
                                                loading={loading}
                                            >
                                                {loading ? (
                                                    <div className="flex items-center">
                                                        <Loader
                                                            className={`w-[30px] h-6 mr-1`}
                                                        />
                                                        <span>Loading...</span>
                                                    </div>
                                                ) : (
                                                    "Submit"
                                                )}
                                            </PrimaryButton>
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
