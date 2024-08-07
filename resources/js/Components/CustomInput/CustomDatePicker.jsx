import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Calendar } from "react-feather";

const CustomDatePicker = ({ className, onChange, calendarWidth,selected, props }) => {
    return (
        <div className={`relative ${className}`}>
            <DatePicker
                onChange={onChange}
                selected={selected}
                {...props}
                className={`${calendarWidth} py-2 px-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent mt-1 transition-all duration-300`}
                placeholderText="Select Date"
                dateFormat="dd MMM yyyy"
                
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
            </div>
        </div>
    );
};

export default CustomDatePicker;
