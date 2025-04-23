/*
  Warnings:

  - You are about to drop the `ROIC` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ROIC";

-- CreateTable
CREATE TABLE "roic" (
    "industry" TEXT NOT NULL,
    "no_of_firms" TEXT,
    "roc" TEXT,
    "reinvestment_rate" TEXT,
    "expected_growth_ebit" TEXT,

    CONSTRAINT "roic_pkey" PRIMARY KEY ("industry")
);
