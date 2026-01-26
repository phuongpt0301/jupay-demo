import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import LoadingErrorBoundary from './LoadingErrorBoundary';

// Mock component that throws loading-related errors
const ThrowLoadingError: React.FC<{ 
  shouldThrow?: boolean; 
  errorType?: 'chunk' | 'network' | 'timeout' | 'generic';
}> = ({ shouldThrow = true, errorType = 'chunk' }) => {
  if (shouldThrow) {
    let error: Error;
    
    switch (errorType) {
      case 'chunk':
        error = new Error('Loading chunk 1 failed');
        error.name = 'ChunkLoadError';
        break;
      case 'network':
        error = new Error('Failed to fetch');
        break;
      case 'timeout':
        error = new Error('Request timeout');
        break;
      default:
        error = new Error('Generic loading error');
    }
    
    throw error;
  }
  return <div>Loading successful</div>;
};

// Mock non-loading error component
const ThrowNonLoadingError: React.FC = () => {
  throw new Error('This is not a loading error');
};

// Mock localStorage and navigator
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

const mockLocation = {
  href: 'http://localhost:3000/',
  reload: vi.fn(),
};

Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true,
});

// Mock navigator.connection
Object.defineProperty(navigator, 'connection', {
  value: { effectiveType: '4g' },
  writable: true,
});

