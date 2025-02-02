import { useState } from "react";
import { BiCalendar, BiWallet } from "react-icons/bi";
import { TbReceipt } from "react-icons/tb";

import CustomField from "@/Components/CustomInput/CustomField";
import CustomSelectInput from "@/Components/CustomInput/CustomSelectInput";
import CustomLabel from "@/Components/CustomLabel";
import { Form, Formik } from "formik";
import { Button, FormGroup } from "reactstrap";

import CustomDatePicker from "@/Components/CustomInput/CustomDatePicker";
import CustomSelectCategories from "@/Components/CustomInput/CustomSelectCategories";
import ErrorMessageInput from "@/Components/Errors/ErrorMessage";
import Loader from "@/Components/Loader";
import PrimaryButton from "@/Components/PrimaryButton";
import { formatDate, formatToRupiah } from "@/Helpers/helperFormat";
import { showErrorModal, showSuccessModal } from "@/Helpers/utils";
import { Link, useForm } from "@inertiajs/react";
import moment from "moment";
import { BsExclamation } from "react-icons/bs";
import * as Yup from "yup";
import CustomNumberInput from "@/Components/CustomInput/CustomNumberInput";

const validationSchema = Yup.object().shape({
    category_id: Yup.number().required("Category name is required"),
    transaction_amount: Yup.number().required("Transaction amount is required"),
    transaction_date: Yup.date().required("Transaction date is required"),
    transaction_note: Yup.string().max(150, "Maximum 150 Characters"),
});

