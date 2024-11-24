import Select from "react-select";

const customStyles = (hasError) => ({
    control: (provided, state) => ({
        ...provided,
        borderRadius: "6px",
        borderColor: hasError
            ? state.isFocused
                ? "#F44336" 
                : "#F44336" 
            : state.isFocused
            ? "#CAD8E7"
            : provided.borderColor,
        "&:hover": {
            borderColor: hasError
                ? "#CD5C5C" 
                : "#CAD8E7",
        },
        boxShadow: hasError && state.isFocused ? "0 0 0 1px #FF0000" : provided.boxShadow,
    }),
    singleValue: (provided, state) => ({
        ...provided,
        color:  state.isSelected ? "#2D5074" : provided.color,
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
    isSearchable = false,
    errors = false, 
}) => {
    return (
        <Select
            className={className}
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