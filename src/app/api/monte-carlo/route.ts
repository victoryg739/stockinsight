import { NextRequest, NextResponse } from 'next/server';
import * as FinCalc from '../../utils/financialCalculations';

// Generate random value based on distribution type and parameters
function generateRandomValue(distributionType: string, params: any): number {
    switch (distributionType) {
        case "Normal": {
            // Box-Muller transform for normal distribution
            const u1 = Math.random();
            const u2 = Math.random();
            const z = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
            return z * params.stdDev + params.mean;
        }
        case "Uniform": {
            return params.min + Math.random() * (params.max - params.min);
        }
        case "Triangular": {
            const u = Math.random();
            const f = (params.mode - params.min) / (params.max - params.min);

            if (u < f) {
                return params.min + Math.sqrt(u * (params.max - params.min) * (params.mode - params.min));
            } else {
                return params.max - Math.sqrt((1 - u) * (params.max - params.min) * (params.max - params.mode));
            }
        }
        case "Logistic": {
            const u = Math.random();
            return params.location + params.scale * Math.log(u / (1 - u));
        }
        case "Exponential": {
            return -Math.log(1 - Math.random()) / params.rate;
        }
        case "Lognormal": {
            const u1 = Math.random();
            const u2 = Math.random();
            const z = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
            return Math.exp(params.mu + params.sigma * z);
        }
        case "Min Extreme": {
            return params.location - params.scale * Math.log(-Math.log(Math.random()));
        }
        default:
            return 0;
    }
}

// Calculate percentiles from array of values
function calculatePercentiles(values: number[], percentiles = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]): any[] {
    // Filter out non-finite values
    const validValues = values.filter(v => isFinite(v));

    if (validValues.length === 0) {
        return percentiles.map(p => ({ percentile: p, value: 0 }));
    }

    // Sort values without spread operator
    const sortedValues = validValues.sort((a, b) => a - b);
    const results = [];

    for (const percentile of percentiles) {
        const index = (percentile / 100) * (sortedValues.length - 1);
        const lowerIndex = Math.floor(index);
        const upperIndex = Math.ceil(index);

        let value;
        if (lowerIndex === upperIndex) {
            value = sortedValues[lowerIndex];
        } else {
            const weight = index - lowerIndex;
            value = sortedValues[lowerIndex] * (1 - weight) + sortedValues[upperIndex] * weight;
        }

        results.push({ percentile, value });
    }

    return results;
}

