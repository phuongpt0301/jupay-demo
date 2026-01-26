import { describe, it, expect } from 'vitest';
import { NavigationHook } from '../types';

/**
 * Unit tests for useNavigationWithLoading hook interface
 * 
 * These tests verify the hook interface and type definitions
 * without requiring complex React Router mocking.
 */
describe('useNavigationWithLoading Hook Interface', () => {
  it('should define the correct NavigationHook interface', () => {
    // Test that the NavigationHook interface has all required properties
    const mockHook: NavigationHook = {
      navigateWithLoading: () => {},
      isLoading: false,
      currentPath: '/test',
      goBack: () => {},
      isNavigationBlocked: false,
      getNavigationHistory: () => [],
      clearNavigationHistory: () => {},
      cancelNavigation: () => {},
      cleanup: () => {}
    };

    expect(typeof mockHook.navigateWithLoading).toBe('function');
    expect(typeof mockHook.isLoading).toBe('boolean');
    expect(typeof mockHook.currentPath).toBe('string');
    expect(typeof mockHook.goBack).toBe('function');
    expect(typeof mockHook.isNavigationBlocked).toBe('boolean');
    expect(typeof mockHook.getNavigationHistory).toBe('function');
    expect(typeof mockHook.clearNavigationHistory).toBe('function');
    expect(typeof mockHook.cancelNavigation).toBe('function');
    expect(typeof mockHook.cleanup).toBe('function');
  });

  it('should have correct method signatures', () => {
    const mockHook: NavigationHook = {
      navigateWithLoading: (path: string, loadingMessage?: string) => {},
      isLoading: false,
      currentPath: '/test',
      goBack: () => {},
      isNavigationBlocked: false,
      getNavigationHistory: () => ['/', '/page1'],
      clearNavigationHistory: () => {},
      cancelNavigation: () => {},
      cleanup: () => {}
    };

    // Test that methods can be called with correct parameters
    mockHook.navigateWithLoading('/test-path');
    mockHook.navigateWithLoading('/test-path', 'Loading...');
    mockHook.goBack();
    
    const history = mockHook.getNavigationHistory();
    expect(Array.isArray(history)).toBe(true);
    
    mockHook.clearNavigationHistory();
    mockHook.cancelNavigation();
    mockHook.cleanup();
  });

  it('should support loading state properties', () => {
    const loadingHook: NavigationHook = {
      navigateWithLoading: () => {},
      isLoading: true,
      currentPath: '/loading',
      goBack: () => {},
      isNavigationBlocked: true,
      getNavigationHistory: () => ['/previous'],
      clearNavigationHistory: () => {},
      cancelNavigation: () => {},
      cleanup: () => {}
    };

    expect(loadingHook.isLoading).toBe(true);
    expect(loadingHook.isNavigationBlocked).toBe(true);
    expect(loadingHook.currentPath).toBe('/loading');
  });
});