import { formatToRupiah } from "@/Helpers/helperFormat";
import { Formik } from "formik";
import CustomField from "../CustomInput/CustomField";
import CustomSelectInput from "../CustomInput/CustomSelectInput";

const HeaderInfo = ({
    walletOptions,
    selectedWallet,
    setSelectedWallet,
    amount,
}) => {
    return (
        <div className="w-full bg-light rounded-xl py-2 text-primary">
            <Formik
                initialValues={{
                    amount: amount ? formatToRupiah(amount) : "",
                }}
                enableReinitialize
            >
                {() => (
                    <div className="px-4 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  py-3">
                        <div className="flex flex-col">
                            <div className="header-5 md:header-4 ">Select Wallet</div>
                            <div className="text-grey sub-body-14">
                                Choose which wallet to insert your transaction
                            </div>
                            <div className="w-full mt-3">
                                <CustomSelectInput
                                    placeholder={"Select Wallet"}
                                    defaultValue={
                                        selectedWallet
                                            ? {
                                                  value: selectedWallet,
                                                  label: selectedWallet,
                                              }
                                            : {
                                                  value: "",
                                                  label: "",
                                              }
                                    }
                                    options={walletOptions}
                                    onChange={(e) => {
                                        setSelectedWallet(e.label);
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
                                    placeholder=""
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
