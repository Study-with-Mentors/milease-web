export function getMonthShortName(date: Date) {
    //Ex: Oct Nov ...
    return date.toLocaleString("en-US", { month: "short" });
}

export function getMonthShortNameString(date: string) {
    //Ex: Oct Nov ...
    return new Date(date).toLocaleString("en-US", { month: "short" });
}

export function getMonthShortNameYearString(date: string) {
    //Ex: Jan 2023
    const result = new Date(date).toLocaleString("en-US", { month: "short" }) + " " + new Date(date).getFullYear()
    return result;
}

export function getMonthShortNameYearDate(date: Date) {
    //Ex: Jan 2023
    return date.toLocaleString("en-US", { month: "short" }) + " " + date.getFullYear()
}

export function getDateMonthString(date: string) {
    //Ex: 20/12
    return (new Date(date).getDate()) + "/" + (new Date(date).getMonth() + 1)
    //Month counts from 0
}

export function getDateMonthDate(date: Date) {
    //Ex: 20/12
    return date.getDate() + "/" + (date.getMonth() + 1)
    //Month counts from 0
}

export function getMonthsAndYearsLabelBar(startDate: string, endDate: string) {
    //Ex: [Jan 2023, Feb 2023, Mar 2023]
    const dateArray = [];
    let currentDate = new Date(startDate);

    while (currentDate <= new Date(endDate)) {
        dateArray.push(getMonthShortNameYearDate(currentDate));
        currentDate.setMonth(currentDate.getMonth() + 1);
    }
    return dateArray;
}

export function splitDateRangeInMonths(lowerDate: Date, upperDate: Date): { lowerDate: string, upperDate: string }[] {
    const dateChunks: { lowerDate: string, upperDate: string }[] = [];

    let currentMonthStart = new Date(lowerDate);

    while (currentMonthStart <= upperDate) {
        const year = currentMonthStart.getFullYear();
        const month = currentMonthStart.getMonth();
        const lastMonthDay = new Date(year, month + 1, 0); //Start day of a month is 1 so 0 will be the last day of last month

        //Upperdate should be last date of each month or the upperdate itself if last day of month is higher
        if (lastMonthDay <= upperDate) {
            dateChunks.push({ lowerDate: currentMonthStart.toISOString(), upperDate: lastMonthDay.toISOString() });
        } else {
            dateChunks.push({ lowerDate: currentMonthStart.toISOString(), upperDate: upperDate.toISOString() });
        }

        // Set the start of the next month
        currentMonthStart = new Date(year, month + 1, 1);
    }

    // If the upperDate doesn't align perfectly with a 7-day range, add the remaining days as a chunk
    if (currentMonthStart < upperDate) {
        dateChunks.push({ lowerDate: currentMonthStart.toISOString(), upperDate: upperDate.toISOString() });
    }

    return dateChunks;
}

export function splitDateRangeInWeeks(lowerDate: Date, upperDate: Date): { lowerDate: string, upperDate: string }[] {
    const dateChunks: { lowerDate: string, upperDate: string }[] = [];

    let currentMonday = new Date(lowerDate);

    //Find the next Monday after lowerDate or itself
    while (currentMonday.getDay() !== 1) {
        currentMonday.setDate(currentMonday.getDate() + 1);
    }

    //Push the first chunk starting from lowerDate if itself is not Monday
    if (lowerDate.getDay() !== 1) {
        dateChunks.push({
            lowerDate: lowerDate.toISOString(),
            upperDate: currentMonday.toISOString()
        });
    }

    while (currentMonday < upperDate) {
        const nextMonday = new Date(currentMonday);
        nextMonday.setDate(nextMonday.getDate() + 7);
        if (nextMonday > upperDate) {
            nextMonday.setDate(upperDate.getDate() + 1);
        }
        dateChunks.push({
            lowerDate: currentMonday.toISOString(),
            upperDate: nextMonday.toISOString()
        });
        currentMonday = nextMonday;
    }

    return dateChunks;
}

export function getWeekLabelBar(lowerDate: Date, upperDate: Date): string[] {
    const rangeLabels: string[] = [];

    let currentMonday = new Date(lowerDate);

    //Find the next Monday after lowerDate or itself
    while (currentMonday.getDay() !== 1) {
        currentMonday.setDate(currentMonday.getDate() + 1);
    }

    //Push the first chunk starting from lowerDate if itself is not Monday
    if (lowerDate.getDay() !== 1) {
        rangeLabels.push(getDateMonthDate(lowerDate) + " - " + getDateMonthDate(currentMonday));
    }

    while (currentMonday < upperDate) {
        console.log(upperDate)
        const nextMonday = new Date(currentMonday);
        nextMonday.setDate(nextMonday.getDate() + 7);
        if (nextMonday > upperDate) {
            nextMonday.setDate(upperDate.getDate() + 1);
        }
        rangeLabels.push(getDateMonthDate(currentMonday) + " - " + getDateMonthDate(nextMonday));
        currentMonday = nextMonday;
    }

    return rangeLabels;
}