const EditSection = ({
    transaction,
    selectedWallet,
    setSelectedWallet,
    walletOptions,
    categories,
}) => {
    const [loading, setLoading] = useState(false);
    console.log(categories);
    const openModal = (error) => {
        showErrorModal("Error", error);
        setLoading(false);
    };

    const closeModal = () => {
        setLoading(false);
        showSuccessModal(
            "Success",
            "Transaction has been Edited successfully",
            () => {}
        );
    };

    const { setData, data, put } = useForm({
        id: transaction?.id,
        wallet_id: selectedWallet?.id,
        category_id: transaction?.category_id,
        transaction_amount: Math.abs(transaction?.transaction_amount),
        transaction_date: transaction?.transaction_date,
        transaction_note: transaction?.transaction_note,
    });

    const submitTransaction = () => {
        setLoading(true);
        put(route("editTransaction"), {
            onError: (errors) => {
                if (errors.wallet_id) {
                    openModal(errors.wallet_id);
                } else if (errors.transaction_amount) {
                    openModal(errors.transaction_amount);
                } else if (errors.transaction_date) {
                    openModal(errors.transaction_date);
                } else if (errors.category_id) {
                    openModal(errors.category_id);
                }
            },
            onSuccess: () => closeModal(),
        });
    };

    return (
        <div
            className={`w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 lg:grid-rows-4 gap-3`}
        >
            <div className="bg-light px-4 md:px-6 w-full rounded-xl py-4  text-primary col-span-1 lg:col-span-3 row-span-1">
                <div className="flex items-center gap-4">
                    <div className="rounded-md text-[32px] p-2 bg-lighter-primary ">
                        <BiWallet />
                    </div>
                    <div className="">
                        <div className="header-4">Select Wallet </div>
                        <div className="text-grey">
                            Choose which wallet to insert your transaction{" "}
                        </div>
                    </div>
                </div>
                <div className="mt-4 w-full lg:w-1/2">
                    <CustomSelectInput
                        placeholder={"Select Wallet"}
                        defaultValue={
                            selectedWallet
                                ? {
                                      value: selectedWallet?.id,
                                      label: selectedWallet?.wallet_name,
                                  }
                                : {
                                      value: "",
                                      label: "",
                                  }
                        }
                        options={walletOptions}
                        onChange={(e) => {
                            setSelectedWallet(e);
                            setData("wallet_id", e.value);
                        }}
                    />
                </div>
            </div>

            <div
                className={` bg-light py-4  rounded-xl px-4 md:px-6 text-primary h-fit col-span-1 lg:col-span-2 row-span-2`}
            >
                <div className="flex items-center gap-4">
                    <div
                        className={`flex items-center justify-center text-[40px] bg-lighter-primary rounded-md text-primary`}
                    >
                        <BsExclamation />
                    </div>
                    <div className="text-primary header-5 md:header-4 ">
                        Wallet Information
                    </div>
                </div>
                <div>
                    <Formik
                        initialValues={{
                            wallet_name: transaction?.wallet?.wallet_name,
                            created_date: formatDate(
                                transaction?.wallet?.created_at
                            ),
                        }}
                        enableReinitialize
                    >
                        {() => (
                            <>
                                <FormGroup className="mt-4">
                                    <CustomLabel
                                        labelFor="Wallet Name"
                                        className="button text-primary"
                                        isRequired={false}
                                    />

                                    <CustomField
                                        id="wallet_name"
                                        name="wallet_name"
                                        className="w-full mt-1"
                                        icon={
                                            <BiWallet size={18} color="grey" />
                                        }
                                        disabled
                                    />
                                </FormGroup>{" "}
                                <FormGroup className="mt-2">
                                    <CustomLabel
                                        labelFor="Created Date"
                                        className="button text-primary"
                                        isRequired={false}
                                    />

                                    <CustomField
                                        id="created_date"
                                        name="created_date"
                                        className="w-full mt-1"
                                        icon={
                                            <BiCalendar
                                                size={18}
                                                color="grey"
                                            />
                                        }
                                        disabled
                                    />
                                </FormGroup>
                            </>
                        )}
                    </Formik>
                    <div className="border-t-2 mt-8 py-2">
                        <div className="flex items-center justify-between">
                            <div className="header-5">Balance:</div>
                            <div
                                className={`header-5-light ${
                                    selectedWallet?.wallet_balance <= 0 &&
                                    "text-expense"
                                }`}
                            >
                                {formatToRupiah(selectedWallet?.wallet_balance)}
                            </div>
                        </div>
                    </div>
                </div>
                <div></div>
            </div>

            <div className="bg-light px-4 md:px-6 w-full rounded-xl py-4 text-primary mt-2 col-span-1 lg:col-span-3 row-span-3">
                <div className="flex items-center gap-4">
                    <div className="rounded-md text-[32px] p-2 bg-lighter-primary ">
                        <TbReceipt />
                    </div>
                    <div className="">
                        <div className="header-4">Edit Transaction</div>
                        <div className="text-grey">
                            Edit your expense or income{" "}
                        </div>
                    </div>
                </div>
                <Formik
                    initialValues={{
                        wallet_name: selectedWallet?.wallet_name ?? "",
                        category_id: transaction?.category_id ?? "",
                        transaction_amount:
                            Math.abs(transaction?.transaction_amount) ?? "",
                        transaction_date: transaction?.transaction_date ?? "",
                        transaction_note: transaction?.transaction_note ?? "",
                    }}
                    enableReinitialize={true}
                    validationSchema={validationSchema}
                    onSubmit={submitTransaction}
                >
                    {({ setFieldValue, values, handleSubmit, errors }) => (
                        <Form onSubmit={handleSubmit}>
                            <FormGroup className="w-full flex flex-col lg:flex-row gap-2 mt-4">
                                <FormGroup className="flex-1">
                                    <CustomLabel
                                        labelFor="Transaction Category"
                                        className="button text-primary"
                                    />

                                    <CustomSelectCategories
                                        defaultValue={
                                            transaction?.category_id
                                                ? {
                                                      value: transaction?.category_id,
                                                      label: transaction
                                                          ?.category
                                                          ?.category_name,
                                                  }
                                                : {
                                                      value: "",
                                                      label: "",
                                                  }
                                        }
                                        options={categories}
                                        onChange={(e) => {
                                            setFieldValue(
                                                "category_id",
                                                e.value
                                            );
                                            setData("category_id", e.value);
                                        }}
                                        className={"mt-1"}
                                        errors={errors?.category_id}
                                    />
                                    <ErrorMessageInput name="category_id" />
                                </FormGroup>

                                <FormGroup className="flex-1">
                                    <CustomLabel
                                        labelFor="Amount"
                                        className="button text-primary"
                                    />
                                    <CustomNumberInput
                                        value={values.transaction_amount}
                                        id="transaction_amount"
                                        name="transaction_amount"
                                        placeholder="Input the amount"
                                        className="w-full mt-1"
                                        onChange={(value) => {
                                            setFieldValue(
                                                "transaction_amount",
                                                value
                                            );
                                            setData(
                                                "transaction_amount",
                                                value
                                            );
                                        }}
                                    />
                                    <ErrorMessageInput name="transaction_amount" />
                                </FormGroup>
                            </FormGroup>

                            <FormGroup>
                                <CustomLabel
                                    labelFor="Note"
                                    className="button text-primary"
                                    isRequired={false}
                                />
                                <CustomField
                                    id="transaction_note"
                                    name="transaction_note"
                                    placeholder="Write a note for your transaction"
                                    component="textarea"
                                    className="w-full mt-1 resize-none"
                                    rows="4"
                                    cols="50"
                                    onChange={(e) => {
                                        setFieldValue(
                                            "transaction_note",
                                            e.target.value
                                        );
                                        setData(
                                            "transaction_note",
                                            e.target.value
                                        );
                                    }}
                                />
                            </FormGroup>

                            <FormGroup>
                                <CustomLabel
                                    labelFor="Date"
                                    className="button text-primary"
                                />
                                <CustomDatePicker
                                    className="w-fit"
                                    calendarWidth="md:w-64 lg:w-96"
                                    placeholder="Select Date"
                                    selected={values?.transaction_date}
                                    onChange={(e) => {
                                        setFieldValue("transaction_date", e);
                                        setData(
                                            "transaction_date",
                                            moment(e).format("YYYY-MM-DD")
                                        );
                                    }}
                                    errors={errors?.transaction_date}
                                />
                            </FormGroup>

                            <div className="lg:p-4 w-full">
                                <div className="w-full flex justify-end items-center lg:mt-6 mt-4">
                                    <Button
                                        type="button"
                                        className={`self-end mt-2  border-expense border px-6 py-[7px] rounded-md body mr-4 text-expense transition-colors duration-500 hover:bg-expense hover:text-light`}
                                    >
                                        <Link href={route("transactionPage")}>
                                            Cancel
                                        </Link>
                                    </Button>

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
                                            "Confirm"
                                        )}
                                    </PrimaryButton>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default EditSection;
