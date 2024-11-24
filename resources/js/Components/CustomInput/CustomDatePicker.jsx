import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Calendar } from "react-feather";

const CustomDatePicker = ({
    className,
    onChange,
    calendarWidth,
    selected,
    props,
    disabled = false,
    errors = null,
}) => {
    return (
        <div className={`relative ${className}`}>
            <DatePicker
                onChange={onChange}
                selected={selected}
                {...props}
                className={`${calendarWidth} 
                    ${
                        disabled &&
                        "bg-gray-100 text-gray-500 cursor-not-allowed border-gray-300"
                    } 
                    ${
                        errors
                            ? "border-red-500 ring-red-500 focus:ring-red-500 focus:border-red-500 focus:shadow-[0_4px_6px_rgba(255,0,0,0.2)]"
                            : "focus:ring-primary focus:border-primary focus:shadow-[0_4px_6px_rgba(0,123,255,0.3)]"
                    }
                    py-2 px-4 border rounded-md focus:outline-none   mt-1 transition-all duration-300`}
                placeholderText="Select Date"
                dateFormat="dd MMM yyyy"
                disabled={disabled}
                onKeyDown={(e) => e.preventDefault()}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
            </div>
        </div>
    );
};

export default CustomDatePicker;
