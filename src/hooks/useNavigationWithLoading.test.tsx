import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { useNavigationWithLoading } from './useNavigationWithLoading';
import React from 'react';

// Mock React Router
const mockNavigate = vi.fn();
const mockLocation = { pathname: '/current' };

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => mockLocation,
  };
});

// Wrapper component for React Router context
const RouterWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe('useNavigationWithLoading', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should initialize with correct default values', () => {
    const { result } = renderHook(() => useNavigationWithLoading(), {
      wrapper: RouterWrapper,
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.currentPath).toBe('/current');
    expect(result.current.isNavigationBlocked).toBe(false);
    expect(result.current.getNavigationHistory()).toEqual([]);
  });

  it('should set loading state when navigating', () => {
    const { result } = renderHook(() => useNavigationWithLoading(), {
      wrapper: RouterWrapper,
    });

    act(() => {
      result.current.navigateWithLoading('/new-path');
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.isNavigationBlocked).toBe(true);
  });

  it('should navigate after 3 seconds', async () => {
    const { result } = renderHook(() => useNavigationWithLoading(), {
      wrapper: RouterWrapper,
    });

    act(() => {
      result.current.navigateWithLoading('/new-path');
    });

    expect(result.current.isLoading).toBe(true);
    expect(mockNavigate).not.toHaveBeenCalled();

    // Fast-forward 3 seconds
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(mockNavigate).toHaveBeenCalledWith('/new-path');
  });

  it('should prevent navigation when already loading', () => {
    const { result } = renderHook(() => useNavigationWithLoading(), {
      wrapper: RouterWrapper,
    });

    act(() => {
      result.current.navigateWithLoading('/path1');
    });

    expect(result.current.isLoading).toBe(true);

    act(() => {
      result.current.navigateWithLoading('/path2');
    });

    // Should still be loading the first navigation
    expect(result.current.isLoading).toBe(true);

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    // Should navigate to the first path, not the second
    expect(mockNavigate).toHaveBeenCalledWith('/path1');
    expect(mockNavigate).not.toHaveBeenCalledWith('/path2');
  });

  it('should track navigation history', () => {
    const { result } = renderHook(() => useNavigationWithLoading(), {
      wrapper: RouterWrapper,
    });

    act(() => {
      result.current.navigateWithLoading('/path1');
    });

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    // Update mock location to simulate navigation
    mockLocation.pathname = '/path1';

    act(() => {
      result.current.navigateWithLoading('/path2');
    });

    expect(result.current.getNavigationHistory()).toContain('/current');
  });

  it('should handle goBack navigation', () => {
    const { result } = renderHook(() => useNavigationWithLoading(), {
      wrapper: RouterWrapper,
    });

    // Navigate to create history
    act(() => {
      result.current.navigateWithLoading('/path1');
    });

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    // Simulate being on the new path
    mockLocation.pathname = '/path1';

    act(() => {
      result.current.navigateWithLoading('/path2');
    });

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    // Now go back
    act(() => {
      result.current.goBack();
    });

    expect(result.current.isLoading).toBe(true);

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    // Should navigate back to previous path
    expect(mockNavigate).toHaveBeenCalledWith('/current');
  });

  it('should handle goBack when no history exists', () => {
    const { result } = renderHook(() => useNavigationWithLoading(), {
      wrapper: RouterWrapper,
    });

    act(() => {
      result.current.goBack();
    });

    // Should use browser back navigation
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it('should cancel navigation when requested', () => {
    const { result } = renderHook(() => useNavigationWithLoading(), {
      wrapper: RouterWrapper,
    });

    act(() => {
      result.current.navigateWithLoading('/path1');
    });

    expect(result.current.isLoading).toBe(true);

    act(() => {
      result.current.cancelNavigation();
    });

    expect(result.current.isLoading).toBe(false);

    // Fast-forward time to ensure navigation doesn't happen
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('should clear navigation history', () => {
    const { result } = renderHook(() => useNavigationWithLoading(), {
      wrapper: RouterWrapper,
    });

    // Create some history
    act(() => {
      result.current.navigateWithLoading('/path1');
    });

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(result.current.getNavigationHistory()).toContain('/current');

    act(() => {
      result.current.clearNavigationHistory();
    });

    expect(result.current.getNavigationHistory()).toEqual([]);
  });

  it('should limit navigation history to prevent memory issues', () => {
    const { result } = renderHook(() => useNavigationWithLoading(), {
      wrapper: RouterWrapper,
    });

    // Simulate navigating through many paths
    for (let i = 0; i < 60; i++) {
      mockLocation.pathname = `/path${i}`;
      act(() => {
        result.current.navigateWithLoading(`/path${i + 1}`);
      });
      act(() => {
        vi.advanceTimersByTime(3000);
      });
    }

    // History should be limited to 50 entries
    expect(result.current.getNavigationHistory().length).toBeLessThanOrEqual(50);
  });

  it('should cleanup timeouts on cleanup call', () => {
    const { result } = renderHook(() => useNavigationWithLoading(), {
      wrapper: RouterWrapper,
    });

    act(() => {
      result.current.navigateWithLoading('/path1');
    });

    expect(result.current.isLoading).toBe(true);

    act(() => {
      result.current.cleanup();
    });

    // Fast-forward time to ensure navigation doesn't happen after cleanup
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('should not add duplicate paths to history', () => {
    const { result } = renderHook(() => useNavigationWithLoading(), {
      wrapper: RouterWrapper,
    });

    // Navigate to the same path multiple times
    act(() => {
      result.current.navigateWithLoading('/same-path');
    });

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    mockLocation.pathname = '/same-path';

    act(() => {
      result.current.navigateWithLoading('/same-path');
    });

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    // Should only have one entry for the current path
    const history = result.current.getNavigationHistory();
    const currentPathCount = history.filter(path => path === '/current').length;
    expect(currentPathCount).toBe(1);
  });
});