import CustomField from "@/Components/CustomInput/CustomField";
import CustomLabel from "@/Components/CustomLabel";
import CustomTitle from "@/Components/CustomTitle";
import PrimaryButton from "@/Components/PrimaryButton";
import { Head, Link, useForm } from "@inertiajs/react";
import { Form, Formik } from "formik";
import { Lock, Mail } from "react-feather";
import { FormGroup } from "reactstrap";
import * as Yup from "yup";
import logoLogin from "../../../../public/image/login/LoginLogo.png";
import lowerLeftMotive from "../../../../public/image/login/LowerLeftMotive.png";
import upperLeftMotive from "../../../../public/image/login/UpperLeftMotive.png";

import Loader from "@/Components/Loader";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import logoLetter from "../../../../public/image/app/Logo-letter.png";
import { showErrorModal } from "@/Helpers/utils";

const SignupSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),

    password: Yup.string().required("Password is required"),
});

export default function Login() {
    const { setData, post } = useForm({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const openModal = (error) => {
        console.log(error);
        setLoading(false);
        showErrorModal("Error", error);
    };

    const submit = () => {
        setLoading(true);
        post(route("loginUser"), {
            onError: (errors) => {
                if (errors.email) {
                    openModal(errors.email);
                } else if (errors.password) {
                    openModal(errors.password);
                }
            },
            onSuccess: () => setLoading(false),
        });
    };

    const [openPass, setOpenPass] = useState();
    return (
        <div className="relative h-screen bg-background">
            <img
                src={upperLeftMotive}
                alt="Logo"
                className=" absolute md:top-[-50px] w-[55%] h-[85%] -z-0"
            />
            <img
                src={lowerLeftMotive}
                alt="Logo"
                className=" absolute bottom-0 md:w-[45%] h-[45%] -z-0"
            />

            <img
                src={logoLetter}
                alt="Logo"
                className="absolute -z-0 top-6 left-6 md:top-2  lg:top-8 md:left-8 h-[35px] md:h-[45px]"
            />
            <Head title="Log in" />

            <div className="h-full container z-100 relative px-2 md:px-4 mx-auto">
                <div className="h-full py-6  flex ">
                    <div className="flex-1 hidden justify-center  flex-col lg:flex">
                        <img
                            src={logoLogin}
                            alt="Logo"
                            className="w-[320px] h-[250px]"
                        />
                        <div className=" pt-4 ">
                            <h1 className="text-primary header-4-light">
                                Your Journey Starts Here!
                            </h1>
                            <h6 className="text-primary header-2 xl:w-[600px]">
                                Money Management Made Effortless: Thrive
                                Financially!
                            </h6>
                        </div>
                    </div>
                    <div className="flex-1 align-items-center h-full justify-center flex">
                        <Formik
                            initialValues={{
                                email: "",
                                password: "",
                            }}
                            validationSchema={SignupSchema}
                            onSubmit={submit}
                        >
                            {({
                                errors,
                                touched,
                                setFieldValue,
                                handleSubmit,
                            }) => (
                                <Form
                                    onSubmit={handleSubmit}
                                    className="font-roboto flex flex-col justify-center max-w-[400px] w-full md:max-w-none sm:w-[400px] md:w-[420px] h-full"
                                >
                                    <div className=" flex flex-col justify-between bg-light px-5 sm:px-8 md:px-10 pt-3 md:pt-3 pb-2 md:pb-3 w-full shadow-lg rounded-md h-[440px] md:h-[475px]">
                                        <FormGroup className="w-full">
                                            <CustomTitle
                                                title="Welcome"
                                                subtitle="Sign in to your account"
                                                className={"pt-3 md:pt-6 pb-8 "}
                                            />
                                            <FormGroup>
                                                <CustomLabel
                                                    labelFor="Email"
                                                    className="button text-primary"
                                                />

                                                <CustomField
                                                    id="email"
                                                    name="email"
                                                    placeholder="example@gmail.com"
                                                    type="email"
                                                    className="w-full mt-1"
                                                    icon={
                                                        <Mail
                                                            size={18}
                                                            color="grey"
                                                        />
                                                    }
                                                    onChange={(e) => {
                                                        setData(
                                                            "email",
                                                            e.target.value
                                                        );
                                                        setFieldValue(
                                                            "email",
                                                            e.target.value
                                                        );
                                                    }}
                                                />
                                            </FormGroup>

                                            <FormGroup className="mt-3 md:mt-4 w-full">
                                                <CustomLabel
                                                    labelFor="Password"
                                                    className="button text-primary"
                                                />

                                                <CustomField
                                                    id="password"
                                                    name="password"
                                                    placeholder="Must be 8-20 Characters"
                                                    type={
                                                        openPass
                                                            ? "text"
                                                            : "password"
                                                    }
                                                    className="w-full mt-1"
                                                    icon={
                                                        <Lock
                                                            size={18}
                                                            color="grey"
                                                        />
                                                    }
                                                    onKeyPress={(e) => {
                                                        if (e.key === "Enter") {
                                                            setData(
                                                                "password",
                                                                e.target.value
                                                            );
                                                            setFieldValue(
                                                                "password",
                                                                e.target.value
                                                            );
                                                        }
                                                    }}
                                                    onChange={(e) => {
                                                        setData(
                                                            "password",
                                                            e.target.value
                                                        );
                                                        setFieldValue(
                                                            "password",
                                                            e.target.value
                                                        );
                                                    }}
                                                    password={
                                                        <div
                                                            onClick={() =>
                                                                setOpenPass(
                                                                    !openPass
                                                                )
                                                            }
                                                            className="cursor-pointer relative"
                                                        >
                                                            {openPass ? (
                                                                <FaRegEyeSlash
                                                                    size={18}
                                                                    color="grey"
                                                                />
                                                            ) : (
                                                                <FaRegEye
                                                                    size={18}
                                                                    color="grey"
                                                                />
                                                            )}
                                                        </div>
                                                    }
                                                />
                                                <div className="text-end mt-2 text-sm">
                                                    {""}
                                                    <Link
                                                        href={route("forget")}
                                                        className="underline  text-primary  rounded-md fhover:outline-none  hover:ring-darker-primary hover:opacity-85 "
                                                    >
                                                        Forget password?
                                                    </Link>
                                                </div>
                                            </FormGroup>
                                        </FormGroup>

                                        <div className="flex flex-col mb-6">
                                            <PrimaryButton
                                                className=" w-full"
                                                type="submit"
                                                disabled={loading}
                                                loading={loading}
                                            >
                                                {loading ? (
                                                    <div className="flex items-center">
                                                        <Loader
                                                            className={`w-[30px] h-6 mr-1`}
                                                        />
                                                        <span>Loading...</span>
                                                    </div>
                                                ) : (
                                                    "Login"
                                                )}
                                            </PrimaryButton>
                                            <span className="text-center pt-2 text-sm">
                                                Don’t have an account? {""}
                                                <Link
                                                    href={route("register")}
                                                    className="underline  text-primary  rounded-md fhover:outline-none  hover:ring-darker-primary hover:opacity-85 "
                                                >
                                                    Register
                                                </Link>
                                            </span>
                                            
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
}
