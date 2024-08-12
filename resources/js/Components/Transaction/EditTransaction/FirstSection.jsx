import { useState } from "react";
import { BiWallet } from "react-icons/bi";
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
import { showErrorModal, showSuccessModal } from "@/Helpers/utils";
import { Link, useForm } from "@inertiajs/react";
import moment from "moment";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    wallet_name: Yup.string().required("Wallet name is required"),
    category_name: Yup.string().required("Category name is required"),
    transaction_amount: Yup.number().required("Transaction amount is required"),
    transaction_date: Yup.date().required("Transaction date is required"),
});

const FirstSection = ({
    classname,
    selectedWallet,
    setSelectedWallet,
    walletOptions,
    categories,
}) => {
    const [loading, setLoading] = useState(false);
    const [startDate, setStartDate] = useState(new Date());

    const openModal = (error) => {
        showErrorModal("Error", error);
        setLoading(false);
    };

    const closeModal = () => {
        setLoading(false);
        showSuccessModal("Success", "Transaction has been added successfully");
    };

    const { setData, data, post } = useForm({
        wallet_name: selectedWallet?.wallet_name,
        category_name: "",
        transaction_amount: "",
        transaction_date: "",
        transaction_note: "",
    });

    const submitTransaction = () => {
        setLoading(true);
        post(route("createTransaction"), {
            onError: (errors) => {
                if (errors.wallet_name) {
                    openModal(errors.wallet_name);
                } else if (errors.transaction_amount) {
                    openModal(errors.transaction_amount);
                } else if (errors.transaction_date) {
                    openModal(errors.transaction_date);
                } else if (errors.category_name) {
                    openModal(errors.category_name);
                }
            },
            onSuccess: () => closeModal(),
        });
    };

    return (
        <div className={`${classname} `}>
            <div className="bg-light px-4 md:px-6 w-full rounded-xl py-4  text-primary">
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
                <div className="mt-4 w-full md:w-1/2">
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
                        }}
                    />
                </div>
            </div>

            <div className="bg-light px-4 md:px-6 w-full rounded-xl py-4 text-primary mt-2">
                <div className="flex items-center gap-4">
                    <div className="rounded-md text-[32px] p-2 bg-lighter-primary ">
                        <TbReceipt />
                    </div>
                    <div className="">
                        <div className="header-4">Insert Transaction</div>
                        <div className="text-grey">
                            Add your expense or income{" "}
                        </div>
                    </div>
                </div>
                <Formik
                    initialValues={{
                        wallet_name: selectedWallet?.wallet_name,
                        category_name: "",
                        transaction_amount: "",
                        transaction_date: "",
                        transaction_note: "",
                    }}
                    enableReinitialize={true}
                    validationSchema={validationSchema}
                    onSubmit={submitTransaction}
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
                                        labelFor="Transaction Category"
                                        className="button text-primary"
                                    />
                                    <CustomSelectCategories
                                        options={categories}
                                        onChange={(e) => {
                                            setFieldValue(
                                                "category_name",
                                                e.value
                                            );
                                            setData("category_name", e.value);
                                        }}
                                    />
                                    <ErrorMessageInput name="category_name" />
                                </FormGroup>

                                <FormGroup className="flex-1">
                                    <CustomLabel
                                        labelFor="Amount"
                                        className="button text-primary"
                                    />
                                    <CustomField
                                        id="transaction_amount"
                                        name="transaction_amount"
                                        placeholder="Input the amount"
                                        type="number"
                                        className="w-full mt-1"
                                        onChange={(e) => {
                                            setFieldValue(
                                                "transaction_amount",
                                                e.target.value
                                            );
                                            setData(
                                                "transaction_amount",
                                                e.target.value
                                            );
                                        }}
                                    />
                                </FormGroup>
                            </FormGroup>

                            <FormGroup>
                                <CustomLabel
                                    labelFor="Note"
                                    className="button text-primary"
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
                                    calendarWidth="w-80 md:w-96"
                                    placeholder="Select Date"
                                    selected={values?.transaction_date}
                                    onChange={(e) => {
                                        setFieldValue("transaction_date", e);
                                        setData(
                                            "transaction_date",
                                            moment(e).format("YYYY-MM-DD")
                                        );
                                    }}
                                />
                                {console.log(data, "sduifhsduifshodif")}
                            </FormGroup>
                            <div className="p-4 w-full">
                                <div className="w-full flex justify-end items-center">
                                    <Button
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

export default FirstSection;
