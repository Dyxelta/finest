export const getProgressBarColor = (percentage=0) => {
    console.log(percentage);
    if (percentage < 50) {
        return "bg-primary";
    } else if (percentage >= 50 && percentage < 90) {
        return "bg-warning";
    }
    return "bg-[#B22222]";
};

export const getProgressBarBorder = (percentage) => {
    console.log(percentage);
    if (percentage < 50) {
        return "border-primary";
    } else if (percentage >= 50 && percentage < 90) {
        return "border-warning";
    }
    return "border-[#B22222]";
};
