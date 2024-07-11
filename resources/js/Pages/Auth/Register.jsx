import CustomField from "@/Components/CustomInput/CustomField";
import CustomLabel from "@/Components/CustomLabel";
import CustomTitle from "@/Components/CustomTitle";
import PrimaryButton from "@/Components/PrimaryButton";
import { Head, Link, useForm } from "@inertiajs/react";
import { Form, Formik } from "formik";
import { Lock, Mail, User } from "react-feather";
import { FormGroup } from "reactstrap";
import * as Yup from "yup";
import upperMotive from "../../../../public/image/login/Component 10.png";
import lowerLeftMotive from "../../../../public/image/login/lowerLeftMotive.png";
import lowerRightMotive from "../../../../public/image/login/lowerRightMotive.png";
import logo from "../../../../public/image/app/Logo.png";
import logoLetter from "../../../../public/image/app/Logo-letter.png";
const SignupSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    username: Yup.string()
        .min(5, "Username must have minimum 5 letters")
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
            /[!@#$%^&*(),.?":{}|<>]+/,
            "Password must contain at least one special character"
        )
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
});

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });
    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <div className="relative h-screen">
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
            <Head title="Log in" />

            <div className="h-full container z-100 relative">
                <div className="h-full py-6 flex">
                    <div className="flex-1 hidden justify-center items-center flex-col lg:flex">
                        <img src={logo} alt="Logo" className="w-[150px] h-[150px]" />
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
                                    className="font-roboto flex flex-col justify-between md:w-[500px]"
                                >
                                    <FormGroup>
                                       
                                        <img src={logoLetter} alt="Logo" className="mx-auto h-[45px] md:h-[60px]" />
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
                                                placeholder="with a placeholder"
                                                type="email"
                                                className="w-full mt-1"
                                                icon={
                                                    <Mail
                                                        size={18}
                                                        color="grey"
                                                    />
                                                }
                                            />
                                        </FormGroup>
                                        <FormGroup className="mt-2">
                                            <CustomLabel
                                                labelFor="Username"
                                                className="button text-primary"
                                            />

                                            <CustomField
                                                id="password"
                                                name="username"
                                                placeholder="with a placeholder"
                                                type="password"
                                                className="w-full mt-1"
                                                icon={
                                                    <User
                                                        size={18}
                                                        color="grey"
                                                    />
                                                }
                                            />
                                        </FormGroup>
                                        <FormGroup className="mt-2">
                                            <CustomLabel
                                                labelFor="Password"
                                                className="button text-primary"
                                            />

                                            <CustomField
                                                id="password"
                                                name="password"
                                                placeholder="with a placeholder"
                                                type="password"
                                                className="w-full mt-1"
                                                icon={
                                                    <Lock
                                                        size={18}
                                                        color="grey"
                                                    />
                                                }
                                            />
                                        </FormGroup>
                                        <FormGroup className="mt-2">
                                            <CustomLabel
                                                labelFor="Confirm Password"
                                                className="button text-primary"
                                            />

                                            <CustomField
                                                id="password"
                                                name="confirmPassword"
                                                placeholder="with a placeholder"
                                                type="password"
                                                className="w-full mt-1"
                                                icon={
                                                    <Lock
                                                        size={18}
                                                        color="grey"
                                                    />
                                                }
                                            />
                                        </FormGroup>
                                    </FormGroup>
                                    <div className="flex flex-col mb-4">
                                        <PrimaryButton className=" w-full">
                                            Log in
                                        </PrimaryButton>
                               
                                            <span className="text-center pt-2 text-sm">
                                                Already have an account? {""}
                                                <Link
                                                    href={route(
                                                        "password.request"
                                                    )}
                                                    className="underline  text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
                                                >
                                                    Sign in
                                                </Link>
                                            </span>
                                  
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