// Calculate histogram data for visualization
function calculateHistogram(values: number[], numBins = 20): any[] {
    // Handle empty array
    if (values.length === 0) return [];

    // Calculate min/max without using spread operator (which can cause stack overflow)
    let min = values[0];
    let max = values[0];

    for (let i = 1; i < values.length; i++) {
        if (isFinite(values[i])) {  // Skip NaN and Infinity
            if (values[i] < min) min = values[i];
            if (values[i] > max) max = values[i];
        }
    }

    // Add a small buffer to avoid division by zero
    if (min === max) {
        min -= 0.5;
        max += 0.5;
    }

    const binWidth = (max - min) / numBins;

    // Initialize bins
    const bins = Array(numBins).fill(0).map((_, i) => ({
        x: min + i * binWidth + (binWidth / 2), // Center of bin
        frequency: 0,
    }));

    // Count values in each bin
    for (const value of values) {
        if (isFinite(value)) {  // Skip NaN and Infinity
            const binIndex = Math.min(Math.floor((value - min) / binWidth), numBins - 1);
            if (binIndex >= 0 && binIndex < numBins) {  // Safety check
                bins[binIndex].frequency++;
            }
        }
    }

    return bins;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const { numIterations, variables, baseInputs, fetchedInputs } = await req.json();

        // Enforce maximum iteration limit
        const MAX_ITERATIONS = 1000000; // 1 million iterations limit

        if (numIterations > MAX_ITERATIONS) {
            return NextResponse.json(
                { error: `Number of iterations exceeds the maximum limit of ${MAX_ITERATIONS.toLocaleString()}.` },
                { status: 400 }
            );
        }

        // Run Monte Carlo simulation
        const results: number[] = [];

        for (let i = 0; i < numIterations; i++) {
            // Create copies of input values for this iteration
            const variedBaseInputs = { ...baseInputs };
            const variedFetchedInputs = { ...fetchedInputs };

            // Apply variations to enabled variables
            variables.forEach((variable: any) => {
                if (variable.enabled) {
                    const randomValue = generateRandomValue(variable.distributionType, variable.distributionParams);

                    // Check if this variable is in baseInputs or fetchedInputs
                    if (baseInputs.hasOwnProperty(variable.id)) {
                        variedBaseInputs[variable.id] = randomValue;
                    } else if (fetchedInputs.hasOwnProperty(variable.id)) {
                        variedFetchedInputs[variable.id] = randomValue;
                    }
                }
            });

            // Now run the DCF calculation with these varied inputs
            const growthRates = FinCalc.calcRevenueGrowth(
                variedBaseInputs.revGrowthYr1,
                variedBaseInputs.revGrowthYr2to5,
                variedBaseInputs.revGrowthPerpetuity
            );

            const revenue = FinCalc.calcRevenue(variedFetchedInputs.baseRevenue, growthRates);

            const ebitMargin = FinCalc.calcEBITMargin(
                variedFetchedInputs.baseEbitMargin,
                variedBaseInputs.opMarginYr1,
                variedBaseInputs.opMarginYr10,
                variedBaseInputs.yrsConvergence
            );

            const ebit = FinCalc.calcEbit(revenue, ebitMargin);

            const taxRate = FinCalc.calcTaxRate(
                variedFetchedInputs.effectiveTaxRate,
                variedFetchedInputs.marginalTaxRate
            );

            const ebitAfterTax = FinCalc.calcEbitAfterTax(ebit, taxRate);

            const terminalWacc = FinCalc.calcTerminalWACC(
                variedFetchedInputs.matureMarketErp,
                variedFetchedInputs.riskFreeRate
            );

            const reinvestment = FinCalc.calcReinvestment(
                revenue,
                variedBaseInputs.salesToCapYr1,
                variedBaseInputs.salesToCapYr2to5,
                variedBaseInputs.salesToCapYr6to10,
                growthRates[growthRates.length - 1],
                variedFetchedInputs.roicTerminalYear, // Use roicTerminalYear instead of terminalWacc
                ebitAfterTax[ebitAfterTax.length - 1]
            );

            const fcff = FinCalc.calcFcff(ebitAfterTax, reinvestment);

            const wacc = FinCalc.calcWACC(
                variedFetchedInputs.initialWacc !== undefined ? variedFetchedInputs.initialWacc : 10,
                terminalWacc
            );

            const cumulatedDiscountFactor = FinCalc.calcCumulatedDiscountFactor(wacc);

            const pvFcff = FinCalc.calcPvFcff(fcff, cumulatedDiscountFactor);

            const sumOfPvFcff10Yrs = FinCalc.calcSumOfPvFcff10Yrs(pvFcff);

            const terminalValue = FinCalc.calcTerminalValue(
                fcff[fcff.length - 1],
                wacc[wacc.length - 1],
                growthRates[growthRates.length - 1]
            );

            const pvTerminalValue = FinCalc.calcPVTerminalValue(
                terminalValue,
                cumulatedDiscountFactor[cumulatedDiscountFactor.length - 1]
            );

            const enterpriseValue = FinCalc.calcEnterpriseValue(pvTerminalValue, sumOfPvFcff10Yrs);

            const equityValue = FinCalc.calcEquityValue(
                enterpriseValue,
                variedFetchedInputs.totalDebt,
                0, // minorityInterest
                variedFetchedInputs.cash,
                0 // nonOperatingAssets
            );

            const equityValueCommonStock = FinCalc.calcEquityValueCommonStock(equityValue, 0);

            const impliedSharePrice = FinCalc.calcImpliedSharePrice(
                equityValueCommonStock,
                variedFetchedInputs.impliedSharesOutstanding
            );

            // Add the result to our collection
            results.push(impliedSharePrice);
        }

        // Filter out any invalid results
        const validResults = results.filter(r => isFinite(r));

        // Calculate statistics from results
        const percentiles = calculatePercentiles(validResults);
        const histogram = calculateHistogram(validResults);
        const mean = validResults.length > 0
            ? validResults.reduce((sum, val) => sum + val, 0) / validResults.length
            : 0;
        const sortedResults = validResults.sort((a, b) => a - b);
        const median = validResults.length > 0
            ? (validResults.length % 2 === 0
                ? (sortedResults[validResults.length / 2 - 1] + sortedResults[sortedResults.length / 2]) / 2
                : sortedResults[Math.floor(validResults.length / 2)])
            : 0;

        // Return the results
        return NextResponse.json({
            percentiles,
            histogram,
            mean,
            median,
            min: validResults.length > 0 ? sortedResults[0] : 0,
            max: validResults.length > 0 ? sortedResults[validResults.length - 1] : 0,
        });

    } catch (error) {
        console.error('Error in Monte Carlo simulation:', error);
        return NextResponse.json(
            { error: 'Failed to run simulation' },
            { status: 500 }
        );
    }
}