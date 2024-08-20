/*
  Warnings:

  - You are about to drop the `tax_rate` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "tax_rate";

-- CreateTable
CREATE TABLE "effective_tax_rate" (
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

    CONSTRAINT "effective_tax_rate_pkey" PRIMARY KEY ("industry")
);
