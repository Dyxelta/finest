import { Link } from "@inertiajs/react";
import { FaEnvelope } from "react-icons/fa";

const VerifyEmail = ({ maxWidth = "md" }) => {
    const maxWidthClass = {
        sm: "sm:max-w-sm",
        md: "sm:max-w-md",
        lg: "sm:max-w-lg",
        xl: "sm:max-w-xl",
        "2xl": "sm:max-w-2xl",
    }[maxWidth];

    return (
        <div className="w-[100vw] h-[100vh] flex justify-center items-center bg-light-grey">
            <div
                className={`bg-light rounded-lg overflow-hidden transform transition-all sm:w-full sm:mx-auto flex flex-col justify-center items-center py-10 text-center ${maxWidthClass} border rounded-md`}
            >
                <div className="bg-primary text-white p-4 rounded-md mb-4">
                    <FaEnvelope size={60} />
                </div>
                <h2 className={`header-4 font-[600] text-primary `}>
                    Verification Email Has Been Sent
                </h2>
                <div className="flex flex-col py-4 px-8 w-full">
                    <span className="text-body text-black">
                        Please check your inbox and verify your email.
                    </span>
                    <span className="text-expense font-bold">
                        Unverified accounts will be deleted <br /> by the end of
                        the day
                    </span>
                </div>
                <span className="border-t-2 border-primary py-2">
                    Wrong Email? {" "}
                    <Link
                        method="GET"
                        href={route("logout")}
                        as="button"
                        className={`text-expense items-center button border-off-white transition-transform duration-500 ease-in-out text-left underline`}
                    >
                        Press here
                    </Link>
                </span>
            </div>
        </div>
    );
};

export default VerifyEmail;
