import CustomField from "@/Components/CustomInput/CustomField";
import CustomLabel from "@/Components/CustomLabel";
import CustomTitle from "@/Components/CustomTitle";
import Loader from "@/Components/Loader";
import PrimaryButton from "@/Components/PrimaryButton";
import { showErrorModal, showSuccessModal } from "@/Helpers/utils";
import { Head, Link, useForm } from "@inertiajs/react";
import { Form, Formik } from "formik";
import { useState } from "react";
import { Lock, Mail, User } from "react-feather";
import { FormGroup } from "reactstrap";
import * as Yup from "yup";
import logoLetter from "../../../../public/image/app/Logo-letter.png";
import logo from "../../../../public/image/app/Logo.png";
import upperMotive from "../../../../public/image/register/Component 10.png";
import lowerLeftMotive from "../../../../public/image/register/lowerLeftMotive.png";
import lowerRightMotive from "../../../../public/image/register/lowerRightMotive.png";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const SignupSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    username: Yup.string()
        .min(5, "Username contains 5-25 letters")
        .max(25, "Username contains 5-25 letters")
        .matches(/^[a-zA-Z0-9 ]*$/, "Username must be alphanumeric")
        .required("Username is required"),

    password: Yup.string()
        .matches(
            /[A-Z]+/,
            "Password must contain at least one uppercase letter"
        )
        .matches(
            /[a-z]+/,
            "Password must contain at least one lowercase letter"
        )
        .matches(/[0-9]+/, "Password must contain at least one digit")
        .matches(
            /[!@#$%^&*()_,.?":{}|<>]+/,
            "Password must contain at least one special character"
        )
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    confirm_pass: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
});