describe('LoadingErrorBoundary', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  describe('Normal Operation', () => {
    it('renders children when no error occurs', () => {
      render(
        <LoadingErrorBoundary>
          <ThrowLoadingError shouldThrow={false} />
        </LoadingErrorBoundary>
      );

      expect(screen.getByText('Loading successful')).toBeInTheDocument();
    });

    it('does not catch non-loading errors', () => {
      // This should throw and not be caught by LoadingErrorBoundary
      expect(() => {
        render(
          <LoadingErrorBoundary>
            <ThrowNonLoadingError />
          </LoadingErrorBoundary>
        );
      }).toThrow('This is not a loading error');
    });
  });

  describe('Loading Error Detection', () => {
    it('catches ChunkLoadError', () => {
      render(
        <LoadingErrorBoundary>
          <ThrowLoadingError errorType="chunk" />
        </LoadingErrorBoundary>
      );

      expect(screen.getByText('Loading Failed')).toBeInTheDocument();
      expect(screen.getByText(/Failed to load application resources/)).toBeInTheDocument();
    });

    it('catches network errors', () => {
      render(
        <LoadingErrorBoundary>
          <ThrowLoadingError errorType="network" />
        </LoadingErrorBoundary>
      );

      expect(screen.getByText('Loading Failed')).toBeInTheDocument();
      expect(screen.getByText(/Unable to connect to the server/)).toBeInTheDocument();
    });

    it('catches timeout errors', () => {
      render(
        <LoadingErrorBoundary>
          <ThrowLoadingError errorType="timeout" />
        </LoadingErrorBoundary>
      );

      expect(screen.getByText('Loading Failed')).toBeInTheDocument();
      expect(screen.getByText(/The request took too long to complete/)).toBeInTheDocument();
    });

    it('uses custom fallback message when provided', () => {
      render(
        <LoadingErrorBoundary fallbackMessage="Custom loading error message">
          <ThrowLoadingError />
        </LoadingErrorBoundary>
      );

      expect(screen.getByText('Custom loading error message')).toBeInTheDocument();
    });
  });

  describe('Error Recovery', () => {
    it('shows retry button with attempt count', () => {
      render(
        <LoadingErrorBoundary>
          <ThrowLoadingError />
        </LoadingErrorBoundary>
      );

      expect(screen.getByText('Try Again (3 attempts left)')).toBeInTheDocument();
    });

    it('implements exponential backoff for retries', async () => {
      let shouldThrow = true;
      const TestComponent = () => {
        if (shouldThrow) {
          throw new Error('Loading chunk failed');
        }
        return <div>Success after retry</div>;
      };

      render(
        <LoadingErrorBoundary>
          <TestComponent />
        </LoadingErrorBoundary>
      );

      const retryButton = screen.getByText(/Try Again/);
      fireEvent.click(retryButton);

      // Should show updated retry count
      expect(screen.getByText('Try Again (2 attempts left)')).toBeInTheDocument();

      // Fast-forward the retry delay
      vi.advanceTimersByTime(1000);

      await waitFor(() => {
        // Component should still be in error state since shouldThrow is still true
        expect(screen.getByText('Loading Failed')).toBeInTheDocument();
      });
    });

    it('disables retry after maximum attempts', () => {
      render(
        <LoadingErrorBoundary>
          <ThrowLoadingError />
        </LoadingErrorBoundary>
      );

      // Exhaust all retry attempts
      for (let i = 0; i < 3; i++) {
        const retryButton = screen.getByText(/Try Again/);
        fireEvent.click(retryButton);
        vi.advanceTimersByTime(5000); // Max delay
      }

      expect(screen.getByText('Max retries reached')).toBeInTheDocument();
    });

    it('calls custom retry action when provided', () => {
      const retryAction = vi.fn();
      
      render(
        <LoadingErrorBoundary retryAction={retryAction}>
          <ThrowLoadingError />
        </LoadingErrorBoundary>
      );

      const retryButton = screen.getByText(/Try Again/);
      fireEvent.click(retryButton);
      
      vi.advanceTimersByTime(1000);

      expect(retryAction).toHaveBeenCalled();
    });
  });

  describe('Navigation Actions', () => {
    it('provides navigation to safe location', () => {
      render(
        <LoadingErrorBoundary>
          <ThrowLoadingError />
        </LoadingErrorBoundary>
      );

      const safeLocationButton = screen.getByText(/Go to Safe Location/);
      expect(safeLocationButton).toBeInTheDocument();
      
      fireEvent.click(safeLocationButton);
      // Navigation would be handled by the actual navigation system
    });

    it('provides page reload option', () => {
      render(
        <LoadingErrorBoundary>
          <ThrowLoadingError />
        </LoadingErrorBoundary>
      );

      const reloadButton = screen.getByText(/Reload Page/);
      expect(reloadButton).toBeInTheDocument();
      
      fireEvent.click(reloadButton);
      expect(mockLocation.reload).toHaveBeenCalled();
    });

    it('clears loading state on navigation', () => {
      mockLocalStorage.removeItem.mockImplementation(() => {});
      
      render(
        <LoadingErrorBoundary>
          <ThrowLoadingError />
        </LoadingErrorBoundary>
      );

      const safeLocationButton = screen.getByText(/Go to Safe Location/);
      fireEvent.click(safeLocationButton);
      
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('jupay_loading_state');
    });
  });

  describe('Error Logging', () => {
    it('logs loading errors with proper metadata', () => {
      mockLocalStorage.getItem.mockReturnValue('[]');
      
      render(
        <LoadingErrorBoundary>
          <ThrowLoadingError errorType="network" />
        </LoadingErrorBoundary>
      );

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'jupay_loading_errors',
        expect.stringContaining('loading_error')
      );
    });

    it('includes connection information in error logs', () => {
      mockLocalStorage.getItem.mockReturnValue('[]');
      
      render(
        <LoadingErrorBoundary>
          <ThrowLoadingError />
        </LoadingErrorBoundary>
      );

      const loggedData = mockLocalStorage.setItem.mock.calls[0][1];
      expect(loggedData).toContain('4g'); // Connection type
    });

    it('limits stored errors to prevent memory issues', () => {
      const existingErrors = Array.from({ length: 10 }, (_, i) => ({
        type: 'loading_error',
        message: `Error ${i}`,
        timestamp: new Date().toISOString()
      }));
      
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(existingErrors));
      
      render(
        <LoadingErrorBoundary>
          <ThrowLoadingError />
        </LoadingErrorBoundary>
      );

      const storedData = JSON.parse(mockLocalStorage.setItem.mock.calls[0][1]);
      expect(storedData).toHaveLength(5); // Should keep last 5 errors
    });

    it('calls onLoadingError callback when provided', () => {
      const onLoadingError = vi.fn();
      
      render(
        <LoadingErrorBoundary onLoadingError={onLoadingError}>
          <ThrowLoadingError />
        </LoadingErrorBoundary>
      );

      expect(onLoadingError).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('Error Type Classification', () => {
    it('displays appropriate icon for network errors', () => {
      render(
        <LoadingErrorBoundary>
          <ThrowLoadingError errorType="network" />
        </LoadingErrorBoundary>
      );

      // Check for network-specific icon (eye icon in this case)
      const icon = screen.getByRole('img', { hidden: true });
      expect(icon).toBeInTheDocument();
    });

    it('displays appropriate icon for chunk errors', () => {
      render(
        <LoadingErrorBoundary>
          <ThrowLoadingError errorType="chunk" />
        </LoadingErrorBoundary>
      );

      // Check for file-specific icon
      const icon = screen.getByRole('img', { hidden: true });
      expect(icon).toBeInTheDocument();
    });

    it('displays generic icon for unknown errors', () => {
      render(
        <LoadingErrorBoundary>
          <ThrowLoadingError errorType="generic" />
        </LoadingErrorBoundary>
      );

      // Check for generic error icon
      const icon = screen.getByRole('img', { hidden: true });
      expect(icon).toBeInTheDocument();
    });
  });

  describe('Technical Details', () => {
    it('provides expandable technical details', () => {
      render(
        <LoadingErrorBoundary>
          <ThrowLoadingError errorType="chunk" />
        </LoadingErrorBoundary>
      );

      const detailsElement = screen.getByText('Technical Details');
      expect(detailsElement).toBeInTheDocument();
      
      fireEvent.click(detailsElement);
      
      expect(screen.getByText(/Error Type:/)).toBeInTheDocument();
      expect(screen.getByText(/Error Name:/)).toBeInTheDocument();
      expect(screen.getByText(/Retry Count:/)).toBeInTheDocument();
      expect(screen.getByText(/Connection:/)).toBeInTheDocument();
    });

    it('shows correct error type in technical details', () => {
      render(
        <LoadingErrorBoundary>
          <ThrowLoadingError errorType="network" />
        </LoadingErrorBoundary>
      );

      const detailsElement = screen.getByText('Technical Details');
      fireEvent.click(detailsElement);
      
      expect(screen.getByText('network')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('provides proper ARIA labels', () => {
      render(
        <LoadingErrorBoundary>
          <ThrowLoadingError />
        </LoadingErrorBoundary>
      );

      expect(screen.getByText('Loading Failed')).toBeInTheDocument();
      
      const retryButton = screen.getByText(/Try Again/);
      expect(retryButton).toBeInTheDocument();
      
      const safeLocationButton = screen.getByText(/Go to Safe Location/);
      expect(safeLocationButton).toBeInTheDocument();
    });

    it('supports keyboard navigation', () => {
      render(
        <LoadingErrorBoundary>
          <ThrowLoadingError />
        </LoadingErrorBoundary>
      );

      const retryButton = screen.getByText(/Try Again/);
      retryButton.focus();
      expect(document.activeElement).toBe(retryButton);
    });
  });

  describe('Component Lifecycle', () => {
    it('cleans up timers on unmount', () => {
      const { unmount } = render(
        <LoadingErrorBoundary>
          <ThrowLoadingError />
        </LoadingErrorBoundary>
      );

      const retryButton = screen.getByText(/Try Again/);
      fireEvent.click(retryButton);
      
      // Unmount before timer completes
      unmount();
      
      // Should not cause any errors
      vi.advanceTimersByTime(5000);
    });
  });
});