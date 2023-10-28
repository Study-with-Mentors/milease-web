export function getMonthShortName(date: Date) {
    return date.toLocaleString("en-US", { month: "short" });
}

export function getMonthShortNameString(date: string) {
    return new Date(date).toLocaleString("en-US", { month: "short" });
}

export function getMonthShortNameYearString(date: string) {
    const result = new Date(date).toLocaleString("en-US", { month: "short" }) + " " + new Date(date).getFullYear()
    return result;
}

export function getMonthShortNameYearDate(date: Date) {
    return date.toLocaleString("en-US", { month: "short" }) + " " + date.getFullYear()
}

export function getMonthsAndYearsInRange(startDate: string, endDate: string) {
    const dateArray = [];
    let currentDate = new Date(startDate);

    while (currentDate <= new Date(endDate)) {
        dateArray.push(getMonthShortNameYearDate(currentDate));
        currentDate.setMonth(currentDate.getMonth() + 1);
    }
    return dateArray;
}