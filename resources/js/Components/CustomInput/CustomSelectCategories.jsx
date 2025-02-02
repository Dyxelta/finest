import Select, { components } from "react-select";

const CustomOption = (props) => (
    <components.Option {...props}>{props.data.label}</components.Option>
);

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
            borderColor: hasError ? "#CD5C5C" : "#CAD8E7",
        },
        boxShadow:
            hasError && state.isFocused
                ? "0 0 0 1px #FF0000"
                : provided.boxShadow,
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
    menu: (provided, _) => ({
        ...provided,
        zIndex: 9999,
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
    menuPortal: (provided) => ({
        ...provided,
        zIndex: 9999,
    }),
});

const GroupHeading = (props) => (
    <div
        style={{
            fontWeight: "bold",
            margin: "2px 0px 2px 10px",
            fontSize: "20px",
            color: "#2D5074",
            textDecoration:"underline"
        }}
    >
        {props.children}

    </div>
);

const CustomSelectCategories = ({
    onChange,
    options,
    className,
    props,
    defaultValue = "",
    errors = null,
}) => (
    <Select
        defaultValue={defaultValue}
        className={` ${className} remove-input-txt-border`}
        {...props}
        onChange={onChange}
        options={options}
        components={{ GroupHeading, Option: CustomOption }}
        styles={customStyles(errors)}
        placeholder="Select Category"
        menuPortalTarget={document.body}
        theme={(theme) => ({
            ...theme,
            borderRadius: 0,
            colors: {
                ...theme.colors,
                primary25: "#CAD8E7",
                primary: "#2D5074",
            },
        })}
    />
);

export default CustomSelectCategories;
