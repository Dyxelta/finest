import React, { useEffect, useState } from "react";
import CustomSelectInput from "../CustomInput/CustomSelectInput";
import { Formik } from "formik";
import CustomField from "../CustomInput/CustomField";
import { formatToRupiah } from "@/Helpers/helperFormat";
import { useForm } from "@inertiajs/react";

const HeaderInfo = ({
    walletOptions,
    selectedWallet,
    setSelectedWallet,
    totalExpenseBudgetAmount,
    totalIncomeBudgetAmount,
}) => {
    const { get, setData, data } = useForm({
        wallet_id: "",
    });
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const monthName = new Date(currentYear, currentMonth).toLocaleString(
        "default",
        { month: "long" }
    );

    const [wait, setWait] = useState(false);
    useEffect(() => {
        const getBudgetsByWallet = () => {
            if (wait) {
                try {
                    get(route("budgetPage"));
                } catch (error) {
                    console.error("Error setting data:", error);
                } finally {
                    setWait(false);
                }
            }
        };

        getBudgetsByWallet();
    }, [wait]);
    return (
        <div className="w-full bg-light rounded-xl py-2 text-primary">
            <Formik
                initialValues={{
                    totalExpenseBudgetAmount: totalExpenseBudgetAmount
                        ? formatToRupiah(totalExpenseBudgetAmount)
                        : "",
                    totalIncomeBudgetAmount: totalIncomeBudgetAmount
                        ? formatToRupiah(totalIncomeBudgetAmount)
                        : "",
                    selectedWallet: selectedWallet,
                    monthName: monthName
                }}
                enableReinitialize={true}
            >
                {({ values }) => (
                    <div className="px-4 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  py-3">
                        {console.log(values?.selectedWallet, "uidhfsgdfugifd")}
                        <div className="flex flex-col">
                            <div className="header-5 md:header-4">
                                Select Wallet
                            </div>
                            <div className="text-grey sub-body-14">
                                Choose which wallet to insert your transaction
                            </div>
                            <div className="w-full mt-3">
                                <CustomSelectInput
                                    placeholder={"Select Wallet"}
                                    defaultValue={
                                        values.selectedWallet && {
                                            value: values.selectedWallet.id,
                                            label: values.selectedWallet
                                                .wallet_name,
                                        }
                                    }
                                    value={
                                        values.selectedWallet && {
                                            value: values.selectedWallet.id,
                                            label: values.selectedWallet
                                                .wallet_name,
                                        }
                                    }
                                    options={walletOptions}
                                    onChange={(e) => {
                                        setSelectedWallet(e.value);

                                        setData("wallet_id", e.value);
                                        setWait(true);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col self-end">
                            <div className="text-grey sub-body-14">
                                Current Month
                            </div>
                            <div className="w-52 lg:w-96 mt-3">
                                <CustomSelectInput
                                    isDisabled={true}
                                 
                                    defaultValue={
                                        values.monthName
                                            ? {
                                                  value: values.monthName,
                                                  label: values.monthName,
                                              }
                                            : {
                                                  value: "",
                                                  label: "",
                                              }
                                    }
                                
                                />
                            </div>
                        </div>
                    </div>
                )}
            </Formik>
        </div>
    );
};

export default HeaderInfo;
