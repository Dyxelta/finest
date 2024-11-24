import CustomSelectCategories from "@/Components/CustomInput/CustomSelectCategories";
import { getExpenseCategoryOptions, getWalletOptions } from "@/Helpers/options";
import { Formik } from "formik";
import CustomSelectInput from "../CustomInput/CustomSelectInput";
const HeaderInfo = ({
    expenseCategories,
    initialWallets,
    currWallet,
    currCategory,
    setData,
    setWait,
}) => {
    const CategoryOptions = getExpenseCategoryOptions(
        expenseCategories
    )

    CategoryOptions[0].options.unshift({ value: "All Category", label: "All Category" })

    return (
        <div className="w-full  rounded-xl  text-primary">
            <Formik
                initialValues={{
                    selectedWallet: currWallet ?? "All Wallet",
                    category_name: currCategory ?? "All Category",
                }}
                enableReinitialize={true}
            >
                {({ values, setFieldValue }) => (
                    <div className="pb-2 md:p-2 flex flex-row justify-end items-start md:items-center gap-2">
                        <div className="flex flex-col w-1/2 md:w-auto">
                            <div className="w-full md:w-52 lg:w-72 ">
                                <CustomSelectInput
                                    placeholder={"Select Wallet"}
                                    defaultValue={
                                        values?.selectedWallet
                                            ? {
                                                  value: values.selectedWallet,
                                                  label: values.selectedWallet,
                                              }
                                            : {
                                                  value: "All Wallet",
                                                  label: "All Wallet",
                                              }
                                    }
                                    value={
                                        values.selectedWallet && {
                                            value: values.selectedWallet,
                                            label: values.selectedWallet,
                                        }
                                    }
                                    options={getWalletOptions(initialWallets)}
                                    onChange={(e) => {
                                   
                                        setData("wallet_name", e.value);
                                        setWait(true);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col w-1/2 md:w-auto">
                            <div className="w-full  md:w-52 lg:w-72 ">
                                <CustomSelectCategories
                                    defaultValue={
                                        values?.category_name
                                            ? {
                                                  value: values?.category_name,
                                                  label: values?.category_name,
                                              }
                                            : {
                                                  value: "",
                                                  label: "",
                                              }
                                    }
                                    options={CategoryOptions}
                                    onChange={(e) => {
                         
                                        setData("category_name", e.value);
                                        setWait(true);
                                    }}
                                    
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
