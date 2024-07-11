import { Label } from "reactstrap";

const CustomLabel = ({labelFor, className}) => {
    return (
        <Label for={labelFor} className={`w-100 ${className}`}>
            {labelFor}
        </Label>
    );
};

export default CustomLabel;
