/*
  Warnings:

  - You are about to drop the column `soverign_cds_spread` on the `country_risk_premium` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "country_risk_premium" DROP COLUMN "soverign_cds_spread";

-- CreateTable
CREATE TABLE "default_spread_large_firm" (
    "min" VARCHAR(255),
    "max" VARCHAR(255),
    "rating" VARCHAR(255) NOT NULL,
    "spread" VARCHAR(255),

    CONSTRAINT "default_spread_large_firm_pkey" PRIMARY KEY ("rating")
);

-- CreateTable
CREATE TABLE "default_spread_small_firm" (
    "min" VARCHAR(255),
    "max" VARCHAR(255),
    "rating" VARCHAR(255) NOT NULL,
    "spread" VARCHAR(255),

    CONSTRAINT "default_spread_small_firm_pkey" PRIMARY KEY ("rating")
);

-- CreateTable
CREATE TABLE "input_stats" (
    "industry" TEXT NOT NULL,
    "count" INTEGER,
    "revenue_growth_rate_first_quartile" REAL,
    "revenue_growth_rate_median" REAL,
    "revenue_growth_rate_third_quartile" REAL,
    "pre_tax_operating_margin_first_quartile" REAL,
    "pre_tax_operating_margin_median" REAL,
    "pre_tax_operating_margin_third_quartile" REAL,
    "sales_to_invested_capital_first_quartile" REAL,
    "sales_to_invested_capital_median" REAL,
    "sales_to_invested_capital_third_quartile" REAL,
    "cost_of_capital_first_quartile" REAL,
    "cost_of_capital_median" REAL,
    "cost_of_capital_third_quartile" REAL,
    "beta_first_quartile" REAL,
    "beta_median" REAL,
    "beta_third_quartile" REAL,
    "debt_to_capital_ratio_first_quartile" REAL,
    "debt_to_capital_ratio_median" REAL,
    "debt_to_capital_ratio_third_quartile" REAL,

    CONSTRAINT "input_stats_pkey" PRIMARY KEY ("industry")
);

-- CreateTable
CREATE TABLE "valuation" (
    "id" SERIAL NOT NULL,
    "symbol" VARCHAR(50),
    "email" VARCHAR(50),
    "inputs" JSONB,
    "fetched_inputs" JSONB,
    "stock_info" JSONB,
    "valuation_model" JSONB,
    "valuation_output" JSONB,
    "implied_share_price" DECIMAL(10,2),
    "description" TEXT,
    "valued_date" INTEGER,

    CONSTRAINT "valuation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ROIC" (
    "industry" TEXT NOT NULL,
    "no_of_firms" TEXT,
    "roc" TEXT,
    "reinvestment_rate" TEXT,
    "expected_growth_ebit" TEXT,

    CONSTRAINT "ROIC_pkey" PRIMARY KEY ("industry")
);
