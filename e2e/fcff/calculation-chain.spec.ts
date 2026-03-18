import { test, expect } from '@playwright/test';
import { mockAuth } from '../helpers/auth';
import { mockFcffApis } from '../helpers/mock-apis';
import { seedFcffState, AAPL_STATE } from '../helpers/seed-state';

/**
 * FCFF Full Calculation Chain Tests — AAPL base case
 *
 * These tests verify the end-to-end pipeline: seeded inputs → computed WACC
 * → implied share price. Tests use AAPL 2024 financials as the base fixture
 * and vary assumptions to verify directional correctness.
 *
 * Testid targets:
 *   - data-testid="implied-share-price"  → ImpliedValue.tsx value span
 *   - data-testid="wacc-value"           → WaccFormula.tsx FormulaBox
 */

async function getImpliedPrice(page: any): Promise<number> {
  const text = await page.getByTestId('implied-share-price').textContent();
  // Strip leading "$" if present
  return parseFloat((text ?? '0').replace('$', ''));
}

async function getWacc(page: any): Promise<number> {
  const text = await page.getByTestId('wacc-value').textContent();
  return parseFloat(text ?? '0');
}

async function waitForCalculation(page: any) {
  // Wait for both outputs to be rendered and non-trivial.
  // Require WACC > 7 to skip the intermediate ~4.17% state that appears before
  // the beta query resolves (default unleveredBeta=0 gives WACC≈4.17%; correct
  // AAPL WACC is ~9–10%).
  await page.waitForFunction(() => {
    const wacc = document.querySelector('[data-testid="wacc-value"]');
    const price = document.querySelector('[data-testid="implied-share-price"]');
    const waccVal = parseFloat(wacc?.textContent ?? '0');
    const priceVal = parseFloat((price?.textContent ?? '0').replace('$', ''));
    return (
      wacc && waccVal > 7 &&
      price && priceVal > 0
    );
  }, { timeout: 15_000 });
  // Allow cascading React state updates (ERP refetch → matureMarketErp →
  // terminalWacc → roicTerminalYear auto-set) to fully settle. Without this,
  // price reads can catch an intermediate state (~66) between when WACC first
  // crosses 7 and when dependent values propagate.
  await page.waitForTimeout(600);
}

