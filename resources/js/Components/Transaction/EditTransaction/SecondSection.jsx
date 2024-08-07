import CustomField from "@/Components/CustomInput/CustomField";
import CustomLabel from "@/Components/CustomLabel";
import { formatDate, formatToRupiah } from "@/Helpers/helperFormat";
import { Formik } from "formik";
import React from "react";
import { BiCalendar, BiWallet } from "react-icons/bi";
import { BsExclamation } from "react-icons/bs";
import { FormGroup } from "reactstrap";

const SecondSection = ({ classname, selectedWallet }) => {

    return (
        <div
            className={`${classname} bg-light py-4  rounded-xl px-4 md:px-6 text-primary h-fit`}
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
                        wallet_name: selectedWallet?.wallet_name,
                        created_date: formatDate(selectedWallet?.created_at),
                    }}
                    enableReinitialize
                >
                    {( ) => (
                        <>
                            <FormGroup className="mt-4">
                                <CustomLabel
                                    labelFor="Wallet Name"
                                    className="button text-primary"
                                />

                                <CustomField
                                    id="wallet_name"
                                    name="wallet_name"
                        
                                    type="email"
                                    className="w-full mt-1"
                                    icon={<BiWallet size={18} color="grey" />}
                              
                                    disabled
                                />
                            </FormGroup>{" "}
                            <FormGroup className="mt-2">
                                <CustomLabel
                                    labelFor="Created Date"
                                    className="button text-primary"
                                />

                                <CustomField
                                    id="created_date"
                                    name="created_date"
                         
                                    type="email"
                                    className="w-full mt-1"
                                    icon={<BiCalendar size={18} color="grey" />}
                            
                                    disabled
                                />
                            </FormGroup>
                        </>
                    )}
                </Formik>
                <div className="border-t-2 mt-8 py-2"> 
                    <div className="flex items-center justify-between">
                        <div className="header-5">
                            Balance:
                        </div>
                        <div className="header-5-light">
                            {formatToRupiah(selectedWallet?.wallet_balance)}
                        </div>
                    </div>
                </div>
            </div>
            <div></div>
        </div>
    );
};

export default SecondSection;
