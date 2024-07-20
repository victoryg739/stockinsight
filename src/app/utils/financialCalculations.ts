export function calcRevenueGrowth(revGrowthY1: number, revGrowthY2to5: number, revGrowthTerminal: number): number[] {
    const revGrowth: number[] = [];
    revGrowth.push(revGrowthY1);
    //push the next 4 years
    for (var i = 0; i < 4; i++) {
        revGrowth.push(revGrowthY2to5)
    }

    //push the next 4 years
    for (var i = 1; i <= 5; i++) {
        revGrowth.push(revGrowthY2to5 - ((revGrowthY2to5 - revGrowthTerminal) / 5) * i);
    }
    revGrowth.push(revGrowthTerminal);

    return revGrowth;
}


//Year 1 revenue = base year revenue * growth rate
export function calcRevenue(baseRevenue: number, growthRates: number[]): number[] {
    const revenue: number[] = [];
    revenue.push(baseRevenue);
    let curRevenue = baseRevenue;
    for (const growthRate of growthRates) {
        revenue.push(curRevenue * (1 + (growthRate / 100)))
        curRevenue = curRevenue * (1 + (growthRate / 100));
    }
    return (revenue)
}

export function calcEBITMargin(baseEbitMargin: number, ebitMarginY1: number, ebitMarginY10: number, yrsConvegence: number): number[] {
    const ebitMargin = [];
    ebitMargin.push(baseEbitMargin);
    ebitMargin.push(ebitMarginY1);

    for (let yr = 2; yr <= yrsConvegence; yr++) {
        ebitMargin.push(ebitMarginY10 - ((ebitMarginY10 - ebitMarginY1) / yrsConvegence) * (yrsConvegence - yr))
    }

    //fill in converged all the way till terminal year
    for (let yr = yrsConvegence + 1; yr <= 11; yr++) {
        ebitMargin.push(ebitMarginY10)
    }

    return ebitMargin;
}

export function calcEbit(revenue: number[], ebitMargin: number[]): number[] {
    const ebit = []
    for (let i = 0; i < revenue.length; i++) {
        ebit.push(revenue[i] * (ebitMargin[i] / 100));
    }
    return ebit;
}

export function calcTaxRate(effectiveTaxRate: number, marginalTaxRate: number) {
    const taxRate = []
    for (var i = 0; i <= 5; i++) {
        taxRate.push(effectiveTaxRate);
    }
    var curTaxRate = effectiveTaxRate;
    for (var i = 6; i <= 10; i++) {
        taxRate.push(curTaxRate);
        curTaxRate = curTaxRate + (marginalTaxRate - effectiveTaxRate) / 5;
    }
    taxRate.push(marginalTaxRate);
    return (taxRate);
}

export function calcEbitAfterTax(ebit: number[], tax: number[]): number[] {
    const ebitAfterTax = []
    for (let i = 0; i < ebit.length; i++) {
        ebitAfterTax.push(ebit[i] * ((100 - tax[i]) / 100));
    }
    return ebitAfterTax;
}


export function calcTerminalWACC(countryEquityPremium: number, riskFreeRate: number) {
    return countryEquityPremium + riskFreeRate;
}


export function calcReinvestment(revenue: number[], salesToCapY1: number, salesToCapY2To5: number, salesToCapY6To10: number, revGrowthTerminalYr: number, wacc: number, ebitAfterTaxTerminalYr: number): number[] {
    const reinvestment = []
    //yr1
    reinvestment.push((revenue[1] - revenue[0]) / salesToCapY1);

    //yr 2 to 5
    for (let i = 2; i <= 5; i++) {
        reinvestment.push((revenue[i] - revenue[i - 1]) / salesToCapY2To5);
    }

    //yr 6 to 10
    for (let i = 6; i <= 10; i++) {
        reinvestment.push((revenue[i] - revenue[i - 1]) / salesToCapY6To10);
    }
    //terminal year
    reinvestment.push(ebitAfterTaxTerminalYr * (revGrowthTerminalYr / wacc))

    return reinvestment;
}

export function calcFcff(ebitAfterTax: number[], reinvestment: number[]) {
    const fcff = []
    for (let i = 1; i < ebitAfterTax.length; i++) {
        fcff.push(ebitAfterTax[i] - reinvestment[i - 1]);
    }
    return fcff;
}


export function calcWACC(intialWACC: number, terminalWACC: number) {
    const wacc = []
    for (let i = 1; i <= 5; i++) {
        wacc.push(intialWACC);
    }

    var curWACC = intialWACC - ((intialWACC - terminalWACC) / 5)
    for (let i = 6; i <= 10; i++) {
        wacc.push(curWACC);
        curWACC = curWACC - ((intialWACC - terminalWACC) / 5)
    }
    wacc.push(terminalWACC)
    return wacc;
}

export function calcCumulatedDiscountFactor(wacc: number[]): number[] {
    const cumulatedDiscountFactor = []
    var curCumulatedDiscountFactor = 100 / (100 + wacc[0]);
    // cumulatedDiscountFactor.push(curCumulatedDiscountFactor);
    for (let i = 1; i <= 10; i++) {
        cumulatedDiscountFactor.push(curCumulatedDiscountFactor);
        curCumulatedDiscountFactor = curCumulatedDiscountFactor * (100 / (100 + wacc[i]));
    }
    return cumulatedDiscountFactor;
}

export function calcPvFcff(fcff: number[], cumulatedDiscountFactor: number[]): number[] {
    const pvFcff = []
    for (var i = 0; i < cumulatedDiscountFactor.length; i++) {
        pvFcff.push(fcff[i] * cumulatedDiscountFactor[i])
    }
    return pvFcff;
}

export function calcSumOfPvFcff10Yrs(pvFcff: number[]): number {
    var sum = 0;
    for (const currPvFcff of pvFcff) {
        sum = sum + currPvFcff;
    }
    return sum;
}

export function calcTerminalValue(terminalValueFcff: number, wacc: number, terminalRevGrowth: number): number {
    return terminalValueFcff / (wacc - terminalRevGrowth) * 100;
}

export function calcPVTerminalValue(terminalValue: number, terminalCumulatedDiscountFactor: number): number {
    return terminalValue * terminalCumulatedDiscountFactor;
}

export function calcEnterpriseValue(terminalValue: number, sumOfPVFcff10Yrs: number): number {
    return terminalValue + sumOfPVFcff10Yrs;
}

export function calcEquityValue(enterpriseValue: number, debt: number, minorityInterest: number, cash: number, nonOperatingAssets: number): number {
    return enterpriseValue - debt - minorityInterest + cash + nonOperatingAssets;
}

export function calcEquityValueCommonStock(equityValue: number, valueOfOptions: number): number {
    return equityValue - valueOfOptions;
}

export function calcImpliedSharePrice(calcEquityValueCommonStock: number, sharesOutstanding: number): number {
    return calcEquityValueCommonStock / sharesOutstanding;
}