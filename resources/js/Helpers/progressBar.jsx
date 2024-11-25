export const getProgressBarColor = (percentage=0) => {
    if (percentage < 55) {
        return "bg-primary";
    } else if (percentage >= 55 && percentage < 100) {
        return "bg-warning";
    }
    return "bg-expense";
};

export const getProgressBarBorder = (percentage) => {

    if (percentage < 55) {
        return "border-primary";
    } else if (percentage >= 55 && percentage < 100) {
        return "border-warning";
    }
    return "border-expense";
};