export default function Register({ status, canResetPassword }) {
    const openModal = (error) => {
        setLoading(false);
        showErrorModal("Error", error);
    };
    const [loading, setLoading] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        username: "",
        email: "",
        password: "",
        confirm_pass: "",
    });

    const submit = async (values) => {
        setLoading(true);
        post(route("createAccount"), {
            onError: (errors) => {
                if (errors.username) {
                    openModal(errors.username);
                } else if (errors.email) {
                    openModal(errors.email);
                } else if (errors.password) {
                    openModal(errors.password);
                } else if (errors.confirm_pass) {
                    openModal(errors.confirm_pass);
                }
            },
            onSuccess: () => {
                setLoading(false);
                showSuccessModal("Information", "Verification Email has been sent")
            },
        });
    };
    const [openPass, setOpenPass] = useState();
    const [openConfirmPass, setOpenConfirmPass] = useState();
    return (
        <div className="mx-auto w-full flex self-center">
            <div className="relative h-screen w-full">
                <Head title="Register" />
                <img
                    src={upperMotive}
                    alt="Logo"
                    className=" absolute md:top-[-50px] w-[45%] -z-0"
                />
                <img
                    src={lowerLeftMotive}
                    alt="Logo"
                    className=" absolute bottom-0 md:w-[45%] h-[30%] -z-0"
                />
                <img
                    src={lowerRightMotive}
                    alt="Logo"
                    className=" absolute right-0 bottom-0 w-0 md:w-[45%] -z-0"
                />

                <div className="h-full container z-40 relative mx-auto">
                    <div className="h-full py-6 flex">
                        <div className="flex-1 hidden justify-center items-center flex-col lg:flex">
                            <img
                                src={logo}
                                alt="Logo"
                                className="w-[150px] h-[150px]"
                            />
                            <div className="text-center pt-4 flex flex-col items-center">
                                <h1 className="text-primary header-4-light">
                                    Take control of your finances effortlessly
                                </h1>
                                <h6 className="text-primary header-3 w-[400px]">
                                    Simplify Your Finances, Amplify Your Life
                                </h6>
                            </div>
                        </div>
                        <div className="flex-1 align-items-center h-full border-l-2 justify-center flex">
                            <Formik
                                initialValues={{
                                    email: "",
                                    password: "",
                                    username: "",
                                    confirmPassword: "",
                                }}
                                validationSchema={SignupSchema}
                                onSubmit={submit}
                            >
                                {({
                                    errors,
                                    touched,
                                    values,
                                    setFieldValue,
                                    handleSubmit,
                                }) => (
                                    <Form
                                        onSubmit={handleSubmit}
                                        className="font-roboto flex flex-col justify-center md:w-[450px] "
                                    >
                                        <FormGroup className="max-h-[650px] h-full flex flex-col justify-between">
                                            <FormGroup className="">
                                                <img
                                                    src={logoLetter}
                                                    alt="Logo"
                                                    className="mx-auto h-[35px] md:h-[45px]"
                                                />

                                                <CustomTitle
                                                    title="Welcome"
                                                    subtitle="Let’s register your account first"
                                                    className={"pt-6 pb-3 "}
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
                                                        value={data.email}
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

                                                <FormGroup className="mt-1">
                                                    <CustomLabel
                                                        labelFor="Username"
                                                        className="button text-primary"
                                                    />

                                                    <CustomField
                                                        id="username"
                                                        name="username"
                                                        placeholder="example123"
                                                        type="text"
                                                        className="w-full mt-1"
                                                        icon={
                                                            <User
                                                                size={18}
                                                                color="grey"
                                                            />
                                                        }
                                                        value={data.username}
                                                        onChange={(e) => {
                                                            setData(
                                                                "username",
                                                                e.target.value
                                                            );
                                                            setFieldValue(
                                                                "username",
                                                                e.target.value
                                                            );
                                                        }}
                                                    />
                                                </FormGroup>

                                                <FormGroup className="mt-1">
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
                                                        value={data.password}
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
                                                                        size={
                                                                            18
                                                                        }
                                                                        color="grey"
                                                                    />
                                                                ) : (
                                                                    <FaRegEye
                                                                        size={
                                                                            18
                                                                        }
                                                                        color="grey"
                                                                    />
                                                                )}
                                                            </div>
                                                        }
                                                    />
                                                </FormGroup>

                                                <FormGroup className="mt-1">
                                                    <CustomLabel
                                                        labelFor="Confirm Password"
                                                        className="button text-primary"
                                                    />

                                                    <CustomField
                                                        id="confirmPassword"
                                                        name="confirm_pass"
                                                        placeholder="Must be 8-20 Characters"
                                                        type={
                                                            openConfirmPass
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
                                                        onChange={(e) => {
                                                            setData(
                                                                "confirm_pass",
                                                                e.target.value
                                                            );
                                                            setFieldValue(
                                                                "confirm_pass",
                                                                e.target.value
                                                            );
                                                        }}
                                                        password={
                                                            <div
                                                                onClick={() =>
                                                                    setOpenConfirmPass(
                                                                        !openConfirmPass
                                                                    )
                                                                }
                                                                className="cursor-pointer relative"
                                                            >
                                                                {openConfirmPass ? (
                                                                    <FaRegEyeSlash
                                                                        size={
                                                                            18
                                                                        }
                                                                        color="grey"
                                                                    />
                                                                ) : (
                                                                    <FaRegEye
                                                                        size={
                                                                            18
                                                                        }
                                                                        color="grey"
                                                                    />
                                                                )}
                                                            </div>
                                                        }
                                                    />
                                                </FormGroup>
                                            </FormGroup>

                                            <div className="flex flex-col mb-4">
                                                <PrimaryButton
                                                    className=" w-full "
                                                    type="submit"
                                                    disabled={loading}
                                                    loading={loading}
                                                >
                                                    {loading ? (
                                                        <div className="flex items-center">
                                                            <Loader
                                                                className={`w-[30px] h-6 mr-1`}
                                                            />
                                                            <span>
                                                                Loading...
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        "Register"
                                                    )}
                                                </PrimaryButton>

                                                <span className="text-center pt-2 text-sm">
                                                    Already have an account?{" "}
                                                    {""}
                                                    <Link
                                                        href={"login"}
                                                        className="underline  text-primary  rounded-md fhover:outline-none  hover:ring-darker-primary hover:opacity-85  "
                                                    >
                                                        Sign in
                                                    </Link>
                                                </span>
                                            </div>
                                        </FormGroup>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
