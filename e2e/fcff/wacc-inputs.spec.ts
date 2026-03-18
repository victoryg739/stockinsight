import { test, expect } from '@playwright/test';
import { mockAuth } from '../helpers/auth';
import { mockFcffApis } from '../helpers/mock-apis';
import { seedFcffState, AAPL_STATE } from '../helpers/seed-state';

/**
 * WACC Dropdown Sensitivity Tests — AAPL base case
 *
 * Each test verifies that changing a dropdown input causes the WACC display
 * to update in the expected direction. Uses mocked APIs (no real network calls)
 * and seeded sessionStorage (no DB queries).
 *
 * Testid targets:
 *   - data-testid="wacc-value"            → WaccFormula.tsx FormulaBox div
 *   - data-testid="dropdown-Industry"     → DropDown.tsx trigger div
 *   - data-testid="dropdown-Synthetic Rating"
 *   - data-testid="dropdown-Country"
 */

async function getWacc(page: any): Promise<number> {
  const text = await page.getByTestId('wacc-value').textContent();
  return parseFloat(text ?? '0');
}

test.describe('FCFF WACC Dropdown Sensitivity (AAPL base case)', () => {

  test.beforeEach(async ({ page }) => {
    await mockAuth(page);
    await mockFcffApis(page);
    await seedFcffState(page);
    await page.goto('/fcff?symbol=AAPL');
    // Wait for WACC to be computed and rendered (non-zero, non-empty)
    await expect(page.getByTestId('wacc-value')).not.toBeEmpty();
    await page.waitForFunction(() => {
      const el = document.querySelector('[data-testid="wacc-value"]');
      // Require > 7 to skip the intermediate ~4.17% WACC state (default unleveredBeta=0)
      // before the beta query resolves. Correct AAPL WACC is ~9–10%.
      return el && parseFloat(el.textContent ?? '0') > 7;
    }, { timeout: 10_000 });
  });

  // ── REGRESSION GUARD ─────────────────────────────────────────────────────

  test('REGRESSION: WACC is ~7–13% for AAPL on load (not stale zero from fix #7)', async ({ page }) => {
    const wacc = await getWacc(page);
    // If fix #7 regression reappears, betaQuery stays 0 → WACC ~4–5%
    expect(wacc).toBeGreaterThan(7);
    expect(wacc).toBeLessThan(13);
  });

  // ── INDUSTRY DROPDOWN ────────────────────────────────────────────────────

  test('[Industry] Software → Brokerage & Investment Banking: WACC decreases (lower unlevered beta)', async ({ page }) => {
    const waccBefore = await getWacc(page);

    await page.getByTestId('dropdown-Industry').click();
    await page.getByRole('option', { name: 'Brokerage & Investment Banking' }).click();
    await page.waitForTimeout(600);

    const waccAfter = await getWacc(page);
    // Brokerage & Investment Banking unlevered beta 0.35 << Software 1.21 → much lower cost of equity
    expect(waccAfter).toBeLessThan(waccBefore);
  });

  test('[Industry] Software → Tobacco: WACC decreases (defensive, low beta)', async ({ page }) => {
    const waccBefore = await getWacc(page);

    await page.getByTestId('dropdown-Industry').click();
    await page.getByRole('option', { name: 'Tobacco' }).click();
    await page.waitForTimeout(600);

    const waccAfter = await getWacc(page);
    // Tobacco unlevered beta 0.60 < Software 1.21
    expect(waccAfter).toBeLessThan(waccBefore);
  });

  test('[Industry] Software → Retail (General): WACC increases (higher beta)', async ({ page }) => {
    const waccBefore = await getWacc(page);

    await page.getByTestId('dropdown-Industry').click();
    await page.getByRole('option', { name: 'Retail (General)' }).click();
    await page.waitForTimeout(600);

    const waccAfter = await getWacc(page);
    // Retail (General) unlevered beta 1.45 > Software 1.21
    expect(waccAfter).toBeGreaterThan(waccBefore);
  });

  test('[Industry] Beta ordering: Brokerage < Tobacco < Software < Retail WACC', async ({ page }) => {
    const waccForIndustry = async (industry: string) => {
      await page.getByTestId('dropdown-Industry').click();
      await page.getByRole('option', { name: industry }).click();
      await page.waitForTimeout(500);
      return getWacc(page);
    };

    const waccBanking      = await waccForIndustry('Brokerage & Investment Banking');
    const waccTobacco      = await waccForIndustry('Tobacco');
    const waccSoftware     = await waccForIndustry('Software (Entertainment)');
    const waccOnlineRetail = await waccForIndustry('Retail (General)');

    expect(waccBanking).toBeLessThan(waccTobacco);
    expect(waccTobacco).toBeLessThan(waccSoftware);
    expect(waccSoftware).toBeLessThan(waccOnlineRetail);
  });

  test('[Industry] Switching back to Software restores original WACC', async ({ page }) => {
    const waccOriginal = await getWacc(page);

    // Change to Brokerage & Investment Banking
    await page.getByTestId('dropdown-Industry').click();
    await page.getByRole('option', { name: 'Brokerage & Investment Banking' }).click();
    await page.waitForTimeout(600);

    // Switch back to Software (Entertainment)
    await page.getByTestId('dropdown-Industry').click();
    await page.getByRole('option', { name: 'Software (Entertainment)' }).click();
    await page.waitForTimeout(600);

    const waccRestored = await getWacc(page);
    // Should restore to within rounding tolerance
    expect(Math.abs(waccRestored - waccOriginal)).toBeLessThan(0.2);
  });

  // ── SYNTHETIC RATING DROPDOWN ────────────────────────────────────────────

  test('[Rating] Aaa/AAA → A1/A+: WACC increases (higher spread)', async ({ page }) => {
    const waccBefore = await getWacc(page);

    await page.getByTestId('dropdown-Synthetic Rating').click();
    await page.getByRole('option', { name: 'A1/A+' }).click();
    await page.waitForTimeout(600);

    const waccAfter = await getWacc(page);
    // A1/A+ spread 1.0% > AAA spread 0.6%
    expect(waccAfter).toBeGreaterThan(waccBefore);
  });

  test('[Rating] Aaa/AAA → Baa2/BBB: WACC increases (investment grade degradation)', async ({ page }) => {
    const waccBefore = await getWacc(page);

    await page.getByTestId('dropdown-Synthetic Rating').click();
    await page.getByRole('option', { name: 'Baa2/BBB' }).click();
    await page.waitForTimeout(600);

    const waccAfter = await getWacc(page);
    // BBB spread 1.8% >> AAA spread 0.6%
    expect(waccAfter).toBeGreaterThan(waccBefore);
  });

  test('[Rating] Aaa/AAA → B2/B: WACC increases significantly (junk spread)', async ({ page }) => {
    const waccBefore = await getWacc(page);

    await page.getByTestId('dropdown-Synthetic Rating').click();
    await page.getByRole('option', { name: 'B2/B' }).click();
    await page.waitForTimeout(600);

    const waccAfter = await getWacc(page);
    // B2/B spread 5.5% vs AAA 0.6% (Δ=4.9%). With AAPL debt weight ≈3.5%:
    // ΔWACC ≈ 4.9 × 0.74 × 0.035 ≈ 0.13%. Threshold set below actual delta.
    expect(waccAfter - waccBefore).toBeGreaterThan(0.05);
  });

  test('[Rating] Aaa/AAA → Caa/CCC: WACC increases substantially (distressed spread)', async ({ page }) => {
    const waccBefore = await getWacc(page);

    await page.getByTestId('dropdown-Synthetic Rating').click();
    await page.getByRole('option', { name: 'Caa/CCC' }).click();
    await page.waitForTimeout(600);

    const waccAfter = await getWacc(page);
    // Caa/CCC spread 9.0% vs AAA 0.6% (Δ=8.4%). With AAPL debt weight ≈3.5%:
    // ΔWACC ≈ 8.4 × 0.74 × 0.035 ≈ 0.22%. Threshold set below actual delta.
    expect(waccAfter - waccBefore).toBeGreaterThan(0.1);
  });

  test('[Rating] Downgrade ordering: AAA < BBB < B2/B < Caa/CCC WACC', async ({ page }) => {
    const waccForRating = async (rating: string) => {
      await page.getByTestId('dropdown-Synthetic Rating').click();
      await page.getByRole('option', { name: rating }).click();
      await page.waitForTimeout(500);
      return getWacc(page);
    };

    const waccAAA  = await waccForRating('Aaa/AAA');
    const waccBBB  = await waccForRating('Baa2/BBB');
    const waccB    = await waccForRating('B2/B');
    const waccCaa  = await waccForRating('Caa/CCC');

    expect(waccAAA).toBeLessThan(waccBBB);
    expect(waccBBB).toBeLessThan(waccB);
    expect(waccB).toBeLessThan(waccCaa);
  });

  test('[Rating] Upgrading from B back to AAA reduces WACC', async ({ page }) => {
    // Start with junk
    await page.getByTestId('dropdown-Synthetic Rating').click();
    await page.getByRole('option', { name: 'B2/B' }).click();
    await page.waitForTimeout(500);
    const waccJunk = await getWacc(page);

    // Upgrade to AAA
    await page.getByTestId('dropdown-Synthetic Rating').click();
    await page.getByRole('option', { name: 'Aaa/AAA' }).click();
    await page.waitForTimeout(500);
    const waccAAA = await getWacc(page);

    expect(waccAAA).toBeLessThan(waccJunk);
  });

  // ── COUNTRY DROPDOWN ─────────────────────────────────────────────────────

  test('[Country] United States → Brazil: WACC increases (higher ERP)', async ({ page }) => {
    const waccBefore = await getWacc(page);

    await page.getByTestId('dropdown-Country').click();
    await page.getByRole('option', { name: 'Brazil' }).click();
    await page.waitForTimeout(600);

    const waccAfter = await getWacc(page);
    // Brazil ERP 8.5% > US ERP 4.6% → higher cost of equity
    expect(waccAfter).toBeGreaterThan(waccBefore);
  });

  test('[Country] United States → Germany: WACC changes minimally (similarly low ERP)', async ({ page }) => {
    const waccBefore = await getWacc(page);

    await page.getByTestId('dropdown-Country').click();
    await page.getByRole('option', { name: 'Germany' }).click();
    await page.waitForTimeout(600);

    const waccAfter = await getWacc(page);
    // Germany ERP 5.1% ≈ US 4.6%; difference should be < 1%
    expect(Math.abs(waccAfter - waccBefore)).toBeLessThan(1.5);
  });

  test('[Country] United States → Nigeria: WACC increases substantially (frontier market)', async ({ page }) => {
    const waccBefore = await getWacc(page);

    await page.getByTestId('dropdown-Country').click();
    await page.getByRole('option', { name: 'Nigeria' }).click();
    await page.waitForTimeout(600);

    const waccAfter = await getWacc(page);
    // Nigeria ERP 12.2% >> US ERP 4.6%
    expect(waccAfter).toBeGreaterThan(waccBefore);
  });

  test('[Country] ERP ordering: US < Germany < Brazil < Nigeria WACC', async ({ page }) => {
    const waccForCountry = async (country: string) => {
      await page.getByTestId('dropdown-Country').click();
      await page.getByRole('option', { name: country }).click();
      await page.waitForTimeout(500);
      return getWacc(page);
    };

    const waccUS  = await waccForCountry('United States');
    const waccDE  = await waccForCountry('Germany');
    const waccBR  = await waccForCountry('Brazil');
    const waccNG  = await waccForCountry('Nigeria');

    expect(waccUS).toBeLessThan(waccDE);
    expect(waccDE).toBeLessThan(waccBR);
    expect(waccBR).toBeLessThan(waccNG);
  });

  test('[Country] Switching back to United States restores WACC', async ({ page }) => {
    const waccOriginal = await getWacc(page);

    await page.getByTestId('dropdown-Country').click();
    await page.getByRole('option', { name: 'Nigeria' }).click();
    await page.waitForTimeout(600);

    await page.getByTestId('dropdown-Country').click();
    await page.getByRole('option', { name: 'United States' }).click();
    await page.waitForTimeout(600);

    const waccRestored = await getWacc(page);
    expect(Math.abs(waccRestored - waccOriginal)).toBeLessThan(0.2);
  });

  // ── COMPOUND DROPDOWN CHANGES ────────────────────────────────────────────

  test('[Compound] High-beta industry + junk rating: WACC compounds upward', async ({ page }) => {
    const waccBase = await getWacc(page);

    // Step 1: higher-beta industry
    await page.getByTestId('dropdown-Industry').click();
    await page.getByRole('option', { name: 'Retail (General)' }).click();
    await page.waitForTimeout(500);
    const waccStep1 = await getWacc(page);

    // Step 2: also degrade to junk
    await page.getByTestId('dropdown-Synthetic Rating').click();
    await page.getByRole('option', { name: 'B2/B' }).click();
    await page.waitForTimeout(500);
    const waccStep2 = await getWacc(page);

    expect(waccStep1).toBeGreaterThan(waccBase);
    expect(waccStep2).toBeGreaterThan(waccStep1);
  });

  test('[Compound] All worst-case: Retail (General) + B2/B + Nigeria: maximum WACC', async ({ page }) => {
    const waccBase = await getWacc(page);

    await page.getByTestId('dropdown-Industry').click();
    await page.getByRole('option', { name: 'Retail (General)' }).click();
    await page.waitForTimeout(400);

    await page.getByTestId('dropdown-Synthetic Rating').click();
    await page.getByRole('option', { name: 'B2/B' }).click();
    await page.waitForTimeout(400);

    await page.getByTestId('dropdown-Country').click();
    await page.getByRole('option', { name: 'Nigeria' }).click();
    await page.waitForTimeout(600);

    const waccWorstCase = await getWacc(page);
    expect(waccWorstCase).toBeGreaterThan(waccBase);
  });

  test('[Compound] All best-case: Brokerage & Investment Banking + AAA + US: minimum WACC', async ({ page }) => {
    // Force industry to Retail (General) first to have headroom below
    await page.getByTestId('dropdown-Industry').click();
    await page.getByRole('option', { name: 'Retail (General)' }).click();
    // Wait for Retail beta (1.45) to resolve — WACC rises to ~11%. The intermediate
    // state (unleveredBeta resets to 0) briefly drops WACC to ~4.17%, so a fixed
    // 400ms timeout is unreliable. Require > 10 to confirm Retail beta is applied.
    await page.waitForFunction(() => {
      const el = document.querySelector('[data-testid="wacc-value"]');
      return el && parseFloat(el.textContent ?? '0') > 10;
    }, { timeout: 5_000 });
    const waccHighStart = await getWacc(page);

    // Now select best-case combination
    await page.getByTestId('dropdown-Industry').click();
    await page.getByRole('option', { name: 'Brokerage & Investment Banking' }).click();
    await page.waitForTimeout(400);

    await page.getByTestId('dropdown-Synthetic Rating').click();
    await page.getByRole('option', { name: 'Aaa/AAA' }).click();
    await page.waitForTimeout(400);

    await page.getByTestId('dropdown-Country').click();
    await page.getByRole('option', { name: 'United States' }).click();
    await page.waitForTimeout(600);

    const waccBestCase = await getWacc(page);
    expect(waccBestCase).toBeLessThan(waccHighStart);
  });
});
