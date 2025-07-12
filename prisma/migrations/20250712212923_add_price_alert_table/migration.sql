-- CreateTable
CREATE TABLE "price_alert" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "symbol" VARCHAR(10) NOT NULL,
    "target_price" DECIMAL(10,2) NOT NULL,
    "condition" VARCHAR(10) NOT NULL,
    "status" VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires_at" TIMESTAMP(3),
    "triggered_at" TIMESTAMP(3),

    CONSTRAINT "price_alert_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "price_alert_email_idx" ON "price_alert"("email");

-- CreateIndex
CREATE INDEX "price_alert_symbol_idx" ON "price_alert"("symbol");

-- CreateIndex
CREATE INDEX "price_alert_status_idx" ON "price_alert"("status"); 