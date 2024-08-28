import { Label } from "reactstrap";

const CustomLabel = ({ labelFor, className, isRequired = true }) => {
    return (
        <Label for={labelFor} className={`w-100 ${className}`}>
            {labelFor} {isRequired && <span className="text-expense">*</span>}
        </Label>
    );
};

export default CustomLabel;
