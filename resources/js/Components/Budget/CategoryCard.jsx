import { formatToRupiah } from "@/Helpers/helperFormat";

const CategoryCard = ({ budget, setShowInitialBudget, showInitialBudget,setData  }) => {
    const isSelected =
        showInitialBudget?.category?.category_name === budget?.category?.category_name;
    const isIncome = budget?.category?.category_is_income === 1;

    return (
        <div
            className={`rounded-lg overflow-hidden min-w-[180px] md:min-w-[230px] h-[150px] border ${
                isSelected ? "border-primary" : "border-lighter-primary"
            } flex flex-col hover:opacity-80 transition-all duration-300 cursor-pointer`}
            onClick={() => {
                setShowInitialBudget(budget)
                setData("id",budget.id)
            }}
        >
            <div
                className={`px-2 py-1 ${
                    isSelected ? "bg-primary" : "bg-lighter-primary"
                }`}
            >
                <div className="rounded-full flex items-center bg-white px-2 py-1 gap-2">
                    <div
                        className={`${
                            isSelected ? "bg-primary" : "bg-lighter-primary"
                        } rounded-full p-2 flex justify-center items-center`}
                    >
                        <box-icon
                            name={budget.category.icon}
                            type="solid"
                            color={isSelected ? "white" : "#2D5074"}
                            size="18px"
                        />
                    </div>
                    <span className="button">{budget?.category?.category_name}</span>
                </div>
            </div>

            <div className="px-3 py-2 flex justify-end h-full flex-col">
                <div className="body">Amount</div>
                <div className="button mb-2">{formatToRupiah(budget?.budget_amount)}</div>

                <div className={`body ${isIncome ? "text-income" : "text-expense"}`}>
                    {isIncome ? "Income" : "Expense"}
                </div>
            </div>
        </div>
    );
};

export default CategoryCard;
