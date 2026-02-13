import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST, GET } from '@/app/api/valuation/route';
import { prismaMock, mockValuationData } from '../../mocks/prisma';
import { mockGetServerSession, setAuthenticatedSession, setUnauthenticatedSession } from '../../mocks/next-auth';

// Mock Prisma Client
vi.mock('@prisma/client', () => ({
  PrismaClient: vi.fn(() => prismaMock)
}));

// Mock NextAuth
vi.mock('next-auth', () => ({
  getServerSession: mockGetServerSession
}));

describe('Valuation API - CRITICAL SECURITY TESTS', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('POST /api/valuation (CRITICAL BUG - No Authentication)', () => {
    it('should reject unauthenticated POST requests', async () => {
      // Set unauthenticated state
      setUnauthenticatedSession();

      const requestBody = {
        symbol: 'AAPL',
        email: 'hacker@evil.com',
        inputs: {},
        fetchedInputs: {},
        stockInfo: {},
        valuationModel: {},
        valuationOutput: {},
        impliedSharePrice: 150,
        roic_data: null,
        description: 'Hack attempt',
        valuedDate: new Date().toISOString()
      };

      const request = new Request('http://localhost:3000/api/valuation', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      });

      const response = await POST(request);

      // BUG: Currently returns 200 and creates valuation!
      // Should return 401 Unauthorized
      expect(response.status).toBe(401);
    });

    it('should allow authenticated POST requests', async () => {
      // Set authenticated state
      setAuthenticatedSession({
        user: { email: 'test@example.com', name: 'Test User', image: null },
        expires: '2026-12-31T23:59:59.999Z'
      });

      prismaMock.valuation.create.mockResolvedValue(mockValuationData);

      const requestBody = {
        symbol: 'AAPL',
        email: 'test@example.com',
        inputs: {},
        fetchedInputs: {},
        stockInfo: {},
        valuationModel: {},
        valuationOutput: {},
        impliedSharePrice: 150,
        roic_data: null,
        description: 'Legitimate valuation',
        valuedDate: new Date().toISOString()
      };

      const request = new Request('http://localhost:3000/api/valuation', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.symbol).toBe('AAPL');
    });

    it('should reject POST with mismatched email (user trying to create for another user)', async () => {
      // Authenticated as test@example.com
      setAuthenticatedSession({
        user: { email: 'test@example.com', name: 'Test User', image: null },
        expires: '2026-12-31T23:59:59.999Z'
      });

      const requestBody = {
        symbol: 'AAPL',
        email: 'other@example.com',  // Different from session email!
        inputs: {},
        fetchedInputs: {},
        stockInfo: {},
        valuationModel: {},
        valuationOutput: {},
        impliedSharePrice: 150,
        roic_data: null,
        description: 'Trying to create for another user',
        valuedDate: new Date().toISOString()
      };

      const request = new Request('http://localhost:3000/api/valuation', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      });

      const response = await POST(request);

      // Should reject - user can only create valuations for themselves
      expect(response.status).toBe(403);
    });

    it('should sanitize SQL injection attempts in symbol parameter', async () => {
      setAuthenticatedSession();

      const requestBody = {
        symbol: "'; DROP TABLE valuation; --",
        email: 'test@example.com',
        inputs: {},
        fetchedInputs: {},
        stockInfo: {},
        valuationModel: {},
        valuationOutput: {},
        impliedSharePrice: 150,
        roic_data: null,
        description: 'SQL injection attempt',
        valuedDate: new Date().toISOString()
      };

      prismaMock.valuation.create.mockResolvedValue({
        ...mockValuationData,
        symbol: "'; DROP TABLE valuation; --"
      });

      const request = new Request('http://localhost:3000/api/valuation', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      });

      const response = await POST(request);

      // Prisma should handle SQL injection, but verify it doesn't execute
      expect(response.status).toBe(200);
      // Verify Prisma create was called (not raw SQL)
      expect(prismaMock.valuation.create).toHaveBeenCalled();
    });
  });

  describe('GET /api/valuation (CRITICAL BUG - Data Exposure)', () => {
    it('should NOT return all valuations when symbol is null (without authentication)', async () => {
      setUnauthenticatedSession();

      const request = new Request('http://localhost:3000/api/valuation?symbol=null');

      const response = await GET(request);

      // BUG: Currently returns ALL valuations from database!
      // Should require authentication
      expect(response.status).toBe(401);
    });

    it('should return all valuations for authenticated user when symbol is null', async () => {
      setAuthenticatedSession({
        user: { email: 'test@example.com', name: 'Test User', image: null },
        expires: '2026-12-31T23:59:59.999Z'
      });

      prismaMock.valuation.findMany.mockResolvedValue([
        mockValuationData,
        { ...mockValuationData, id: 2, symbol: 'GOOGL' }
      ]);

      const request = new Request('http://localhost:3000/api/valuation?symbol=null');

      const response = await GET(request);
      const data = await response.json();

      // Should only return valuations for the authenticated user
      expect(response.status).toBe(200);
      expect(prismaMock.valuation.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            email: 'test@example.com'
          })
        })
      );
    });

    it('should return valuations filtered by symbol for authenticated user', async () => {
      setAuthenticatedSession({
        user: { email: 'test@example.com', name: 'Test User', image: null },
        expires: '2026-12-31T23:59:59.999Z'
      });

      prismaMock.valuation.findMany.mockResolvedValue([mockValuationData]);

      const request = new Request('http://localhost:3000/api/valuation?symbol=AAPL');

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(prismaMock.valuation.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            symbol: 'AAPL',
            email: 'test@example.com'  // Should filter by user
          })
        })
      );
    });

    it('should NOT allow user to see another users valuations', async () => {
      // User A is authenticated
      setAuthenticatedSession({
        user: { email: 'userA@example.com', name: 'User A', image: null },
        expires: '2026-12-31T23:59:59.999Z'
      });

      // Mock returns User B's valuation
      prismaMock.valuation.findMany.mockResolvedValue([]);

      const request = new Request('http://localhost:3000/api/valuation?symbol=AAPL');

      const response = await GET(request);
      const data = await response.json();

      // Should be filtered by userA@example.com, so returns empty
      expect(prismaMock.valuation.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            email: 'userA@example.com'
          })
        })
      );
    });

    it('should require authentication for GET requests', async () => {
      setUnauthenticatedSession();

      const request = new Request('http://localhost:3000/api/valuation?symbol=AAPL');

      const response = await GET(request);

      expect(response.status).toBe(401);
    });
  });

  describe('Input Validation', () => {
    it('should validate required fields in POST request', async () => {
      setAuthenticatedSession();

      const invalidBody = {
        symbol: 'AAPL'
        // Missing required fields
      };

      const request = new Request('http://localhost:3000/api/valuation', {
        method: 'POST',
        body: JSON.stringify(invalidBody),
        headers: { 'Content-Type': 'application/json' }
      });

      const response = await POST(request);

      // Should validate and return 400 Bad Request
      expect(response.status).toBeGreaterThanOrEqual(400);
    });

    it('should validate symbol format (uppercase letters only)', async () => {
      setAuthenticatedSession();

      const requestBody = {
        symbol: 'invalid$symbol!',
        email: 'test@example.com',
        inputs: {},
        fetchedInputs: {},
        stockInfo: {},
        valuationModel: {},
        valuationOutput: {},
        impliedSharePrice: 150,
        roic_data: null,
        description: 'Test',
        valuedDate: new Date().toISOString()
      };

      const request = new Request('http://localhost:3000/api/valuation', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      });

      const response = await POST(request);

      // Should validate symbol format
      expect(response.status).toBeGreaterThanOrEqual(400);
    });

    it('should validate impliedSharePrice is a number', async () => {
      setAuthenticatedSession();

      const requestBody = {
        symbol: 'AAPL',
        email: 'test@example.com',
        inputs: {},
        fetchedInputs: {},
        stockInfo: {},
        valuationModel: {},
        valuationOutput: {},
        impliedSharePrice: 'not-a-number',
        roic_data: null,
        description: 'Test',
        valuedDate: new Date().toISOString()
      };

      const request = new Request('http://localhost:3000/api/valuation', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      });

      const response = await POST(request);

      // Should validate number types
      expect(response.status).toBeGreaterThanOrEqual(400);
    });
  });

  describe('Error Handling', () => {
    it('should handle database errors gracefully', async () => {
      setAuthenticatedSession();

      prismaMock.valuation.create.mockRejectedValue(new Error('Database connection failed'));

      const requestBody = {
        symbol: 'AAPL',
        email: 'test@example.com',
        inputs: {},
        fetchedInputs: {},
        stockInfo: {},
        valuationModel: {},
        valuationOutput: {},
        impliedSharePrice: 150,
        roic_data: null,
        description: 'Test',
        valuedDate: new Date().toISOString()
      };

      const request = new Request('http://localhost:3000/api/valuation', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      });

      const response = await POST(request);

      expect(response.status).toBe(500);
      const data = await response.json();
      expect(data.error).toBeDefined();
    });

    it('should handle malformed JSON gracefully', async () => {
      setAuthenticatedSession();

      const request = new Request('http://localhost:3000/api/valuation', {
        method: 'POST',
        body: 'invalid-json{{{',
        headers: { 'Content-Type': 'application/json' }
      });

      const response = await POST(request);

      // Should return 400 Bad Request for malformed JSON
      expect(response.status).toBeGreaterThanOrEqual(400);
    });
  });
});
