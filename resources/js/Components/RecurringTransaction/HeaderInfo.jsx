import React, { useState } from "react";
import CustomSelectInput from "../CustomInput/CustomSelectInput";
import { Formik } from "formik";
import CustomField from "../CustomInput/CustomField";

const HeaderInfo = ({ transactions, wallets, amount }) => {
    const [selectedWallet, setSelectedWallet] = useState(wallets[0]);
    
    const walletOptions = wallets.map((wallet) => ({
        value: wallet?.id,
        label: wallet?.wallet_name,
    }));

    return (
        <div className="w-full bg-light rounded-xl py-2 text-primary">
            <Formik
                initialValues={{
                    amount: amount ?? "",
                }}
            >
                {() => (
                    <div className="px-4 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  py-3">
                        <div className="flex flex-col">
                            <div className="header-4 ">Select Wallet</div>
                            <div className="text-grey sub-body-14">
                                Choose which wallet to insert your transaction
                            </div>
                            <div className="w-full mt-3">
                                <CustomSelectInput
                                    placeholder={"Select Wallet"}
                                    defaultValue={
                                        selectedWallet.wallet_name
                                            ? {
                                                  value: selectedWallet?.wallet_name,
                                                  label: selectedWallet?.wallet_name,
                                              }
                                            : {
                                                  value: "",
                                                  label: "",
                                              }
                                    }
                                    options={walletOptions}
                                    onChange={(e) => {
                                        setSelectedWallet(e.value);
                                        setPagination(1);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col self-end">
                            <div className="text-primary sub-body-14">
                                Amount:{" "}
                            </div>
                            <div className="w-full mt-3">
                                <CustomField
                                    placeholder="Must be 8-20 Characters"
                                    type="text"
                                    className="w-full mt-1"
                                    name="amount"
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
