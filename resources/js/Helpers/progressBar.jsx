export const getProgressBarColor = (percentage=0) => {
    if (percentage < 50) {
        return "bg-primary";
    } else if (percentage >= 50 && percentage < 90) {
        return "bg-warning";
    }
    return "bg-expense";
};

export const getProgressBarBorder = (percentage) => {

    if (percentage < 50) {
        return "border-primary";
    } else if (percentage >= 50 && percentage < 90) {
        return "border-warning";
    }
    return "border-expense";
};
