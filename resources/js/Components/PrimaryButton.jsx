export default function PrimaryButton({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `bg-primary text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform opacity-85 hover:opacity-100 flex justify-center items-center'
                ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
