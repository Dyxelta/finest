export const getWalletOptions = (wallets) => {
    return wallets.map((wallet) => ({
        value: wallet?.wallet_name,
        label: wallet?.wallet_name,
    }));
};

export const getCategoriesOptions = (expenseCategories, incomeCategories) => {
    return [
        {
            label: "Expense",
            options: expenseCategories.map((expense) => ({
                value: expense?.category_name,
                label: expense?.category_name,
            })),
        },
        {
            label: "Income",
            options: incomeCategories.map((income) => ({
                value: income?.category_name,
                label: income?.category_name,
            })),
        },
    ];
};

export const getExpenseCategoryOptions = (categories) => {
    return [
        {
            label: "Expense",
            options: categories
                .map((expense) => ({
                    value: expense?.category_name,
                    label: expense?.category_name,
                })),
        },
    ];
};