test.describe('FCFF Full Calculation Chain — AAPL Scenarios', () => {

  // ── BASE CASE ────────────────────────────────────────────────────────────

  test('AAPL base case: implied share price is positive', async ({ page }) => {
    await mockAuth(page);
    await mockFcffApis(page);
    await seedFcffState(page);
    await page.goto('/fcff?symbol=AAPL');
    await waitForCalculation(page);

    const price = await getImpliedPrice(page);
    expect(price).toBeGreaterThan(0);
  });

  test('AAPL base case: WACC is in realistic range (7–13%)', async ({ page }) => {
    await mockAuth(page);
    await mockFcffApis(page);
    await seedFcffState(page);
    await page.goto('/fcff?symbol=AAPL');
    await waitForCalculation(page);

    const wacc = await getWacc(page);
    expect(wacc).toBeGreaterThan(7);
    expect(wacc).toBeLessThan(13);
  });

  // ── GROWTH SCENARIOS ─────────────────────────────────────────────────────

  test('Bear case (low growth + margin compression) → lower implied price than base', async ({ page }) => {
    // Seed base case first on the same page object is not possible (addInitScript is once-per-nav),
    // so we use two separate navigations comparing the two prices.

    await mockAuth(page);
    await mockFcffApis(page);

    // Base case price
    await seedFcffState(page);
    await page.goto('/fcff?symbol=AAPL');
    await waitForCalculation(page);
    const basePrice = await getImpliedPrice(page);

    // Bear case: slow growth, margin compression
    const BEAR_STATE = {
      ...AAPL_STATE,
      inputs: AAPL_STATE.inputs.map(i => {
        if (i.id === 'revGrowthYr1')    return { ...i, value: 1 };
        if (i.id === 'revGrowthYr2to5') return { ...i, value: 2 };
        if (i.id === 'opMarginYr1')     return { ...i, value: 27 };
        if (i.id === 'opMarginYr10')    return { ...i, value: 24 };
        return i;
      }),
    };
    await seedFcffState(page, BEAR_STATE);
    await page.goto('/fcff?symbol=AAPL');
    await waitForCalculation(page);
    const bearPrice = await getImpliedPrice(page);

    expect(bearPrice).toBeLessThan(basePrice);
  });

  test('Bull case (strong growth + margin expansion) → higher implied price than base', async ({ page }) => {
    await mockAuth(page);
    await mockFcffApis(page);

    // Base case
    await seedFcffState(page);
    await page.goto('/fcff?symbol=AAPL');
    await waitForCalculation(page);
    const basePrice = await getImpliedPrice(page);

    // Bull case: faster growth, better margins
    const BULL_STATE = {
      ...AAPL_STATE,
      inputs: AAPL_STATE.inputs.map(i => {
        if (i.id === 'revGrowthYr1')    return { ...i, value: 12 };
        if (i.id === 'revGrowthYr2to5') return { ...i, value: 15 };
        if (i.id === 'opMarginYr1')     return { ...i, value: 36 };
        if (i.id === 'opMarginYr10')    return { ...i, value: 42 };
        return i;
      }),
    };
    await seedFcffState(page, BULL_STATE);
    await page.goto('/fcff?symbol=AAPL');
    await waitForCalculation(page);
    const bullPrice = await getImpliedPrice(page);

    expect(bullPrice).toBeGreaterThan(basePrice);
  });

  test('Zero terminal growth → lower price than default riskFreeRate-anchored growth', async ({ page }) => {
    await mockAuth(page);
    await mockFcffApis(page);
    await seedFcffState(page);
    await page.goto('/fcff?symbol=AAPL');
    await waitForCalculation(page);
    const basePrice = await getImpliedPrice(page);

    // Enable "Override Perpetuity Growth Rate" via UI toggle and set g = 0%.
    // Default effectiveGrowthTerminal = riskFreeRate = 4.2%; setting to 0% reduces
    // terminal-year revenue (revenue[11] = revenue[10] × 1.0 instead of × 1.042),
    // which lowers ebitAfterTax[11] → lower TV → lower implied price.
    // This approach uses live UI interaction so it is unaffected by the session-state
    // override-flag reset that occurs when the symbol effect re-runs on state restore.
    const perpRow = page.locator('span:has-text("Override Perpetuity Growth Rate")').locator('../..');
    await perpRow.locator('button[aria-pressed]').click();
    await perpRow.locator('input').waitFor({ state: 'visible', timeout: 3_000 });
    await perpRow.locator('input').fill('0');
    await perpRow.locator('input').press('Tab');
    await page.waitForTimeout(800);

    const zeroTerminalPrice = await getImpliedPrice(page);
    expect(zeroTerminalPrice).toBeLessThan(basePrice);
  });

  test('Higher terminal growth (5% vs default 4.2%) → higher implied price', async ({ page }) => {
    await mockAuth(page);
    await mockFcffApis(page);
    await seedFcffState(page);
    await page.goto('/fcff?symbol=AAPL');
    await waitForCalculation(page);
    const basePrice = await getImpliedPrice(page);

    // Enable "Override Perpetuity Growth Rate" via UI toggle and set g = 5%.
    // Default effectiveGrowthTerminal = riskFreeRate = 4.2%; setting to 5% raises
    // terminal-year revenue (revenue[11] = revenue[10_high] × 1.05), which increases
    // ebitAfterTax[11] → higher TV → higher implied price.
    // Note: 5% < terminalWacc = 8.8%, so TV denominator (8.8−5) = 3.8% > 0. ✓
    const perpRow = page.locator('span:has-text("Override Perpetuity Growth Rate")').locator('../..');
    await perpRow.locator('button[aria-pressed]').click();
    await perpRow.locator('input').waitFor({ state: 'visible', timeout: 3_000 });
    await perpRow.locator('input').fill('5');
    await perpRow.locator('input').press('Tab');
    await page.waitForTimeout(800);

    const highTerminalPrice = await getImpliedPrice(page);
    expect(highTerminalPrice).toBeGreaterThan(basePrice);
  });

  // ── WACC SENSITIVITY → IMPLIED PRICE ────────────────────────────────────

  test('Junk rating (B2/B) → WACC increases → lower implied price than AAA', async ({ page }) => {
    await mockAuth(page);
    await mockFcffApis(page);
    await seedFcffState(page);
    await page.goto('/fcff?symbol=AAPL');
    await waitForCalculation(page);
    const priceAAA = await getImpliedPrice(page);

    // Downgrade to junk
    await page.getByTestId('dropdown-Synthetic Rating').click();
    await page.getByRole('option', { name: 'B2/B' }).click();
    await page.waitForTimeout(800);

    const priceJunk = await getImpliedPrice(page);
    expect(priceJunk).toBeLessThan(priceAAA);
  });

  test('Emerging market (Brazil) → higher WACC → lower implied price than US', async ({ page }) => {
    await mockAuth(page);
    await mockFcffApis(page);
    await seedFcffState(page);
    await page.goto('/fcff?symbol=AAPL');
    await waitForCalculation(page);
    const priceUS = await getImpliedPrice(page);

    await page.getByTestId('dropdown-Country').click();
    await page.getByRole('option', { name: 'Brazil' }).click();
    await page.waitForTimeout(800);

    const priceBrazil = await getImpliedPrice(page);
    expect(priceBrazil).toBeLessThan(priceUS);
  });

  test('Frontier market (Nigeria) → even lower implied price than Brazil', async ({ page }) => {
    await mockAuth(page);
    await mockFcffApis(page);
    await seedFcffState(page);
    await page.goto('/fcff?symbol=AAPL');
    await waitForCalculation(page);

    await page.getByTestId('dropdown-Country').click();
    await page.getByRole('option', { name: 'Brazil' }).click();
    await page.waitForTimeout(600);
    const priceBrazil = await getImpliedPrice(page);

    await page.getByTestId('dropdown-Country').click();
    await page.getByRole('option', { name: 'Nigeria' }).click();
    await page.waitForTimeout(600);
    const priceNigeria = await getImpliedPrice(page);

    expect(priceNigeria).toBeLessThan(priceBrazil);
  });

  test('High-beta industry (Retail General) → higher WACC → lower price than Software', async ({ page }) => {
    await mockAuth(page);
    await mockFcffApis(page);
    await seedFcffState(page);
    await page.goto('/fcff?symbol=AAPL');
    await waitForCalculation(page);
    const priceSoftware = await getImpliedPrice(page);

    await page.getByTestId('dropdown-Industry').click();
    await page.getByRole('option', { name: 'Retail (General)' }).click();
    await page.waitForTimeout(800);

    const priceOnlineRetail = await getImpliedPrice(page);
    expect(priceOnlineRetail).toBeLessThan(priceSoftware);
  });

  // ── REVENUE GROWTH INPUT ─────────────────────────────────────────────────

  test('Increasing Y1 revenue growth from 6% → 20%: implied price rises', async ({ page }) => {
    await mockAuth(page);
    await mockFcffApis(page);
    await seedFcffState(page);
    await page.goto('/fcff?symbol=AAPL');
    await waitForCalculation(page);
    const priceBefore = await getImpliedPrice(page);

    const growthInput = page.locator('#revGrowthYr1');
    await growthInput.fill('20');
    await growthInput.press('Tab');
    await page.waitForTimeout(800);

    const priceAfter = await getImpliedPrice(page);
    expect(priceAfter).toBeGreaterThan(priceBefore);
  });

  test('Decreasing Y1 revenue growth from 6% → 0%: implied price falls', async ({ page }) => {
    await mockAuth(page);
    await mockFcffApis(page);
    await seedFcffState(page);
    await page.goto('/fcff?symbol=AAPL');
    await waitForCalculation(page);
    const priceBefore = await getImpliedPrice(page);

    const growthInput = page.locator('#revGrowthYr1');
    await growthInput.fill('0');
    await growthInput.press('Tab');
    await page.waitForTimeout(800);

    const priceAfter = await getImpliedPrice(page);
    expect(priceAfter).toBeLessThan(priceBefore);
  });

  // ── OPERATING MARGIN INPUT ───────────────────────────────────────────────

  test('Increasing operating margin Y1 from 32% → 45%: implied price rises', async ({ page }) => {
    await mockAuth(page);
    await mockFcffApis(page);
    await seedFcffState(page);
    await page.goto('/fcff?symbol=AAPL');
    await waitForCalculation(page);
    const priceBefore = await getImpliedPrice(page);

    const marginInput = page.locator('#opMarginYr1');
    await marginInput.fill('45');
    await marginInput.press('Tab');
    await page.waitForTimeout(800);

    const priceAfter = await getImpliedPrice(page);
    expect(priceAfter).toBeGreaterThan(priceBefore);
  });

  // ── COMPOUND MULTI-INPUT SCENARIOS ───────────────────────────────────────

  test('Worst case: bear inputs + junk rating + Nigeria: price << base', async ({ page }) => {
    await mockAuth(page);
    await mockFcffApis(page);

    // Base case
    await seedFcffState(page);
    await page.goto('/fcff?symbol=AAPL');
    await waitForCalculation(page);
    const basePrice = await getImpliedPrice(page);

    // Worst-case state: slow growth + high WACC setup
    const WORST_STATE = {
      ...AAPL_STATE,
      inputs: AAPL_STATE.inputs.map(i => {
        if (i.id === 'revGrowthYr1')       return { ...i, value: 1 };
        if (i.id === 'revGrowthYr2to5')    return { ...i, value: 2 };
        if (i.id === 'revGrowthPerpetuity') return { ...i, value: 1 };
        if (i.id === 'opMarginYr1')        return { ...i, value: 26 };
        if (i.id === 'opMarginYr10')       return { ...i, value: 22 };
        return i;
      }),
    };
    await seedFcffState(page, WORST_STATE);
    await page.goto('/fcff?symbol=AAPL');
    await waitForCalculation(page);

    // Also set worst-case WACC drivers via dropdowns
    await page.getByTestId('dropdown-Industry').click();
    await page.getByRole('option', { name: 'Retail (General)' }).click();
    await page.waitForTimeout(400);

    await page.getByTestId('dropdown-Synthetic Rating').click();
    await page.getByRole('option', { name: 'B2/B' }).click();
    await page.waitForTimeout(400);

    await page.getByTestId('dropdown-Country').click();
    await page.getByRole('option', { name: 'Nigeria' }).click();
    await page.waitForTimeout(800);

    const worstPrice = await getImpliedPrice(page);
    expect(worstPrice).toBeLessThan(basePrice);
  });

  test('Best case: bull inputs + low-beta Brokerage + AAA + US: price >> base', async ({ page }) => {
    await mockAuth(page);
    await mockFcffApis(page);

    await seedFcffState(page);
    await page.goto('/fcff?symbol=AAPL');
    await waitForCalculation(page);
    const basePrice = await getImpliedPrice(page);

    const BEST_STATE = {
      ...AAPL_STATE,
      inputs: AAPL_STATE.inputs.map(i => {
        if (i.id === 'revGrowthYr1')       return { ...i, value: 15 };
        if (i.id === 'revGrowthYr2to5')    return { ...i, value: 18 };
        if (i.id === 'revGrowthPerpetuity') return { ...i, value: 4 };
        if (i.id === 'opMarginYr1')        return { ...i, value: 36 };
        if (i.id === 'opMarginYr10')       return { ...i, value: 43 };
        return i;
      }),
    };
    await seedFcffState(page, BEST_STATE);
    await page.goto('/fcff?symbol=AAPL');
    await waitForCalculation(page);

    await page.getByTestId('dropdown-Industry').click();
    await page.getByRole('option', { name: 'Brokerage & Investment Banking' }).click();
    await page.waitForTimeout(400);

    await page.getByTestId('dropdown-Synthetic Rating').click();
    await page.getByRole('option', { name: 'Aaa/AAA' }).click();
    await page.waitForTimeout(400);

    await page.getByTestId('dropdown-Country').click();
    await page.getByRole('option', { name: 'United States' }).click();
    await page.waitForTimeout(800);

    const bestPrice = await getImpliedPrice(page);
    expect(bestPrice).toBeGreaterThan(basePrice);
  });

  // ── VALUATION CONSISTENCY ────────────────────────────────────────────────

  test('WACC and implied price are inversely correlated: higher WACC → lower price', async ({ page }) => {
    await mockAuth(page);
    await mockFcffApis(page);
    await seedFcffState(page);
    await page.goto('/fcff?symbol=AAPL');
    await waitForCalculation(page);

    const waccAAA   = await getWacc(page);
    const priceAAA  = await getImpliedPrice(page);

    await page.getByTestId('dropdown-Synthetic Rating').click();
    await page.getByRole('option', { name: 'Caa/CCC' }).click();
    await page.waitForTimeout(800);

    const waccCaa   = await getWacc(page);
    const priceCaa  = await getImpliedPrice(page);

    expect(waccCaa).toBeGreaterThan(waccAAA);
    expect(priceCaa).toBeLessThan(priceAAA);
  });
});
