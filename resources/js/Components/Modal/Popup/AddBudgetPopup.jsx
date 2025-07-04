import CustomField from "@/Components/CustomInput/CustomField";
import CustomNumberInput from "@/Components/CustomInput/CustomNumberInput";
import CustomSelectCategories from "@/Components/CustomInput/CustomSelectCategories";
import CustomLabel from "@/Components/CustomLabel";
import ErrorMessageInput from "@/Components/Errors/ErrorMessage";
import Loader from "@/Components/Loader";
import PrimaryButton from "@/Components/PrimaryButton";
import { showErrorModal, showSuccessModal } from "@/Helpers/utils";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import { Form, Formik } from "formik";
import { Fragment, useEffect, useState } from "react";
import { FaMoneyBillWave } from "react-icons/fa";
import { Button, FormGroup } from "reactstrap";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    budget_name: Yup.string()
        .required("Budget name is required")
        .max(30, "Maximum 30 Characters"),
    category_id: Yup.number().required("Category name is required"),
    budget_amount: Yup.number()
        .typeError("Limit must be number")
        .required("Budget limit is required"),
    budget_description: Yup.string()
        .required("Description is required")
        .max(150, "Maximum 150 Characters"),
});

export default function AddBudgetPopup({
    headerColor,
    show = false,
    maxWidth = "2xl",
    showCancel = true,
    categoryOptions,
    selectedWallet,
    onClose = () => {},
}) {
    const [loading, setLoading] = useState(false);

    const { setData, post, data } = useForm({
        budget_name: "",
        budget_amount: "",
        budget_description: "",
        wallet_id: selectedWallet?.id,
        category_id: "",
    });

    useEffect(() => {
        setData("wallet_id", selectedWallet?.id);
    }, [selectedWallet]);

    const openModal = (error) => {
        setLoading(false);
        showErrorModal("Error", error);
    };

    const closeModal = () => {
        setLoading(false);
        onClose();
        showSuccessModal("Success", "Budget has been created successfully");
    };

    const close = () => {
        setLoading(true);

        post(route("addBudget"), {
            onError: (errors) => {
                if (errors.budget_name) {
                    openModal(errors.budget_name);
                } else if (errors.budget_amount) {
                    openModal(errors.budget_amount);
                } else if (errors.budget_description) {
                    openModal(errors.budget_description);
                } else if (errors.wallet_id) {
                    openModal(errors.wallet_id);
                } else if (errors.category_id) {
                    openModal(errors.category_id);
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
                onClose={empty}
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
                                <FaMoneyBillWave size={32} />
                            </div>
                            <div className="flex flex-col">
                                <h1 className="text-primary header-4">
                                    Insert Budget
                                </h1>
                                <h5 className="text-grey sub-body-14">
                                    Add your personal budget
                                </h5>
                            </div>
                        </div>
                        <Formik
                            initialValues={{
                                budget_name: "",
                                budget_amount: "",
                                budget_description: "",

                                category_id: "",
                            }}
                            validationSchema={validationSchema}
                            onSubmit={close}
                        >
                            {({
                                errors,
                                touched,
                                values,
                                setFieldValue,
                                handleSubmit,
                            }) => (
                                <Form
                                    onSubmit={handleSubmit}
                                    className="font-roboto flex flex-col justify-center  w-full h-full"
                                >
                                    <div className="flex flex-col justify-between bg-light px-2 sm:px-4 pt-3 md:pt-3 pb-2 md:pb-3 w-full rounded-md ">
                                        <FormGroup className="w-full sm:flex gap-2">
                                            <FormGroup className="flex-1">
                                                <CustomLabel
                                                    labelFor="Budget Name"
                                                    className="button text-primary"
                                                />
                                                <CustomField
                                                    id="budget_name"
                                                    name="budget_name"
                                                    placeholder="Name of the budget"
                                                    type="text"
                                                    className="w-full "
                                                    onChange={(e) => {
                                                        setFieldValue(
                                                            "budget_name",
                                                            e.target.value
                                                        );
                                                        setData(
                                                            "budget_name",
                                                            e.target.value
                                                        );
                                                    }}
                                                />
                                            </FormGroup>
                                            <FormGroup className="flex-1"></FormGroup>
                                        </FormGroup>

                                        <FormGroup className="w-full sm:flex  gap-2">
                                            <FormGroup className="flex-1">
                                                <CustomLabel
                                                    labelFor="Budget Category"
                                                    className="button text-primary"
                                                />

                                                <CustomSelectCategories
                                                    options={categoryOptions}
                                                    onChange={(e) => {
                                                        setFieldValue(
                                                            "category_id",
                                                            e.value
                                                        );

                                                        setData(
                                                            "category_id",
                                                            e.value
                                                        );
                                                    }}
                                                    className={"mt-2"}
                                                    errors={errors?.category_id}
                                                />
                                                <ErrorMessageInput name="category_id" />
                                            </FormGroup>

                                            <FormGroup className="flex-1">
                                                <CustomLabel
                                                    labelFor="Limit"
                                                    className="button text-primary"
                                                />
                                                <CustomNumberInput
                                                    value={
                                                        values.budget_amount
                                                    }
                                                    id="budget_amount"
                                                    name="budget_amount"
                                                    placeholder="Input the amount"
                                                    className="w-full mt-1"
                                                    onChange={(value) => {
                                                        setFieldValue(
                                                            "budget_amount",
                                                            value
                                                        );
                                                        setData(
                                                            "budget_amount",
                                                            value
                                                        );
                                                    }}
                                                />
                                                <ErrorMessageInput name="budget_amount" />
                                            </FormGroup>
                                        </FormGroup>

                                        <FormGroup className="w-full sm:flex  gap-2">
                                            <FormGroup className=" w-full">
                                                <CustomLabel
                                                    labelFor="Short Description"
                                                    className="button text-primary"
                                                />
                                                <CustomField
                                                    id="budget_description"
                                                    name="budget_description"
                                                    placeholder="Describe your budget "
                                                    component="textarea"
                                                    className="w-full  resize-none"
                                                    rows="4"
                                                    cols="50"
                                                    onChange={(e) => {
                                                        setFieldValue(
                                                            "budget_description",
                                                            e.target.value
                                                        );
                                                        setData(
                                                            "budget_description",
                                                            e.target.value
                                                        );
                                                    }}
                                                />
                                            </FormGroup>
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
