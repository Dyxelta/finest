export const ReusableDecorBackground = ({
    DecorBG = null,
    children,
    className,
}) => {
    return (
        <div className="w-full h-full bg-background rounded-xl z-50 relative overflow-hidden">
            {DecorBG && (
                <img src={DecorBG} alt="DecorBG" className={className} />
            )}
            {children}
        </div>
    );
};
