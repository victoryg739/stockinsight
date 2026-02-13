import { vi } from 'vitest';

export const mockSession = {
  user: {
    email: 'test@example.com',
    name: 'Test User',
    image: null
  },
  expires: '2026-12-31T23:59:59.999Z'
};

export const mockUnauthenticatedSession = null;

// Mock NextAuth for server-side (API routes)
export const mockGetServerSession = vi.fn(() => Promise.resolve(mockSession));

// Mock NextAuth for client-side (React components)
export const mockUseSession = vi.fn(() => ({
  data: mockSession,
  status: 'authenticated' as const,
  update: vi.fn()
}));

// Helper to set authenticated state
export const setAuthenticatedSession = (session = mockSession) => {
  mockGetServerSession.mockResolvedValue(session);
  mockUseSession.mockReturnValue({
    data: session,
    status: 'authenticated' as const,
    update: vi.fn()
  });
};

// Helper to set unauthenticated state
export const setUnauthenticatedSession = () => {
  mockGetServerSession.mockResolvedValue(null);
  mockUseSession.mockReturnValue({
    data: null,
    status: 'unauthenticated' as const,
    update: vi.fn()
  });
};
