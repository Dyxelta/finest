import Select from "react-select";

const customStyles = (hasError) => ({
    control: (provided, state) => ({
        ...provided,
        borderRadius: "6px",
        borderColor: hasError ? "#F44336" : "#CAD8E7", 
        "&:hover": {
            borderColor: hasError ? "#CD5C5C" : "#CAD8E7",
        },
        boxShadow: "none", 
        outline: "none",
    }),

    singleValue: (provided, state) => ({
        ...provided,
        color: state.isSelected ? "#2D5074" : provided.color,
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected
            ? "#2D5074"
            : state.isFocused
            ? "#CAD8E7"
            : provided.backgroundColor,
        color: state.isSelected ? "#fff" : provided.color,
        "&:hover": {
            backgroundColor: "#CAD8E7",
        },
    }),
    menuList: (provided, _) => ({
        ...provided,
        "::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
        },
        "::-webkit-scrollbar-track": {
            background: "#f1f1f1",
        },
        "::-webkit-scrollbar-thumb": {
            background: "#C6C6C6",
            borderRadius: "10px",
        },
    }),
});


const CustomSelectInput = ({
    defaultValue = "",
    options,
    onChange,
    value,
    placeholder = "Select an option",
    isDisabled = false,
    className = "",
    isSearchable = true,
    errors = false,
}) => {
    return (
        <Select
         classNamePrefix="react-select"
            className={`${className} remove-input-txt-border`}
            isDisabled={isDisabled}
            value={value}
            defaultValue={defaultValue}
            options={options}
            theme={(theme) => ({
                ...theme,
                borderRadius: 0,
                colors: {
                    ...theme.colors,
                    primary25: "#CAD8E7",
                    primary: "#2D5074",
                },
            })}
            onChange={onChange}
            placeholder={placeholder}
            isSearchable={isSearchable}
            styles={customStyles(errors)}
        />
    );
};

export default CustomSelectInput;
