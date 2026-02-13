import { vi } from 'vitest';

// Mock API responses
export const mockYahooFinanceIncomeStatement = {
  '1672531200': {
    'Total Revenue': 1000000000,
    'Operating Income': 200000000,
    'Tax Provision': 40000000,
    'Pretax Income': 180000000,
    'Interest Expense': 10000000,
    'Minority Interest': 0
  }
};

export const mockYahooFinanceBalanceSheet = [
  {
    date: '2024-01-01',
    'Cash Cash Equivalents And Short Term Investments': 50000000,
    'Total Equity Gross Minority Interest': 500000000,
    'Total Debt': 100000000
  }
];

export const mockStockInfo = {
  currentPrice: 150.25,
  impliedSharesOutstanding: 10000000,
  companyName: 'Test Company Inc.'
};

export const mockFinnhubQuote = {
  c: 150.25,  // current price
  h: 152.00,  // high
  l: 148.50,  // low
  o: 149.00,  // open
  pc: 149.50  // previous close
};

export const mockAswathData = {
  equity_risk_premium: 6.0,
  corporate_tax_rate: 21.0
};

// Create axios mock
export const createAxiosMock = () => {
  return {
    get: vi.fn((url: string) => {
      if (url.includes('/api/ttm/income-statement')) {
        return Promise.resolve({ data: mockYahooFinanceIncomeStatement });
      }
      if (url.includes('/api/quarterly/balance-sheet')) {
        return Promise.resolve({ data: mockYahooFinanceBalanceSheet });
      }
      if (url.includes('/api/stock-info')) {
        return Promise.resolve({ data: mockStockInfo });
      }
      if (url.includes('/api/aswath-data/country-risk-premium')) {
        return Promise.resolve({ data: mockAswathData });
      }
      if (url.includes('finnhub')) {
        return Promise.resolve({ data: mockFinnhubQuote });
      }
      return Promise.reject(new Error('Unknown API endpoint'));
    }),
    post: vi.fn()
  };
};
