import moment from "moment";

export const generateMonthsArray = () => {
    const monthsArray = [];
    const currentMonth = moment().month() + 1;
    const currentYear = moment().year();
    for (let i = 0; i < 12; i++) {
        const adjustedMonth = ((currentMonth - i - 1 + 12) % 12) + 1;
        const adjustedYear =
            currentYear - Math.floor((currentMonth - i - 1) / 12);
        const monthName = moment(
            `${adjustedYear}-${adjustedMonth}`,
            "YYYY-M"
        ).format("MMM");

        monthsArray.push({
            total_amount: 0,
            month: adjustedMonth,
            monthName: monthName,
        });
    }

    return monthsArray.reverse();
};

export const generateMonthsChart = (monthsArray, data) => {
    console.log(monthsArray, "dihfiuoshdf");
    return monthsArray.map((mon) => {
        const matchingData = data.find((item) => item.month === mon.month);
        return matchingData || mon;
    });
};

export const generate6MonthsArray = () => {
    const monthsArray = [];
    const currentMonth = moment().month() + 1;
    const currentYear = moment().year();
    for (let i = 0; i < 6; i++) {
        const adjustedMonth = ((currentMonth - i - 1 + 12) % 12) + 1;
        const adjustedYear =
            currentYear - Math.floor((currentMonth - i - 1) / 12);
        const monthName = moment(`${adjustedYear}-${adjustedMonth}`, "YYYY-M").format(
            "MMM"
        );

        monthsArray.push({
            total_amount: 0,
            month: adjustedMonth,
            monthName: monthName,
        });
    }

    return monthsArray.reverse();
};

import { useEffect, useState } from "react";
import { Text } from "recharts";

export const useChartMargin = () => {
    const breakpoints = {
        mobile: 768,
        tablet: 1024,
        mobileMargin: { top: 5, right: 10, left: 70, bottom: 5 },
        tabletMargin: { top: 5, right: 15, left: 70, bottom: 5 },
        defaultMargins: { top: 5, right: 20, left: 100, bottom: 5 },
    };

    const [margin, setMargin] = useState(breakpoints.defaultMargins);

    useEffect(() => {
        const handleMarginChart = () => {
            const width = window.innerWidth;
            if (width < breakpoints.mobile) {
                setMargin(breakpoints.mobileMargin);
            } else if (width < breakpoints.tablet) {
                setMargin(breakpoints.tabletMargin);
            } else {
                setMargin(breakpoints.defaultMargins);
            }
        };

        handleMarginChart();
    }, []);

    return margin;
};

export const usePieChartOuterRadius = () => {
    const breakpoints = {
        mobile: 768,
        mobileMargin: 60,
        defaultMargins: 75,
    };

    const [outerRadius, setOuterRadius] = useState(breakpoints.defaultMargins);

    useEffect(() => {
        const handleOuterRadius = () => {
            const width = window.innerWidth;
            if (width < breakpoints.mobile) {
                setOuterRadius(breakpoints.mobileMargin);
            } else {
                setOuterRadius(breakpoints.defaultMargins);
            }
        };

        handleOuterRadius();
    }, []);

    return outerRadius;
};

export const usePieChartInnerRadius = () => {
    const breakpoints = {
        mobile: 768,
        mobileMargin: 46,
        defaultMargins: 55,
    };

    const [innerRadius, setInnerRadius] = useState(breakpoints.defaultMargins);

    useEffect(() => {
        const handleInnerRadius = () => {
            const width = window.innerWidth;
            if (width < breakpoints.mobile) {
                setInnerRadius(breakpoints.mobileMargin);
            } else {
                setInnerRadius(breakpoints.defaultMargins);
            }
        };

        handleInnerRadius();
    }, []);

    return innerRadius;
};

export const renderPercentage = (props) => {
    const truncateText = (text) => {
        if (!text) return " ";

        return text.length > 17 ? `${text.slice(0, 17)}...` : text;
    };

    const { cx, cy, percent, activeIndex, index, payload } = props;

    if (
        cx === undefined ||
        cy === undefined ||
        index !== activeIndex ||
        percent === undefined
    ) {
        return null;
    }

    return (
        <g>
            <Text
                x={cx}
                y={cy}
                dy={-10}
                textAnchor="middle"
                fill="#000"
                fontSize={10}
                className="text-primary w-[20px] text-ellipsis"
            >
                {truncateText(payload.name)}
            </Text>
            <Text
                x={cx}
                y={cy}
                dy={8}
                textAnchor="middle"
                fill="#000"
                className="text-primary"
            >
                {(percent * 100).toFixed(2)}%
            </Text>
        </g>
    );
};
