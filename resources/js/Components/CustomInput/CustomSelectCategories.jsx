import React from 'react';
import Select, { components } from 'react-select';

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

const GroupHeading = (props) => (
  <div style={{ fontWeight: 'bold', margin: '2px 0px 2px 10px' }}>
    {console.log(props.children,'iosdjsdjifjsdifjospdjfsdijfsdf')}
    {props.children}
  </div>
);

const CustomOption = (props) => (
  <components.Option {...props} >
    {props.data.label}
  </components.Option>
);

const MySelect = ({onChange,options, className, props}) => (
  <Select
  className={`mt-2 ${className}`}
  {...props}
  onChange={onChange}
    options={options}
    components={{ GroupHeading, Option: CustomOption }}
    styles={customStyles}
    isSearchable={false}
    placeholder="Select Category"
  />
);

export default MySelect;