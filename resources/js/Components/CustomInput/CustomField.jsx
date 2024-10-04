import { Field, useField } from "formik";
import React, { useEffect, useRef } from "react";

export default function CustomField({
    type = "text",
    className = "",
    isFocused = false,
    icon,
    password = false,
    ...props
}) {
    const [field, meta] = useField(props);

    const inputRef = useRef(null);

    useEffect(() => {
        if (isFocused && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isFocused]);

    return (
        <React.Fragment>
            <div className="relative">
                {icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 pt-[2px] flex items-center pointer-events-none">
                        {icon}
                    </div>
                )}
                <Field
                    {...field}
                    {...props}
                    type={type}
                    className={
                        `border-gray-300 transition-shadow duration-300 z-40 ${
                            meta.touched && meta.error
                                ? "border-red-500 ring-red-500 focus:ring-red-500 focus:border-red-500 focus:shadow-[0_4px_6px_rgba(255,0,0,0.2)]"
                                : "focus:ring-primary focus:border-primary focus:shadow-[0_4px_6px_rgba(0,123,255,0.3)]"
                        } rounded-md shadow-sm ${icon ? "pl-10" : ""}  ${
                            props.disabled &&
                            "bg-gray-100 text-gray-500 cursor-not-allowed border-gray-300"
                        } ` + className
                    }
                    innerRef={inputRef}
                />
                {password && (
                    <div className="absolute inset-y-0 right-0 pr-3 pt-[2px] flex items-center z-50">
                        {password}
                    </div>
                )}
            </div>
            {meta.touched && meta.error && (
                <div className="text-red-400 my-[2px] text-[14px]">
                    {meta.error}
                </div>
            )}
        </React.Fragment>
    );
}
