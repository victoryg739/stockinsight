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
        curTaxRate = curTaxRate + (marginalTaxRate - effectiveTaxRate) / 5;
        taxRate.push(curTaxRate);

    }
    taxRate.push(marginalTaxRate);
    return (taxRate);
}

//TODO: need to take account for NOL: after 2017 the NOL can carry forward indefintely until the loss is fully recovered
export function calcEbitAfterTax(ebit: number[], tax: number[]): number[] {
    const ebitAfterTax = []
    for (let i = 0; i < ebit.length; i++) {
        //terminal year
        if (i === ebit.length - 1) {
            ebitAfterTax.push(ebit[i] * ((100 - tax[i]) / 100));
        }
        //if operating income is 0 or less it cant be tax
        else if (ebit[i] <= 0) {
            ebitAfterTax.push(ebit[i])

        } else {
            ebitAfterTax.push(ebit[i] * ((100 - tax[i]) / 100));
        }
    }
    return ebitAfterTax;
}


export function calcTerminalWACC(countryEquityPremium: number, riskFreeRate: number) {
    return countryEquityPremium + riskFreeRate;
}

//This reinvestment calculation assumes no lag between reinvesting and generating growth from that reinvestment
export function calcReinvestment(revenue: number[], salesToCapY1: number, salesToCapY2To5: number, salesToCapY6To10: number, revGrowthTerminalYr: number, roicTerminalYear: number, ebitAfterTaxTerminalYr: number): number[] {
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

    //TODO change terminalWacc should follow Terminal Year ROIC(which can be terminal WACC or custom input)
    //terminal year
    reinvestment.push(ebitAfterTaxTerminalYr * (revGrowthTerminalYr / roicTerminalYear))

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

export function calcImpliedSharePrice(calcEquityValueCommonStock: number, impliedSharesOutstanding: number): number {
    return calcEquityValueCommonStock / impliedSharesOutstanding;
}

//Section: Calculate WACC

export function calcLeveredBeta(unleveredBeta: number, marginalTaxRate: number, marketEquity: number, marketDebt: number) {
    return unleveredBeta * (1 + (1 - marginalTaxRate / 100) * (marketDebt / marketEquity));
}

export function calcCostOfEquity(riskFreeRate: number, leveredBeta: number, equityRiskPremium: number) {
    return (riskFreeRate + leveredBeta * equityRiskPremium)
}

export function calcMarketValueDebt(interestExpense: number, preTaxCostOfDebt: number, averageMaturity: number, totalDebt: number) {
    // Convert pre-tax cost of debt from percentage to decimal
    const costDecimal = preTaxCostOfDebt / 100;

    // Calculate discount factor
    const discountFactor = (1 + costDecimal) ** -averageMaturity;

    // Calculate market value of debt
    const marketValueOfDebt = (
        (interestExpense / costDecimal) * (1 - discountFactor) +
        (totalDebt / (1 + costDecimal) ** averageMaturity)
    );

    return marketValueOfDebt;
}

export function calcWaccEquityWeight(marketEquity: number, marketDebt: number) {
    return (marketEquity / (marketEquity + marketDebt))
}

export function calcWaccDebtWeight(marketEquity: number, marketDebt: number) {
    return (marketDebt / (marketEquity + marketDebt))
}

export function calcInitialWacc(equityWeight: number, debtWeight: number, costOfEquity: number, costOfDebt: number) {
    return (costOfEquity * equityWeight + costOfDebt * debtWeight)
}


//Section: Calculate sales to capital ratio
export function calcInvestedCapital(totalEquity: number, totalDebt: number, cash: number) {
    return totalEquity + totalDebt - cash;
}

export function calcSalesToCap(baseRevenue: number, investedCapital: number) {
    return Number((baseRevenue / investedCapital).toFixed(2));
}

//Section: Calculate ROIC Table (Take note only the last column of the ROIC row is taken into account)
//By default roicTerminalYear will be fetch from cost of capital year 10
export function calcROIC(salesToCapY1: number, salesToCapY2To5: number, salesToCapY6To10: number, totalEquity: number, totalDebt: number, cash: number, reinvestment: number[], ebitAfterTax: number[], roicTerminalYear: number) {

    // Initialize arrays to store our calculations
    const salesToCap: number[] = [];
    const investedCapital: number[] = [];
    const roic: number[] = [];

    // Populate sales to capital ratio array
    // Year 1
    salesToCap.push(salesToCapY1);

    // Years 2-5
    for (let i = 1; i < 5; i++) {
        salesToCap.push(salesToCapY2To5);
    }

    // Years 6-10
    for (let i = 5; i < 10; i++) {
        salesToCap.push(salesToCapY6To10);
    }

    // Calculate initial invested capital (base year)
    const initialInvestedCapital = totalEquity + totalDebt - cash;
    investedCapital.push(initialInvestedCapital);

    // Calculate invested capital for each year based on reinvestment
    for (let i = 0; i < reinvestment.length; i++) {
        const newInvestedCapital = investedCapital[i] + reinvestment[i];
        investedCapital.push(newInvestedCapital);
    }

    // Calculate ROIC for each year
    const initialROIC = (ebitAfterTax[0] / investedCapital[0]) * 100
    roic.push(initialROIC)

    // ROIC = EBIT After Tax / Invested Capital at beginning of year
    for (let i = 1; i < ebitAfterTax.length - 1; i++) {
        const currentROIC = (ebitAfterTax[i] / investedCapital[i - 1]) * 100; // Convert to percentage
        roic.push(currentROIC);
    }

    // Terminal year ROIC calculation
    roic.push(roicTerminalYear);
    console.log(roic)

    return {
        salesToCap,
        investedCapital,
        roic
    };

}