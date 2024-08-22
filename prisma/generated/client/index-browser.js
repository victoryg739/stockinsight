
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.18.0
 * Query Engine version: 4c784e32044a8a016d99474bd02a3b6123742169
 */
Prisma.prismaVersion = {
  client: "5.18.0",
  engine: "4c784e32044a8a016d99474bd02a3b6123742169"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}

/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.Beta_usScalarFieldEnum = {
  industry: 'industry',
  no_of_firms: 'no_of_firms',
  avg_unlevered_beta: 'avg_unlevered_beta',
  avg_levered_beta: 'avg_levered_beta',
  avg_correlation_with_mkt: 'avg_correlation_with_mkt',
  total_unlevered_beta: 'total_unlevered_beta',
  total_levered_beta: 'total_levered_beta'
};

exports.Prisma.Country_risk_premiumScalarFieldEnum = {
  country: 'country',
  adj_default_spread: 'adj_default_spread',
  equity_risk_premium: 'equity_risk_premium',
  country_risk_premium: 'country_risk_premium',
  corporate_tax_rate: 'corporate_tax_rate',
  moody_rating: 'moody_rating',
  soverign_cds_spread: 'soverign_cds_spread'
};

exports.Prisma.Data_last_updateScalarFieldEnum = {
  data_name: 'data_name',
  last_update: 'last_update'
};

exports.Prisma.Ebit_growthScalarFieldEnum = {
  industry: 'industry',
  no_of_firms: 'no_of_firms',
  roc: 'roc',
  reinvestment_rate: 'reinvestment_rate',
  expected_growth_ebit: 'expected_growth_ebit'
};

exports.Prisma.Pe_ratio_usScalarFieldEnum = {
  industry: 'industry',
  no_of_firms: 'no_of_firms',
  perc_money_losing_firms_trailing: 'perc_money_losing_firms_trailing',
  current_pe: 'current_pe',
  trailing_pe: 'trailing_pe',
  forward_pe: 'forward_pe',
  agg_mkt_cap_net_income: 'agg_mkt_cap_net_income',
  agg_mkt_cap_trailing_net_income_money_making_firms: 'agg_mkt_cap_trailing_net_income_money_making_firms',
  expected_growth_next_5_yrs: 'expected_growth_next_5_yrs',
  peg_ratio: 'peg_ratio'
};

exports.Prisma.Rev_growth_rateScalarFieldEnum = {
  industry: 'industry',
  no_of_firms: 'no_of_firms',
  cagr_net_income_last_5_years: 'cagr_net_income_last_5_years',
  cagr_net_rev_last_5_years: 'cagr_net_rev_last_5_years',
  expected_growth_rev_next_2_years: 'expected_growth_rev_next_2_years',
  expected_growth_rev_next_5_years: 'expected_growth_rev_next_5_years',
  expected_growth_eps_next_5_years: 'expected_growth_eps_next_5_years'
};

exports.Prisma.Sales_to_cap_usScalarFieldEnum = {
  industry: 'industry',
  no_of_firms: 'no_of_firms',
  capex: 'capex',
  depre_amort: 'depre_amort',
  capex_depre: 'capex_depre',
  acquisitions: 'acquisitions',
  net_r_and_d: 'net_r_and_d',
  net_capex_sales: 'net_capex_sales',
  net_capex_ebit_aftertax: 'net_capex_ebit_aftertax',
  sales_invested_capital: 'sales_invested_capital'
};

exports.Prisma.Effective_tax_rateScalarFieldEnum = {
  industry: 'industry',
  no_of_firms: 'no_of_firms',
  total_taxable_income: 'total_taxable_income',
  total_taxes_paid_accrual: 'total_taxes_paid_accrual',
  total_cash_taxes_paid: 'total_cash_taxes_paid',
  cash_taxes_accrual_taxes: 'cash_taxes_accrual_taxes',
  effectivetr_avg_across_all_comp: 'effectivetr_avg_across_all_comp',
  effectivetr_avg_across_money_making_comp: 'effectivetr_avg_across_money_making_comp',
  effectivetr_agg_tax_rate: 'effectivetr_agg_tax_rate',
  cashtr_avg_across_money_making_comp: 'cashtr_avg_across_money_making_comp',
  cashtr_agg_tax_rate: 'cashtr_agg_tax_rate'
};

exports.Prisma.Default_spread_large_firmScalarFieldEnum = {
  min: 'min',
  max: 'max',
  rating: 'rating',
  spread: 'spread'
};

exports.Prisma.Default_spread_small_firmScalarFieldEnum = {
  min: 'min',
  max: 'max',
  rating: 'rating',
  spread: 'spread'
};

exports.Prisma.Input_statsScalarFieldEnum = {
  industry: 'industry',
  count: 'count',
  revenue_growth_rate_first_quartile: 'revenue_growth_rate_first_quartile',
  revenue_growth_rate_median: 'revenue_growth_rate_median',
  revenue_growth_rate_third_quartile: 'revenue_growth_rate_third_quartile',
  pre_tax_operating_margin_first_quartile: 'pre_tax_operating_margin_first_quartile',
  pre_tax_operating_margin_median: 'pre_tax_operating_margin_median',
  pre_tax_operating_margin_third_quartile: 'pre_tax_operating_margin_third_quartile',
  sales_to_invested_capital_first_quartile: 'sales_to_invested_capital_first_quartile',
  sales_to_invested_capital_median: 'sales_to_invested_capital_median',
  sales_to_invested_capital_third_quartile: 'sales_to_invested_capital_third_quartile',
  cost_of_capital_first_quartile: 'cost_of_capital_first_quartile',
  cost_of_capital_median: 'cost_of_capital_median',
  cost_of_capital_third_quartile: 'cost_of_capital_third_quartile',
  beta_first_quartile: 'beta_first_quartile',
  beta_median: 'beta_median',
  beta_third_quartile: 'beta_third_quartile',
  debt_to_capital_ratio_first_quartile: 'debt_to_capital_ratio_first_quartile',
  debt_to_capital_ratio_median: 'debt_to_capital_ratio_median',
  debt_to_capital_ratio_third_quartile: 'debt_to_capital_ratio_third_quartile'
};

exports.Prisma.ValuationScalarFieldEnum = {
  id: 'id',
  symbol: 'symbol',
  email: 'email',
  inputs: 'inputs',
  fetched_inputs: 'fetched_inputs',
  stock_info: 'stock_info',
  valuation_model: 'valuation_model',
  valuation_output: 'valuation_output',
  implied_share_price: 'implied_share_price',
  description: 'description',
  valued_date: 'valued_date'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};


exports.Prisma.ModelName = {
  beta_us: 'beta_us',
  country_risk_premium: 'country_risk_premium',
  data_last_update: 'data_last_update',
  ebit_growth: 'ebit_growth',
  pe_ratio_us: 'pe_ratio_us',
  rev_growth_rate: 'rev_growth_rate',
  sales_to_cap_us: 'sales_to_cap_us',
  effective_tax_rate: 'effective_tax_rate',
  default_spread_large_firm: 'default_spread_large_firm',
  default_spread_small_firm: 'default_spread_small_firm',
  input_stats: 'input_stats',
  valuation: 'valuation'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
