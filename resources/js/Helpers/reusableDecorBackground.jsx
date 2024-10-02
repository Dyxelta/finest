export const ReusableDecorBackground = ({ DecorBG, children, className }) => {
    return (
        <div className="w-full h-full bg-background rounded-xl z-50 relative overflow-hidden">
            <img src={DecorBG} alt="DecorBG" className={className} />
            {children}
        </div>
    );
};
