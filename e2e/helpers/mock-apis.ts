import { Page } from '@playwright/test';

/**
 * Mocks all FCFF-relevant Aswath-data API routes with deterministic values.
 * Different industries, ratings, and countries return different values so
 * dropdown-sensitivity tests can assert direction of WACC change.
 *
 * Must be called before page.goto().
 */
export async function mockFcffApis(page: Page) {
  // ── Beta by industry ─────────────────────────────────────────────────────
  // Each industry maps to an unlevered beta sourced from Damodaran 2024
  const INDUSTRY_BETAS: Record<string, number> = {
    'Software (Entertainment)':      1.21,   // AAPL base case
    'Software (Internet)':           1.10,
    'Brokerage & Investment Banking': 0.35,  // low-risk, regulated → much lower WACC
    'Tobacco':                        0.60,  // defensive
    'Retail (General)':               1.45,  // high-growth cyclical → higher WACC
  };

  await page.route('**/api/aswath-data/beta-us**', route => {
    const url = new URL(route.request().url());
    const industry = decodeURIComponent(url.searchParams.get('industry') || '');
    const beta = INDUSTRY_BETAS[industry] ?? 1.0;
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ avg_unlevered_beta: String(beta) }),
    });
  });

  // ── Synthetic rating spread ───────────────────────────────────────────────
  // Returns the spread as a raw decimal number (the route does `NextResponse.json(data.spread)`)
  // queryAPIFunctions.ts then does: Number(data) * 100 → percentage points
  const RATING_SPREADS: Record<string, number> = {
    'Aaa/AAA':  0.006,
    'Aa2/AA':   0.008,
    'A1/A+':    0.010,
    'A2/A':     0.012,
    'Baa2/BBB': 0.018,
    'Ba2/BB':   0.025,
    'B1/B+':    0.040,
    'B2/B':     0.055,
    'B3/B-':    0.065,
    'Caa/CCC':  0.090,
  };

  await page.route('**/api/aswath-data/synthetic-rating/get-spread**', route => {
    const url = new URL(route.request().url());
    const rating = decodeURIComponent(url.searchParams.get('rating') || '');
    const spread = RATING_SPREADS[rating] ?? 0.006;
    // Route returns the spread value directly (not wrapped in an object)
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(String(spread)),
    });
  });

  // ── Country equity risk premium ───────────────────────────────────────────
  // equity_risk_premium and corporate_tax_rate are returned as string percentages
  // (e.g. "4.6" means 4.6%). mature_market_erp is a scalar.
  const COUNTRY_DATA: Record<string, { equity_risk_premium: string; corporate_tax_rate: string; mature_market_erp: string }> = {
    'United States': { equity_risk_premium: '4.6',  corporate_tax_rate: '26', mature_market_erp: '4.6' },
    'Germany':       { equity_risk_premium: '5.1',  corporate_tax_rate: '30', mature_market_erp: '4.6' },
    'Brazil':        { equity_risk_premium: '8.5',  corporate_tax_rate: '34', mature_market_erp: '4.6' },
    'Nigeria':       { equity_risk_premium: '12.2', corporate_tax_rate: '30', mature_market_erp: '4.6' },
  };

  await page.route('**/api/aswath-data/country-risk-premium**', route => {
    const url = new URL(route.request().url());
    const country = decodeURIComponent(url.searchParams.get('country') || '');
    const d = COUNTRY_DATA[country] ?? COUNTRY_DATA['United States'];
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(d),
    });
  });
}
