export function getLatestQuarter(statement: Record<string, any>): any {
    const dates = Object.keys(statement).sort((a, b) => {
        return new Date(b).getTime() - new Date(a).getTime();
    });
    
    // Get the latest date
    const latestDate: string = dates[0];
    
    // Extract data for the latest date
    return statement[latestDate];
}