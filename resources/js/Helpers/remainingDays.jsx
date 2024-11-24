export const getRemainingDays = () => {
    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    const endOfMonth = new Date(nextMonth - 1);
  
    const timeDiff = endOfMonth.getTime() - today.getTime();
    const dayDiff= Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  
    return dayDiff;
  };