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
                    selectedWallet: selectedWallet
                }}
                enableReinitialize={true}
            >
                {({values}) => (
                    <div className="px-4 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  py-3">
                      {  console.log(values?.selectedWallet,"uidhfsgdfugifd")}
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
                                        values.selectedWallet
                                            && {
                                                  value: values.selectedWallet.id,
                                                  label: values.selectedWallet.wallet_name,
                                              }
                                           
                                    }
                                    value={
                                        values.selectedWallet
                                        && {
                                              value: values.selectedWallet.id,
                                              label: values.selectedWallet.wallet_name,
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
                                Expense Budget Amount
                            </div>
                            <div className="w-full mt-3">
                                <CustomField
                                    placeholder=""
                                    type="text"
                                    className="w-full "
                                    name="totalIncomeBudgetAmount"
                                    disabled={true}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col self-end">
                            <div className="text-grey sub-body-14">
                                Income Budget Amount
                            </div>
                            <div className="w-full mt-3">
                                <CustomField
                                    placeholder=""
                                    type="text"
                                    className="w-full"
                                    name="totalExpenseBudgetAmount"
                                    disabled={true}
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
