import React from "react";
import { ErrorMessage } from "formik";
const ErrorMessageInput = ({ name, props }) => {
    return (
        <ErrorMessage
            name={name}
            {...props}
            render={(msg) => (
                <div className="text-red-400 my-[3px] text-[14px]">{msg}</div>
            )}
        />
    );
};

export default ErrorMessageInput;
