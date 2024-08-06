import { Option, Select } from "@material-tailwind/react";
import React from "react";
import { BiWallet } from "react-icons/bi";

const FirstSection = ({
    classname,
    selectedWallet,
    setSelectedWallet,
    wallets,
}) => {
    return (
        <div className={`${classname} `}>
            <div className="bg-light px-4 md:px-8 w-full rounded-xl py-4 md:py-6 text-primary">
                <div className="flex items-center gap-4">
                    <div className="rounded-md text-[36px] p-2 bg-lighter-primary ">
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
                    <Select
                        label="Select Wallet"
                        value={selectedWallet}
                        onChange={(val) => {
                            setSelectedWallet(val);
                        }}
                    >
                        {wallets?.map((wallet, index) => (
                            <Option key={index} value={wallet}>
                                {wallet.wallet_name}
                            </Option>
                        ))}
                    </Select>
                </div>
            </div>
        </div>
    );
};

export default FirstSection;
