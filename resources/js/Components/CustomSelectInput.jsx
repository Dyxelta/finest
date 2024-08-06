import Select from "react-select";

const customStyles = {
    control: (provided, _) => ({
        ...provided,
        borderRadius: "5px",
        "&:hover": {
            borderColor: "#CAD8E7",
        },
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
};
import React from "react";

const MySelectComponent = ({ defaultValue, options,onChange, props }) => {
    return (
        <>
            {console.log(defaultValue)}
            <Select
                {...props}
                defaultValue={defaultValue ?? ""}
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
                placeholder="Choose Month"
                isSearchable={false}
                styles={customStyles}
          
            />
        </>
    );
};

export default MySelectComponent;
