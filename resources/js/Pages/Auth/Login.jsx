import { useEffect } from "react";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { FormGroup, Input, Label } from "reactstrap";
import CustomField from "@/Components/CustomInput/CustomField";
import { User } from "react-feather";

const SignupSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
});

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <Formik
                initialValues={{
                    firstName: "",
                    lastName: "",
                    email: "",
                }}
                validationSchema={SignupSchema}
                onSubmit={submit}
            >
                {({ errors, touched, setFieldValue, handleSubmit }) => (
                    <Form onSubmit={handleSubmit} className="font-roboto">
                        <FormGroup>
                            <Label for="exampleEmail" className="w-100">
                                Email
                            </Label>
                            <CustomField
                                id="email"
                                name="email"
                                placeholder="with a placeholder"
                                type="email"
                                className="w-full mt-1"
                            />
                        </FormGroup>
                        <FormGroup className="mt-3">
                            <Label for="exampleEmail" className="w-100">
                                Password
                            </Label>
                            <CustomField
                                id="email"
                                name="password"
                                placeholder="with a placeholder"
                                type="password"
                                className="w-full mt-1"
                                icon={<User size={18}/>}
                            />
                        </FormGroup>
                        <div className="flex items-center justify-end mt-4">
                            {canResetPassword && (
                                <Link
                                    href={route("password.request")}
                                    className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Forgot your password?
                                </Link>
                            )}

                            <PrimaryButton
                                className="ms-4"
                                disabled={processing}
                            >
                                Log in
                            </PrimaryButton>
                        </div>
                    </Form>
                )}
            </Formik>
        </GuestLayout>
    );
}
