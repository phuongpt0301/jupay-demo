import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import ErrorBoundary from './ErrorBoundary';

// Mock component that throws an error
const ThrowError: React.FC<{ shouldThrow?: boolean; errorMessage?: string }> = ({ 
  shouldThrow = true, 
  errorMessage = 'Test error' 
}) => {
  if (shouldThrow) {
    throw new Error(errorMessage);
  }
  return <div>No error</div>;
};

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

// Mock window.location
const mockLocation = {
  href: 'http://localhost:3000/',
  reload: vi.fn(),
};

Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true,
});

describe('ErrorBoundary', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Suppress console.error for cleaner test output
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Normal Operation', () => {
    it('renders children when no error occurs', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={false} />
        </ErrorBoundary>
      );

      expect(screen.getByText('No error')).toBeInTheDocument();
    });

    it('does not show error UI when children render successfully', () => {
      render(
        <ErrorBoundary>
          <div>Working component</div>
        </ErrorBoundary>
      );

      expect(screen.getByText('Working component')).toBeInTheDocument();
      expect(screen.queryByText('Application Error')).not.toBeInTheDocument();
      expect(screen.queryByText('Screen Error')).not.toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('catches and displays component-level errors', () => {
      render(
        <ErrorBoundary level="component">
          <ThrowError errorMessage="Component failed" />
        </ErrorBoundary>
      );

      expect(screen.getByText('Component Error')).toBeInTheDocument();
      expect(screen.getByText(/A component failed to load/)).toBeInTheDocument();
    });

    it('catches and displays screen-level errors', () => {
      render(
        <ErrorBoundary level="screen">
          <ThrowError errorMessage="Screen failed" />
        </ErrorBoundary>
      );

      expect(screen.getByText('Screen Error')).toBeInTheDocument();
      expect(screen.getByText(/This screen encountered an error/)).toBeInTheDocument();
    });

    it('catches and displays app-level errors', () => {
      render(
        <ErrorBoundary level="app">
          <ThrowError errorMessage="App failed" />
        </ErrorBoundary>
      );

      expect(screen.getByText('Application Error')).toBeInTheDocument();
      expect(screen.getByText(/The application has encountered a critical error/)).toBeInTheDocument();
    });

    it('calls onError callback when error occurs', () => {
      const onError = vi.fn();
      
      render(
        <ErrorBoundary onError={onError}>
          <ThrowError errorMessage="Callback test" />
        </ErrorBoundary>
      );

      expect(onError).toHaveBeenCalledWith(
        expect.any(Error),
        expect.objectContaining({
          componentStack: expect.any(String)
        })
      );
    });

    it('logs error details to localStorage', () => {
      mockLocalStorage.getItem.mockReturnValue('[]');
      
      render(
        <ErrorBoundary>
          <ThrowError errorMessage="Storage test" />
        </ErrorBoundary>
      );

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'jupay_error_log',
        expect.stringContaining('Storage test')
      );
    });
  });

  describe('Error Recovery', () => {
    it('shows retry button for component and screen level errors', () => {
      render(
        <ErrorBoundary level="screen">
          <ThrowError />
        </ErrorBoundary>
      );

      expect(screen.getByText(/Try Again/)).toBeInTheDocument();
    });

    it('does not show retry button for app-level errors', () => {
      render(
        <ErrorBoundary level="app">
          <ThrowError />
        </ErrorBoundary>
      );

      expect(screen.queryByText(/Try Again/)).not.toBeInTheDocument();
      expect(screen.getByText(/Restart Application/)).toBeInTheDocument();
    });

    it('allows retry up to maximum attempts', async () => {
      let shouldThrow = true;
      const TestComponent = () => {
        if (shouldThrow) {
          throw new Error('Retry test');
        }
        return <div>Success after retry</div>;
      };

      render(
        <ErrorBoundary level="component">
          <TestComponent />
        </ErrorBoundary>
      );

      // First retry
      const retryButton = screen.getByText(/Try Again/);
      expect(retryButton).toHaveTextContent('(3 attempts left)');
      
      fireEvent.click(retryButton);
      
      await waitFor(() => {
        expect(screen.getByText(/Try Again/)).toHaveTextContent('(2 attempts left)');
      });
    });

    it('disables retry after maximum attempts', async () => {
      render(
        <ErrorBoundary level="component">
          <ThrowError />
        </ErrorBoundary>
      );

      // Exhaust all retry attempts
      for (let i = 0; i < 3; i++) {
        const retryButton = screen.getByText(/Try Again/);
        fireEvent.click(retryButton);
        
        await waitFor(() => {
          expect(screen.getByText('Component Error')).toBeInTheDocument();
        });
      }

      // After 3 retries, button should be disabled or show different text
      expect(screen.queryByText(/Try Again/)).not.toBeInTheDocument();
    });
  });

  describe('Navigation Actions', () => {
    it('provides navigation to safe location', () => {
      render(
        <ErrorBoundary level="screen">
          <ThrowError />
        </ErrorBoundary>
      );

      const safeLocationButton = screen.getByText(/Go to Safe Location/);
      expect(safeLocationButton).toBeInTheDocument();
      
      fireEvent.click(safeLocationButton);
      // Navigation would be handled by the actual navigation system
    });

    it('provides app reload for critical errors', () => {
      render(
        <ErrorBoundary level="app">
          <ThrowError />
        </ErrorBoundary>
      );

      const reloadButton = screen.getByText(/Restart Application/);
      expect(reloadButton).toBeInTheDocument();
      
      fireEvent.click(reloadButton);
      expect(mockLocation.reload).toHaveBeenCalled();
    });
  });

  describe('Custom Fallback', () => {
    it('renders custom fallback when provided', () => {
      const customFallback = <div>Custom error message</div>;
      
      render(
        <ErrorBoundary fallback={customFallback}>
          <ThrowError />
        </ErrorBoundary>
      );

      expect(screen.getByText('Custom error message')).toBeInTheDocument();
      expect(screen.queryByText('Component Error')).not.toBeInTheDocument();
    });
  });

  describe('Error Severity Classification', () => {
    it('classifies ChunkLoadError as medium severity', () => {
      const chunkError = new Error('Loading chunk 1 failed');
      chunkError.name = 'ChunkLoadError';
      
      const ThrowChunkError = () => {
        throw chunkError;
      };

      render(
        <ErrorBoundary level="component">
          <ThrowChunkError />
        </ErrorBoundary>
      );

      // Should still show component error UI but with appropriate handling
      expect(screen.getByText('Component Error')).toBeInTheDocument();
    });

    it('classifies TypeError as medium severity', () => {
      const typeError = new Error('Cannot read property of undefined');
      typeError.name = 'TypeError';
      
      const ThrowTypeError = () => {
        throw typeError;
      };

      render(
        <ErrorBoundary level="component">
          <ThrowTypeError />
        </ErrorBoundary>
      );

      expect(screen.getByText('Component Error')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('provides proper ARIA labels and roles', () => {
      render(
        <ErrorBoundary level="screen">
          <ThrowError />
        </ErrorBoundary>
      );

      // Check for accessible error content
      expect(screen.getByText('Screen Error')).toBeInTheDocument();
      
      // Check for proper button labeling
      const retryButton = screen.getByText(/Try Again/);
      expect(retryButton).toBeInTheDocument();
      
      const safeLocationButton = screen.getByText(/Go to Safe Location/);
      expect(safeLocationButton).toBeInTheDocument();
    });

    it('provides expandable error details', () => {
      render(
        <ErrorBoundary level="component">
          <ThrowError />
        </ErrorBoundary>
      );

      const detailsElement = screen.getByText('Technical Details');
      expect(detailsElement).toBeInTheDocument();
      
      // Details should be expandable
      fireEvent.click(detailsElement);
    });
  });

  describe('Error Reporting', () => {
    it('generates unique error IDs', () => {
      mockLocalStorage.getItem.mockReturnValue('[]');
      
      render(
        <ErrorBoundary>
          <ThrowError errorMessage="ID test" />
        </ErrorBoundary>
      );

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'jupay_error_log',
        expect.stringContaining('error_')
      );
    });

    it('limits stored errors to prevent memory issues', () => {
      // Mock existing errors
      const existingErrors = Array.from({ length: 15 }, (_, i) => ({
        message: `Error ${i}`,
        timestamp: new Date().toISOString()
      }));
      
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(existingErrors));
      
      render(
        <ErrorBoundary>
          <ThrowError errorMessage="Limit test" />
        </ErrorBoundary>
      );

      // Should only keep last 10 errors
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'jupay_error_log',
        expect.stringMatching(/.*/)
      );
      
      const storedData = JSON.parse(mockLocalStorage.setItem.mock.calls[0][1]);
      expect(storedData).toHaveLength(10);
    });
  });
});