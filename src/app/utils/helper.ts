export function extractLatestQuarterValues(data: any): Record<string, number> | null {
    if (data.length === 0) return null;

    // Sort data by date in descending order
    const sortedData = data.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Get the latest quarter data
    const latestQuarter = sortedData[0];

    return latestQuarter.values;
}

export const encodeParams = (industry: string) => {
    const specialChars: any = {
        "&": "%26",
    };

    return industry
        .split("")
        .map((char) => specialChars[char] || char)
        .join("");
};

const removeTrailingZeros = (value: string) => {
    return value.endsWith('.00') ? value.slice(0, -3) : value;
}

export const convDecimalToPercentage = (value: number) => {
    if (typeof value !== 'number' || isNaN(value)) {
        return '0';
    }
    return removeTrailingZeros((value * 100).toFixed(2));
}

export const convRound2Dp = (value: number) => {
    if (typeof value !== 'number' || isNaN(value)) {
        return '0.00';
    }
    return removeTrailingZeros(value.toFixed(2));
}

export const convToMillion = (value: number) => {
    if (typeof value !== 'number' || isNaN(value)) {
        return '0';
    }
    return removeTrailingZeros((value / 1000000).toFixed(2));
}


export function epochToDateTime(epochTime: any) {
    // Create a new Date object using the epoch time (multiply by 1000 for milliseconds)
    const date = new Date(epochTime * 1000);

    // Get individual components
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    // Construct the formatted date-time string
    return `${day}/${month}/${year} ${hours}:${minutes}`;
}