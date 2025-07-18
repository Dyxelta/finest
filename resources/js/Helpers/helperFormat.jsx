export function formatToRupiah(value) {

    if (!value) {
        return 0;
    }

    const rupiahValue = new Intl.NumberFormat("id-ID").format(Math.abs(value));

    return value < 0 ? `- Rp${rupiahValue},00` : `Rp${rupiahValue},00`;
}

export function formatDate(dateString) {
    if (!dateString) {
        return "";
    }
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
        date
    );
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
}

export const parseMonth = (id) => {
    const monthValues = parseInt(id) ?? new Date().getMonth() + 1;
    const currentYears = new Date().getFullYear();
    return new Date(currentYears, monthValues - 1).toLocaleString("default", {
        month: "short",
    });
};

export const RupiahFormatTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className=" bg-lighter-primary p-2 shadow-lg rounded">
                <p className="button">{`${label}`}</p>
                <p className="sub-body-14">{`Total Amount: ${formatToRupiah(payload[0].value)}`}</p>
            </div>
        );
    }
    return null;
};

export const RupiahFormatTooltipPieChart = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className=" bg-lighter-primary p-2 shadow-lg rounded opacity-90">
      
                <p className="button">{`${payload[0].name}`}</p>
                <p className="sub-body-14">{`Total Amount: ${formatToRupiah(payload[0].payload.value)}`}</p>
            </div>
        );
    }
    return null;
};

export const formatYAxis = (tick) => formatToRupiah(tick);

export const handleRefresh = () => window.location.reload()