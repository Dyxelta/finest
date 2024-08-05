import CustomField from "@/Components/CustomInput/CustomField";
import CustomLabel from "@/Components/CustomLabel";
import { Formik } from "formik";
import React from "react";
import { BiCalendar, BiWallet } from "react-icons/bi";
import { BsExclamation } from "react-icons/bs";
import { FormGroup } from "reactstrap";

const SecondSection = ({ classname, selectedWallet, setSelectedWallet }) => {
    return (
        <div
            className={`${classname} bg-light py-4 md:py-8  rounded-xl px-4 md:px-8 text-primary`}
        >
            <div className="flex items-center gap-4">
                <div
                    className={`flex items-center justify-center text-[52px] bg-lighter-primary rounded-md text-primary`}
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
                        created_date: selectedWallet?.created_date,
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
                                    id="email"
                                    name="email"
                        
                                    type="email"
                                    className="w-full mt-1"
                                    icon={<BiWallet size={18} color="grey" />}
                              
                                    disabled
                                />
                            </FormGroup>{" "}
                            <FormGroup>
                                <CustomLabel
                                    labelFor="Created Date"
                                    className="button text-primary"
                                />

                                <CustomField
                                    id="email"
                                    name="email"
                         
                                    type="email"
                                    className="w-full mt-1"
                                    icon={<BiCalendar size={18} color="grey" />}
                            
                                    disabled
                                />
                            </FormGroup>
                        </>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default SecondSection;
