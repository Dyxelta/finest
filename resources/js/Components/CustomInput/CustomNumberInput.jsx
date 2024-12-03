import { useField } from "formik";
import React, { useEffect, useRef } from "react";
import { NumericFormat } from "react-number-format";

export default function CustomNumberInput({
    type = "text",
    className = "",

    onChange,
    value,
    ...props
}) {
    const [field, meta] = useField(props);

    return (
        <React.Fragment>
            <div className="relative">
                <NumericFormat
                    thousandSeparator="."
                    name={props.name}
                    value={value}
                    onValueChange={(values) => {
                        const { value } = values;

                        onChange(value);
                    }}
                    onKeyPress={(e) =>
                        !/^\d+$/.test(e.key) && e.preventDefault()
                    }
                    {...props}
                    className={
                        `border-gray-300 transition-shadow duration-300 z-40 ${
                            meta.touched && meta.error
                                ? "border-red-500 ring-red-500 focus:ring-red-500 focus:border-red-500 focus:shadow-[0_4px_6px_rgba(255,0,0,0.2)]"
                                : "focus:ring-primary focus:border-primary focus:shadow-[0_4px_6px_rgba(0,123,255,0.3)]"
                        } rounded-md shadow-sm  ${
                            props.disabled &&
                            "bg-gray-100 text-gray-500 cursor-not-allowed border-gray-300"
                        } ` + className
                    }
                />
            </div>
        </React.Fragment>
    );
}
