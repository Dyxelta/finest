export default function PrimaryButton({ className = '', disabled, children, loading=false,  ...props }) {
    return (
        <button
            {...props}
            className={
                `bg-primary text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform opacity-85 flex justify-center items-center ${loading ? '!opacity-40' : 'hover:opacity-100 '}
                ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
