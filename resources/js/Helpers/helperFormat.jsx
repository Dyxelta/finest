export function formatToRupiah(value) {
    if(!value){
        return 0
    }
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    }).format(value) ;
}

export function formatDate(dateString) {
    if(!dateString){
        return ''
    }
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
}

export const parseMonth = (id) => {
    const monthValues = parseInt(id) ?? new Date().getMonth() + 1;
    const currentYears = new Date().getFullYear();
    return new Date(currentYears, monthValues - 1).toLocaleString(
        "default",
        { month: "short" }
    );
};