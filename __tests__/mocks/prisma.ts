import { PrismaClient } from '@prisma/client';
import { mockDeep, mockReset, DeepMockProxy } from 'vitest-mock-extended';
import { beforeEach } from 'vitest';

// Create a deep mock of PrismaClient
export const prismaMock = mockDeep<PrismaClient>();

beforeEach(() => {
  mockReset(prismaMock);
});

// Export mock data for testing
export const mockValuationData = {
  id: 1,
  symbol: 'AAPL',
  email: 'test@example.com',
  inputs: {
    revGrowthY1: 10,
    revGrowthY2to5: 8,
    revGrowthTerminal: 3
  },
  fetched_inputs: {},
  stock_info: {
    symbol: 'AAPL',
    currentPrice: 150.00,
    companyName: 'Apple Inc.'
  },
  valuation_model: {},
  valuation_output: {},
  implied_share_price: 150.00,
  roic_data: null,
  description: 'Test valuation',
  valued_date: new Date('2024-01-01')
};

export const mockPriceAlert = {
  id: 1,
  email: 'test@example.com',
  symbol: 'AAPL',
  target_price: 200.00,
  condition: 'ABOVE' as const,
  status: 'ACTIVE' as const,
  created_at: new Date('2024-01-01'),
  expires_at: new Date('2024-12-31'),
  triggered_at: null
};
