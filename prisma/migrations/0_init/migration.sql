-- CreateTable
CREATE TABLE "beta_us" (
    "industry" VARCHAR(255) NOT NULL,
    "no_of_firms" VARCHAR(255),
    "avg_unlevered_beta" VARCHAR(255),
    "avg_levered_beta" VARCHAR(255),
    "avg_correlation_with_mkt" VARCHAR(255),
    "total_unlevered_beta" VARCHAR(255),
    "total_levered_beta" VARCHAR(255),

    CONSTRAINT "beta_us_pkey" PRIMARY KEY ("industry")
);

-- CreateTable
CREATE TABLE "country_risk_premium" (
    "country" VARCHAR NOT NULL,
    "adj_default_spread" VARCHAR,
    "equity_risk_premium" VARCHAR,
    "country_risk_premium" VARCHAR,
    "corporate_tax_rate" VARCHAR,
    "moody_rating" VARCHAR,
    "soverign_cds_spread" VARCHAR,

    CONSTRAINT "country_equity_risk_premium_pk" PRIMARY KEY ("country")
);

-- CreateTable
CREATE TABLE "data_last_update" (
    "data_name" VARCHAR(255) NOT NULL,
    "last_update" DATE,

    CONSTRAINT "data_last_update_pkey" PRIMARY KEY ("data_name")
);

-- CreateTable
CREATE TABLE "ebit_growth" (
    "industry" VARCHAR(255) NOT NULL,
    "no_of_firms" VARCHAR(255),
    "roc" VARCHAR(255),
    "reinvestment_rate" VARCHAR(255),
    "expected_growth_ebit" VARCHAR(255),

    CONSTRAINT "ebit_growth_pkey" PRIMARY KEY ("industry")
);

-- CreateTable
CREATE TABLE "pe_ratio_us" (
    "industry" VARCHAR(255) NOT NULL,
    "no_of_firms" VARCHAR(255),
    "perc_money_losing_firms_trailing" VARCHAR(255),
    "current_pe" VARCHAR(255),
    "trailing_pe" VARCHAR(255),
    "forward_pe" VARCHAR(255),
    "agg_mkt_cap_net_income" VARCHAR(255),
    "agg_mkt_cap_trailing_net_income_money_making_firms" VARCHAR(255),
    "expected_growth_next_5_yrs" VARCHAR(255),
    "peg_ratio" VARCHAR(255),

    CONSTRAINT "pe_ratio_us_pkey" PRIMARY KEY ("industry")
);

-- CreateTable
CREATE TABLE "rev_growth_rate" (
    "industry" VARCHAR(255) NOT NULL,
    "no_of_firms" VARCHAR(255),
    "cagr_net_income_last_5_years" VARCHAR(255),
    "cagr_net_rev_last_5_years" VARCHAR(255),
    "expected_growth_rev_next_2_years" VARCHAR(255),
    "expected_growth_rev_next_5_years" VARCHAR(255),
    "expected_growth_eps_next_5_years" VARCHAR(255),

    CONSTRAINT "rev_growth_rate_pkey" PRIMARY KEY ("industry")
);

-- CreateTable
CREATE TABLE "sales_to_cap_us" (
    "industry" VARCHAR(255) NOT NULL,
    "no_of_firms" VARCHAR(255),
    "capex" VARCHAR(255),
    "depre_amort" VARCHAR(255),
    "capex_depre" VARCHAR(255),
    "acquisitions" VARCHAR(255),
    "net_r_and_d" VARCHAR(255),
    "net_capex_sales" VARCHAR(255),
    "net_capex_ebit_aftertax" VARCHAR(255),
    "sales_invested_capital" VARCHAR(255),

    CONSTRAINT "sales_to_cap_us_pkey" PRIMARY KEY ("industry")
);

-- CreateTable
CREATE TABLE "tax_rate" (
    "industry" VARCHAR(255) NOT NULL,
    "no_of_firms" VARCHAR(255),
    "total_taxable_income" VARCHAR(255),
    "total_taxes_paid_accrual" VARCHAR(255),
    "total_cash_taxes_paid" VARCHAR(255),
    "cash_taxes_accrual_taxes" VARCHAR(255),
    "effectivetr_avg_across_all_comp" VARCHAR(255),
    "effectivetr_avg_across_money_making_comp" VARCHAR(255),
    "effectivetr_agg_tax_rate" VARCHAR(255),
    "cashtr_avg_across_money_making_comp" VARCHAR(255),
    "cashtr_agg_tax_rate" VARCHAR(255),

    CONSTRAINT "tax_rate_pkey" PRIMARY KEY ("industry")
);

