const CustomTitle = ({title, subtitle, className}) => {
    return (
        <div className={className}>
            <h1 className="header-4 md:header-2 text-primary ">{title}</h1>
            <h6 className="sub-body-bold text-grey md:button">{subtitle}</h6>
        </div>
    );
};
export default CustomTitle;
